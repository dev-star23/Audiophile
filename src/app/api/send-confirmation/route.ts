import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface OrderData {
  name: string
  email: string
  phone: string
  address: string
  zipCode: string
  city: string
  country: string
  paymentMethod: "e-money" | "cash"
  eMoneyNumber?: string
  eMoneyPIN?: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
    imageAlt: string
  }>
  subtotal: number
  shipping: number
  vat: number
  grandTotal: number
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json()

    // Validate required fields
    if (!orderData.email || !orderData.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Generate order number
    const orderNumber = `AUD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    // Get base URL for images (from env or use default)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "https://audiophile-rho.vercel.app"

    // Format email HTML
    const emailHTML = generateEmailHTML(orderData, orderNumber, baseUrl)

    // Check for required SMTP environment variables
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const fromEmail = process.env.FROM_EMAIL || smtpUser
    const fromName = process.env.FROM_NAME || "Audiophile"

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error("Missing SMTP configuration. Email not sent.")

      return NextResponse.json({
        success: true,
        orderNumber,
        message: "Order confirmed (email not sent - SMTP not configured)",
      })
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: smtpPort === "465",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: orderData.email,
      subject: `Order Confirmation - ${orderNumber}`,
      html: emailHTML,
    })

    return NextResponse.json({
      success: true,
      orderNumber,
      message: "Confirmation email sent successfully",
    })
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return NextResponse.json(
      { error: "Failed to send confirmation email" },
      { status: 500 }
    )
  }
}

function generateEmailHTML(orderData: OrderData, orderNumber: string, baseUrl: string): string {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Convert relative image paths to absolute URLs
  const getAbsoluteImageUrl = (imagePath: string): string => {
    // If already an absolute URL, return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath
    }
    // Remove leading slash if present and add base URL
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`
    return `${baseUrl}${cleanPath}`
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - ${orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #fafafa;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px; text-align: center;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #101010;">
              <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1.4px;">
                AUDIOPHILE
              </h1>
            </td>
          </tr>

          <!-- Success Icon -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <table role="presentation" style="margin: 0 auto; border-collapse: collapse;">
                <tr>
                  <td style="width: 80px; height: 80px; border-radius: 50%; background-color: #D87D4A; text-align: center; vertical-align: middle;">
                    <span style="color: #ffffff; font-size: 48px; font-weight: bold; line-height: 80px; display: inline-block;">✓</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding: 0 40px 20px; text-align: center;">
              <h2 style="margin: 0; font-size: 28px; font-weight: bold; color: #101010; text-transform: uppercase; letter-spacing: 1px;">
                THANK YOU FOR YOUR ORDER
              </h2>
            </td>
          </tr>

          <!-- Subtitle -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <p style="margin: 0; font-size: 15px; line-height: 25px; color: #6b6b6b;">
                Your order has been confirmed and will be shipped soon.
              </p>
              <p style="margin: 10px 0 0; font-size: 14px; line-height: 20px; color: #6b6b6b;">
                Order Number: <strong style="color: #101010;">${orderNumber}</strong>
              </p>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f1f1f1; border-radius: 8px; overflow: hidden;">
                ${orderData.items.map(
                  (item) => {
                    const imageUrl = getAbsoluteImageUrl(item.image)
                    return `
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <!-- Product Image -->
                        <td style="vertical-align: middle; width: 80px; padding-right: 16px;">
                          <img 
                            src="${imageUrl}" 
                            alt="${item.imageAlt || item.name}" 
                            style="width: 64px; height: 64px; object-fit: contain; border-radius: 8px; background-color: #ffffff; display: block; border: none;"
                          />
                        </td>
                        <!-- Product Info -->
                        <td style="vertical-align: middle; width: 100%;">
                          <p style="margin: 0 0 5px; font-size: 15px; font-weight: bold; color: #101010;">
                            ${item.name}
                          </p>
                          <p style="margin: 0; font-size: 14px; color: #6b6b6b;">
                            ${formatPrice(item.price)}
                          </p>
                        </td>
                        <!-- Quantity -->
                        <td style="text-align: right; vertical-align: middle; padding-left: 20px;">
                          <p style="margin: 0; font-size: 15px; font-weight: bold; color: #6b6b6b;">
                            x${item.quantity}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `
                  }
                ).join("")}
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 30px 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="font-size: 15px; color: #6b6b6b; text-transform: uppercase;">
                          TOTAL
                        </td>
                        <td style="text-align: right; font-size: 18px; font-weight: bold; color: #101010;">
                          ${formatPrice(orderData.subtotal)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 8px; font-size: 15px; color: #6b6b6b; text-transform: uppercase;">
                          SHIPPING
                        </td>
                        <td style="padding-top: 8px; text-align: right; font-size: 18px; font-weight: bold; color: #101010;">
                          ${formatPrice(orderData.shipping)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 8px; font-size: 15px; color: #6b6b6b; text-transform: uppercase;">
                          VAT (15% INCLUDED)
                        </td>
                        <td style="padding-top: 8px; text-align: right; font-size: 18px; font-weight: bold; color: #101010;">
                          ${formatPrice(orderData.vat)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid #e0e0e0;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding-top: 16px; font-size: 15px; color: #ffffff; text-transform: uppercase; background-color: #101010; padding: 16px 20px; border-radius: 0 0 8px 8px;">
                          GRAND TOTAL
                        </td>
                        <td style="padding-top: 16px; text-align: right; font-size: 20px; font-weight: bold; color: #ffffff; background-color: #101010; padding: 16px 20px; border-radius: 0 0 8px 8px;">
                          ${formatPrice(orderData.grandTotal)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Info -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #fafafa; border-radius: 8px; padding: 20px;">
                <h3 style="margin: 0 0 15px; font-size: 13px; font-weight: bold; color: #D87D4A; text-transform: uppercase; letter-spacing: 0.9px;">
                  SHIPPING ADDRESS
                </h3>
                <p style="margin: 5px 0; font-size: 15px; line-height: 25px; color: #101010;">
                  ${orderData.name}<br />
                  ${orderData.address}<br />
                  ${orderData.city}, ${orderData.zipCode}<br />
                  ${orderData.country}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #101010;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #ffffff;">
                Thank you for shopping with Audiophile!
              </p>
              <p style="margin: 0; font-size: 12px; color: #6b6b6b;">
                If you have any questions, please contact us at support@audiophile.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

