import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="px-4 lg:px-6 h-14 flex items-center bg-[#0081a7] text-[#fdfcdc]">
          <Link href="/" className="flex items-center justify-center  w-20" prefetch={false}>
            <img src="./logo.png" alt="" />          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/Models" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Models
            </Link>
            <Link href="/AboutUs" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              About
            </Link>
            {/* <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Clients
          </Link> */}
            <Link href="/ContactUs" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Contact
            </Link>
          </nav>
        </header>{children}</body>
    </html>
  );
}
