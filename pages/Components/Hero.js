import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Hero = ({ searchQuery = "" }) => {
  const url = `https://fakestoreapi.com/products`;
  const { data: store, error } = useSWR(url, fetcher);
  const router = useRouter();

  const handleClick = (productId) => {
    router.push(`product/${productId}/`);
  };

  if (error) return <div>Error loading products</div>;
  if (!store) return <div>Loading...</div>;

  const filteredProducts = searchQuery
    ? store.filter((product) =>
        product.title.toUpperCase().includes(searchQuery.toUpperCase())
      )
    : store;
  return (
    <div className="flex flex-wrap max-w-[1290px] m-auto mt-7 gap-5">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleClick(product.id)}
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
              <p className="truncate w-64">{product.description}</p>
              <div className="flex bg-slate-100 p-2">
                <p>{product.category}</p>
                <p>{product.price}$</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Бүтээгдэхүүн олдсонгүй </div>
      )}
    </div>
  );
};

export default Hero;
