import Hero from "./Components/Hero";

export default function Home({ search }) {
  return (
    <div>
      <div>
        <Hero searchQuery={search} />
      </div>
    </div>
  );
}
