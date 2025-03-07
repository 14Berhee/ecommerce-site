import { useRouter } from "next/router";
import useSWR from "swr";
import { useCart } from "@/providers";
import ProductRating from "../Components/ProductRatingStar";

const fetcher = (...args) =>
  fetch(...args)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .catch((err) => console.error("Fetch error:", err));

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;

  const { data: product, error } = useSWR(
    productId ? `https://fakestoreapi.com/products/${productId}` : null,
    fetcher
  );

  const { addToCart } = useCart();

  if (error) return <div>Error loading product details.</div>;
  if (!product) return <div>Loading...</div>;

  const addCartHandler = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log(cart);

    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex >= 0) {
      cart[productIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    addToCart(product);
  };
  return (
    <div className="flex h-[500px] border-b-4 border-gray-300 shadow-lg rounded-lg mx-auto mt-20">
      <div className="w-[1000px]">
        <div className="w-[300px] h-[420px] mx-auto">
          <img src={product.image} alt={product.title} />
        </div>
      </div>
      <div className="mx-auto py-10 container px-10 bg-[#F3F4F6]">
        <h2 className="font-bold text-[24px]">{product.title}</h2>
        <p className="h-[276px]">{product.description}</p>
        <div className="flex justify-between">
          <p className="text-[18px] font-normal">${product.price}</p>
          <div>
            <div className="flex items-center gap-2">
              <p>Ratings: {product.rating.count}</p>
              <ProductRating rating={product.rating.rate} />
            </div>
            <button
              onClick={addCartHandler}
              className="bg-[#4169E1] text-white px-2 py-2 rounded-lg mt-1 hover:shadow-[0px_0px_10px_3px_rgba(59,130,246,0.7)] transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
