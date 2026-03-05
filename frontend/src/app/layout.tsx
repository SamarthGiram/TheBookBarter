import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "TheBookBarter - Peer-to-Peer Book Exchange",
  description: "Exchange physical books locally using Magic Coins. The ultimate sustainable reading community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-100 mt-12 py-8 text-center text-gray-500 text-sm">
          <div className="max-w-7xl mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} TheBookBarter. All rights reserved.</p>
          </div>
        </footer>
        <Toaster position="bottom-center" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </body>
    </html>
  );
}
