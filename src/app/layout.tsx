import type { Metadata, Viewport } from "next";

import { Navbar } from "@/components/navbar";
import { Avenir } from "@/styles/typeface";
import { AppProviders } from "@/providers/app";

import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: {
    template: "%s | Hogamba",
    default: "Hogamba",
  },
  description: "Hogamba Frontend Technical Assignment",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#12101c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={Avenir.className}>
      <body>
        <AppProviders>
          <Navbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
