import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQueryState } from "nuqs";
import SearchIcon from "../Components/Icons";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Navbar = () => {
  const url = "https://fakestoreapi.com/products/categories";
  const { data: categories = [], isLoading } = useSWR(url, fetcher);
  const [search, setSearch] = useQueryState("search");
  if (isLoading) return <div>Loading</div>;
  const router = useRouter();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const hideHeaderOn = ["/[product]/[productId]"];
  const shouldHideHeader = hideHeaderOn.includes(router.pathname);
  console.log(categories);
  return (
    <div className="navbar bg-base-100 m-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex="{0}"
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>

          <ul
            tabIndex="{0}"
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
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/${category}`}
              className="px-2 hover:text-primary cursor-pointer"
            >
              <p>{category}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-end">
        <div>
          {!shouldHideHeader && (
            <label className="flex w-6  items-center mr-52">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleChange}
                className="input input-bordered"
              />
              <SearchIcon className="ml-2" />
            </label>
          )}
        </div>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
