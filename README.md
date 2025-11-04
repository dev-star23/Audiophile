# 🎧 Audiophile

A modern, responsive e-commerce application for premium audio equipment. Built with Next.js, featuring a sleek design, shopping cart functionality, and seamless checkout experience.

## ✨ Features

- 🏠 **Homepage** with hero section, product categories, and featured products
- 📱 **Fully Responsive** design optimized for mobile, tablet, and desktop
- 🛍️ **Shopping Cart** with persistent storage using localStorage
- 💳 **Checkout Flow** with form validation and order confirmation
- 📦 **Product Catalog** organized by categories (Headphones, Speakers, Earphones)
- 🔍 **Product Detail Pages** with galleries, specifications, and recommendations
- 📧 **Email Confirmation** (optional) for order confirmations via SMTP
- 🗄️ **Convex Backend** for product data management
- 🎨 **Design System** with consistent UI components

## 🛠️ Tech Stack

### Frontend
- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Zod**

### Backend & Database
- **Convex**
- **Nodemailer** - Email service (optional)

### UI Components
- **Shadcn UI**


## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **Convex CLI** (install with `npm install -g convex`)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <https://github.com/dev-star23/Audiophile.git>
cd audiophile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Convex (Required)
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
FROM_NAME=Audiophile
```

### 4. Set Up Convex Backend

#### Initialize Convex (if not already done)

```bash
npx convex dev
```

This will:
- Create a Convex project (if needed)
- Set up the database schema
- Start the Convex development server
- Generate the Convex URL

#### Add Convex URL to `.env.local`

After running `convex dev`, copy the Convex URL and add it to your `.env.local`:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

#### Seed the Database

Populate the database with product data:

```bash
npx tsx scripts/seed-convex.ts
```

Or use the Convex dashboard to run the mutation directly.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
audiophile/
├── public/
│   └── images/          # Product images and assets
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── api/         # API routes
│   │   ├── checkout/    # Checkout page
│   │   ├── product/     # Product detail pages
│   │   └── ...
│   ├── components/      # React components
│   │   ├── atoms/       # Basic UI components
│   │   ├── molecules/   # Composite components
│   │   ├── organisms/   # Complex components
│   │   └── ui/          # UI component library
│   ├── context/         # React Context providers
│   ├── lib/             # Utility functions
│   └── data/            # Type definitions
├── convex/              # Convex backend
│   ├── schema.ts        # Database schema
│   ├── products.ts      # Product queries
│   └── seed.ts          # Seeding mutations
├── scripts/             # Utility scripts
│   └── seed-convex.ts   # Database seeding script
└── db.json              # Product data source
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run convex:dev` - Start Convex development server
- `npm run convex:deploy` - Deploy Convex backend


## 🎨 Design System

The project follows a component-based architecture with:

- **Atomic Design** principles (atoms, molecules, organisms)
- **Consistent styling** with Tailwind CSS
- **Accessible components** using Radix UI
- **Type-safe** with TypeScript

View the design system at `/design-system` (in development).


## 📝 License

This project is private and proprietary.

## 👤 Author

-- Built by K.S
