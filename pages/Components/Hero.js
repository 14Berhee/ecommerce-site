import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Hero = () => {
  const url = `https://fakestoreapi.com/products`;
  const { data: store, error } = useSWR(url, fetcher);

  if (error) return <div>Error loading products</div>;
  if (!store) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap max-w-[1290px] m-auto mt-7 gap-5">
      {store.length > 0 ? (
        store.map((product) => (
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
        ))
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default Hero;
