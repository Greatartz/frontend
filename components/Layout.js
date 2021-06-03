import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../config/index";
import Spinner from "@material-ui/core/CircularProgress";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
const Layout = ({ children }) => {
  //fetch categories using React-query
  const header = useQuery("headerCat", () =>
    axios.get(`${API_URL}/categories`)
  );
  const about = useQuery("headerAbout", () => axios.get(`${API_URL}/abouts`));
  return (
    <main className="min-h-screen">
      <Head>
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
        {header.isFetched && about.isFetched ? (
          <Header categories={header.data.data} about={about.data.data} />
        ) : (
          <div className="flex h-screen">
            <div className="m-auto">
              <Spinner />
            </div>
          </div>
        )}
      </header>
      {/*  load show content */}
      <section>{children}</section>

      <footer>
        {/* both query load */}
        {header.isFetched && about.isFetched ? (
          <Footer categories={header.data.data} about={about.data.data} />
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

export default Layout;
