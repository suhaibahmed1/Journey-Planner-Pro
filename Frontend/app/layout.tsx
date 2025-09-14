import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/AuthContext"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Journey Planner Pro - Your Travel Companion",
  description:
    "Discover amazing destinations with expertly crafted travel packages for Pakistan and international tours.",
    
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
