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
        <div className="container max-w-5xl py-4 px-2 flex flex-col w-full gap-2">
          <header className="sticky top-2 z-50 w-full">
            <Navbar />
          </header>
          <main className="w-full px-4">{children}</main>
          <footer className="px-4">footer here</footer>
        </div>
      </body>
    </html>
  );
}
