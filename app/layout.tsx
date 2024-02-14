import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import AppLayout from "@/components/AppLayout";

const jost = Jost({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wizard Form",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
