import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../config/index";
import Spinner from "@material-ui/core/CircularProgress";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
const Layout = ({ title, children }) => {
  //fetch categories using React-query
  const header = useQuery("headerCat", () =>
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
        {/* if both request load */}
        {header.isFetched ? (
          <Header categories={header.data.data} />
        ) : (
          <div className="flex h-screen">
            <div className="m-auto">
              <Spinner />
            </div>
          </div>
        )}
      </header>
      {/* both request load show content */}
      {header.isFetched ? <section>{children}</section> : ""}

      <footer>
        {/* both query load */}
        {header.isFetched ? (
          <Footer categories={header.data.data} />
        ) : (
          <div className="flex h-screen">
            <div className="m-auto">
              <Spinner />
            </div>
          </div>
        )}
      </footer>
    </main>
  );
};

Layout.defaultProps = {
  title: "News",
};
export default Layout;
