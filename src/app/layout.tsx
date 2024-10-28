import type { Metadata } from "next";
import { M_PLUS_1p } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";

const mplus1p = M_PLUS_1p({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mplus1p",
});

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  keywords: ["iguana vintage clothing", "plus size vintage clothing", "vintage 80s clothing", "90s vintage clothing", "vintage baby clothes", "electronics", "cellphones"],
  title: {
    default: "Gushop clothes store",
    template: "%s | Gushop clothes store",
  },
  openGraph: {
    description: "Welcome to Gushop, your ultimate destination for stylish and affordable fashion! At Gushop, we believe that looking great should never break the bank. Our curated collection features the latest trends in clothing for men, women, and children, ensuring that everyone can find something they love. With a focus on quality and comfort, our pieces are designed for everyday wear, special occasions, or anything in between. Explore our range of chic tops, trendy bottoms, elegant dresses, and comfortable loungewear, all available at your fingertips. Plus, enjoy seamless shopping with fast shipping and exceptional customer service. Discover your new favorite outfits at Gushop today—where fashion meets convenience!",
    images: [""]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${mplus1p.variable} antialiased flex flex-col min-h-screen font-[family-name:var(--font-mplus1p)]`}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
