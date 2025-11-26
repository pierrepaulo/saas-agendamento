import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionAuthProvider } from "@/components/session-auth";
import { Toaster } from "sonner";
import { QueryClientContext } from "@/providers/queryclient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Clinica PRO | Sistema de agendamento online para clínicas e consultórios",
  description:
    "Clinica PRO é um sistema de agendamento online que organiza a rotina da sua clínica, reduz faltas com lembretes automáticos e facilita o atendimento dos pacientes.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title:
      "Clinica PRO | Sistema de agendamento online para clínicas e consultórios",
    description:
      "Clinica PRO é um sistema de agendamento online que organiza a rotina da sua clínica, reduz faltas e automatiza seus agendamentos.",
    images: [
      {
        url: "/og-clinica-pro.png",
        width: 1200,
        height: 630,
        alt: "Dashboard da Clinica PRO com agenda de consultas organizada.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionAuthProvider>
          <QueryClientContext>
            <Toaster duration={2500} />
            {children}
          </QueryClientContext>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
