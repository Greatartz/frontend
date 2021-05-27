import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/index";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ title, children }) => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState(null);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    
    let one = `${API_URL}/categories`;
    let two = `${API_URL}/about-uses`;

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          setData(responses[0].data)
          setAbout(responses[1].data)
          setLoad(true)

        })
      )
      .catch(errors => {
        console.error(errors);
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
        <Header categories={data} about={about} load={load} />
      </header>

      <section>{children}</section>

      <footer>
        <Footer categories={data} about={about} load={load} />
      </footer>
    </main>
  );
};

Layout.defaultProps = {
  title: "News",
};
export default Layout;
