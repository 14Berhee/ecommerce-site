import "@/styles/globals.css";
import Navbar from "./Components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Component {...pageProps} />;
      </div>
    </div>
  );
}
