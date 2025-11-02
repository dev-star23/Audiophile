import Link from "next/link"
import { Container } from "@/components"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center py-16">
      <Container>
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Product Not Found</h1>
          <p className="text-lg text-muted-foreground">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-block text-primary hover:text-light-orange transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </Container>
    </main>
  )
}

