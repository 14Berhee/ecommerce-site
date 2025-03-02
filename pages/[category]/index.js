import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProductPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(`https://fakestoreapi.com/products/category/${category}`, fetcher);

  const handleClick = (productId) => {
    router.push(`product/${productId}/`);
  };

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10 max-w-[1290px]">
      <div className="flex flex-wrap gap-5">
        {products?.map((product) => (
          <div
            onClick={() => handleClick(product.id)}
            key={product.id}
            className="card bg-base-100 w-96 shadow-xl mt-4 cursor-pointer"
          >
            <figure>
              <img
                className="max-w-[270px] h-[400px]"
                src={product.image}
                alt={product.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p className="max-w-[250px] truncate">{product.description}</p>
              <div className="flex bg-slate-100 p-2">
                <p>{product.category}</p>
                <p>{product.price}$</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
