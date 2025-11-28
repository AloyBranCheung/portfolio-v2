import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const jetBrainsMono = localFont({
  src: "../../public/fonts/JetBrainsMono-Regular.woff2",
});

export const metadata: Metadata = {
  title: "Brandon Cheung",
  description: "Portfolio website of Brandon Cheung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono} antialiased`}>
        <div className="w-full flex justify-center">
          <div className="container py-4 px-2">
            <div className="flex flex-col items-center w-full bg-red-500">
              <Navbar />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
