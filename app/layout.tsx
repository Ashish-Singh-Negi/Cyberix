import type { Metadata } from "next";
import { ReactNode } from "react";

import { Inter } from "next/font/google";
import "./globals.css";

import HomePage from "./page";

import ThemeProvider from "./components/ThemeProvider";
import Header from "./components/Header";
import Nav from "./components/Nav";

import MenuContextProvider from "@/contexts/menuContext";
import SigninContextProvider from "@/contexts/signinContext";
import UserInfoContextProvider from "@/contexts/userInfoContext";
import CartContextProvider from "@/contexts/cartContext";
import ProductContextProvider from "@/contexts/productContext";
import PriceContextProvider from "@/contexts/priceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cybrix",
  description:
    "offers cutting-edge and innovative computer products and solutions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <MenuContextProvider>
            <SigninContextProvider>
              <UserInfoContextProvider>
                <ProductContextProvider>
                  <CartContextProvider>
                    <PriceContextProvider>
                      <Header />
                      <section className="flex bg-gray-50">
                        <Nav />
                        <main className="h-dvh w-full pt-14 px-3 bg-gray-100 dark:bg-gray-900 overflow-y-scroll box-border">
                          <HomePage>{children}</HomePage>
                        </main>
                      </section>
                    </PriceContextProvider>
                  </CartContextProvider>
                </ProductContextProvider>
              </UserInfoContextProvider>
            </SigninContextProvider>
          </MenuContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
