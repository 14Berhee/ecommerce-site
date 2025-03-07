import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCart } from "@/providers";
import { ShoppingCart } from "phosphor-react";
import { useState, useEffect } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CartIcon = ({ cartItemsCount, onClick }) => (
  <button onClick={onClick} className="btn btn-ghost btn-circle flex relative">
    <ShoppingCart size={30} />

    {cartItemsCount > 0 && (
      <span className="badge badge-primary absolute top-0 right-0">
        {cartItemsCount}
      </span>
    )}
  </button>
);

const Navbar = ({ search, setSearch }) => {
  const { cartItems, setCartItems, removeFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { data: categories = [], isLoading } = useSWR(
    "https://fakestoreapi.com/products/categories",

    fetcher
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(savedCart);
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartItemCount =
    cartItems?.reduce((acc, curr) => acc + curr.quantity, 0) || 0;

  const shouldHideHeader = /^\/[^/]+\/[^/]+$/.test(router.pathname);

  return (
    <>
      <nav className="navbar bg-base-100 m-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            ></button>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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

            {isLoading ? (
              <p className="ml-3 text-sm text-gray-500">
                Loading categories...
              </p>
            ) : (
              categories.map((category) => (
                <Link
                  key={category}
                  href={`/${category}`}
                  className="px-2 hover:text-primary cursor-pointer"
                >
                  {category}
                </Link>
              ))
            )}
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">UrbanCart</a>
        </div>
        <div className="navbar-end">
          {!shouldHideHeader && (
            <label className="flex w-6 items-center mr-52">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered"
                aria-label="Search products"
              />
            </label>
          )}
          <CartIcon
            cartItemsCount={cartItemCount}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h3 className="font-bold text-lg">Shopping Cart</h3>

            {cartItems.length > 0 ? (
              <div className="py-4 ">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b py-2 "
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      ></img>
                      <div>
                        <p className="font-medium truncate w-64">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          ширхэг: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-sm btn-error"
                    >
                      Устгах
                    </button>
                  </div>
                ))}
                <div className="mt-4 flex justify-between items-center">
                  <p className="font-bold text-lg">
                    Total: $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="py-4 text-center text-gray-500">
                Таны сагс хоосон байна.
              </p>
            )}
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(false)} className="btn">
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
