import useSWR from "swr";
import { useRouter } from "next/router";
import Hero from "../Components/Hero";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProductPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(`https://fakestoreapi.com/products/category/${category}`, fetcher);
  if (error) return <div>error</div>;
  if (isLoading) return <div>Loading</div>;

  return (
    <div className="container mx-auto mt-10 max-w-[1290px]">
      <div className="flex flex-wrap gap-5">
        {products?.map((product) => (
          <div key={product.id}>
            <div className="card bg-base-100 w-96 shadow-xl mt-4">
              <figure>
                <img
                  className="max-w-[270px] h-[400px]"
                  src={product.image}
                  alt={product.title} // Provide a meaningful alt text
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p className="max-w-[250px]">{product.description}</p>
                <div className="flex bg-slate-100 p-2">
                  <p>{product.category}</p>
                  <p>{product.price}$</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {category}
      </div>
    </div>
  );
};

export default ProductPage;
