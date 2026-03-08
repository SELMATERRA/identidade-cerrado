import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plataforma Identidade Cerrado",
  description: "Plataforma educativa com histórias, jogos e materiais sobre o Cerrado"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
