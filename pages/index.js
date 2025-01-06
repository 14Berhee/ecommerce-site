import useSWR from "swr";
import Hero from "./Components/Hero";
import { ProductDetail } from "./Components/ProductDetail";

export default function Home() {
  return (
    <div>
      <div>
        <Hero />
      </div>
    </div>
  );
}
