import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCart } from "@/providers";
import { ShoppingCart } from "phosphor-react";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Navbar = ({ search, setSearch }) => {
  const { cartItems } = useCart();
  const url = "https://fakestoreapi.com/products/categories";
  const router = useRouter();
  const { data: categories = [], isLoading } = useSWR(url, fetcher);

  if (isLoading) return <div>Loading...</div>;

  const hideHeaderOn = ["/[product]/[productId]"];
  const shouldHideHeader = hideHeaderOn.includes(router.pathname);

  const cartItemCount =
    cartItems?.reduce((acc, curr) => acc + curr.quantity, 0) || 0;

  return (
    <div className="navbar bg-base-100 m-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          ></div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center ml-5">
          <Link className="font-extrabold text-[24px]" href={"/"}>
            Store
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="px-2 hover:text-primary cursor-pointer"
            >
              <p>{category}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">UrbanCart</a>
      </div>
      <div className="navbar-end">
        <div>
          {!shouldHideHeader && (
            <label className="flex w-6 items-center mr-52">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered"
              />
            </label>
          )}
        </div>
        <button className="btn btn-ghost btn-circle flex">
          <ShoppingCart size={30} />
          {cartItems?.length > 0 && (
            <div className="badge badge-primary ">{cartItemCount}</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
