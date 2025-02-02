import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "font-sans antialiased",
          fontSans.variable,
          "bg-[#0d0d0d]",
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col bg-[#0d0d0d] ">
            {/*<Navbar />*/}
            <main className="container mx-auto max-w-7xl flex-grow bg-[#0d0d0d] ">
              {children}
            </main>
            {/*<footer className="w-full flex items-center justify-center py-3">*/}
            {/*  <Link*/}
            {/*    isExternal*/}
            {/*    className="flex items-center gap-1 text-current"*/}
            {/*    href="https://heroui.com?utm_source=next-app-template"*/}
            {/*    title="heroui.com homepage"*/}
            {/*  >*/}
            {/*    <span className="text-default-600">Powered by</span>*/}
            {/*    <p className="text-primary">HeroUI</p>*/}
            {/*  </Link>*/}
            {/*</footer>*/}
          </div>
        </Providers>
      </body>
    </html>
  );
}
