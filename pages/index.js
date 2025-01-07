import useSWR from "swr";
import Hero from "./Components/Hero";
import ProductDetail from "./Components/product-detail/[id]";

export default function Home() {
  return (
    <div>
      <div>
        <Hero />
        <ProductDetail />
      </div>
    </div>
  );
}
