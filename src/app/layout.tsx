import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskWise — Gestor de tareas con IA",
  description: "Organizá tus tareas con inteligencia artificial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={geist.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
