import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
// import { AlertProvider } from '@/contexts/AlertContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Synctera Dashboard",
  description: "Developed by Arfaz Hussain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <AlertProvider> */}
      <LoadingProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
      </LoadingProvider>
      {/* </AlertProvider> */}
    </html>
  );
}
