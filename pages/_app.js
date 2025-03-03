import "@/styles/globals.css";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import { CartProvider } from "@/providers";

export default function App({ Component, pageProps }) {
  const [search, setSearch] = useState("");
  return (
    <CartProvider>
      <Navbar search={search || ""} setSearch={setSearch} />
      <Component {...pageProps} search={search} />
    </CartProvider>
  );
}
