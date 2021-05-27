import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../config/index";
import Spinner from "@material-ui/core/CircularProgress";
import { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
const Layout = ({ title, children }) => {
  //fetch categories using React-query
  const { isLoading, error, data, isFetched } = useQuery("headerCat", () =>
    axios.get(`${API_URL}/categories`)
  );

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
        {isFetched ? (
          <Header categories={data.data} />
        ) : (
          <div className="flex h-screen">
            <div className="m-auto">
              <Spinner />
            </div>
          </div>
        )}
      </header>
      {isFetched ? <section>{children}</section> : ""}
      <footer>{isFetched ? <Footer categories={data.data} /> : ""}</footer>
    </main>
  );
};

Layout.defaultProps = {
  title: "News",
};
export default Layout;
