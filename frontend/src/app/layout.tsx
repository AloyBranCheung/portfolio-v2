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
      <body
        className={`${jetBrainsMono} antialiased w-full flex justify-center`}
      >
        <div className="container py-4 px-2 flex flex-col w-full gap-2">
          <header className="w-full">
            <Navbar />
          </header>
          <main className="w-full">{children}</main>
          <footer>footer here</footer>
        </div>
      </body>
    </html>
  );
}
