"use client";

import "@/styles/globals.css";
import Navbar from "./Components/Navbar";
import { useQueryState } from "nuqs";
import { CartProvider } from "@/providers";

export default function App({ Component, pageProps }) {
  const [search, setSearch] = useQueryState("search");
  return (
    <CartProvider>
      <Navbar search={search || ""} setSearch={setSearch} />
      <Component {...pageProps} search={search} />
    </CartProvider>
  );
}
