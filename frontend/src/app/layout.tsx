import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { DotBackground } from "@/components/DotBackground";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PageTransition from "@/components/PageTransition";
import NavbarWrapper from "@/components/NavbarWrapper";
import JotaiProvider from "@/components/JotaiProvider";

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
    <html suppressHydrationWarning lang="en" className="scroll-smooth">
      <body
        className={`${jetBrainsMono.className} antialiased w-full flex justify-center relative`}
      >
        <div className="container max-w-5xl py-4 px-2 flex flex-col w-full gap-2">
          <JotaiProvider>
            <ThemeProvider defaultTheme="light">
              <header className="sticky top-2 z-50 w-full">
                <NavbarWrapper />
              </header>
              <main className="w-full px-4">
                <PageTransition>{children}</PageTransition>
              </main>
            </ThemeProvider>
          </JotaiProvider>
          <Footer />
        </div>
        <DotBackground />
        {process.env.NODE_ENV !== "development" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
