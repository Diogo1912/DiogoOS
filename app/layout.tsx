import type { Metadata } from "next";
import "./globals.css";
import "./neo.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Diogo Baptista",
  description:
    "Diogo Baptista — product, engineering, and the apps I build.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
