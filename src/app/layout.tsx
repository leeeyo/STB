import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BankingLayout } from "@/components/banking-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "STB Digital - Dashboard Réclamations",
  description:
    "Système d'analyse et de suivi des réclamations clients pour les transactions digitales - Société Tunisienne de Banque",
  keywords: ["banque", "réclamations", "transactions digitales", "dashboard", "STB"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <BankingLayout>{children}</BankingLayout>
      </body>
    </html>
  )
}
