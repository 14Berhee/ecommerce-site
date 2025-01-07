import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(id ? `https://fakestoreapi.com/products/${id}` : null, fetcher);

  if (error) return <div>Error loading product details.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10 max-w-[700px]">
      <h1 className="text-2xl">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-auto" />
      <p>{product.description}</p>
      <p>{product.price}$</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductDetail;
