import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/principal/Profesor/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Docente - Universidad",
  description: "Plataforma de gestión para profesores universitarios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto relative backdrop:blur-lg">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
