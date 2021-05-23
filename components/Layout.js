import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/index";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ title, children }) => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/categories`).then((res) => {
      setData(res.data);
      setLoad(true);
    });
  }, []);

  return (
    <main className="min-h-screen">
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          lang="en"
          content="width=device-width, initial-scale=1.0"
          httpEquiv="X-UA-Compatible"
          charSet="UTF-8"
        />
      </Head>
      <header>
        <Header categories={data} load={load} />
      </header>

      <section>{children}</section>

      <footer>
        <Footer categories={data} load={load} />
      </footer>
    </main>
  );
};

Layout.defaultProps = {
  title: "News",
};
export default Layout;
