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
          setData(responses[0].data);
          setAbout(responses[1].data);
          setLoad(true);
        })
      )
      .catch((errors) => {
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
        {isFetched ? (
          <Header categories={data.data} />
        ) : (
          <div className="flex h-screen">
            <div className="m-auto">
              <Spinner />
            </div>
          </div>
        )}
        {isFetched ? <section>{children}</section> : ""}
        <footer>{isFetched ? <Footer categories={data.data} /> : ""}</footer>
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
