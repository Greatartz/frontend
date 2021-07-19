import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../config/index";
import Spinner from "@material-ui/core/CircularProgress";
import Header from "./Header";
import Footer from "./Footer";
import AlertSubscribe from "./AlertSubscribe";
import { useState } from "react";
import Head from "next/head";
const Layout = ({ children, isHide = false, afterLink }) => {
  const [showLoginModel, setShowLoginModel] = useState(false);
  const globalLogin = () => {
    const reverse = !showLoginModel;
    setShowLoginModel(reverse);
  };
  //fetch categories using React-query
  const header = useQuery("headerCat", () =>
    axios.get(`${API_URL}/categories`)
  );
  const about = useQuery("headerAbout", () => axios.get(`${API_URL}/abouts`));
  if (isHide) {
    return <AlertSubscribe show={isHide} currentLink={afterLink} />;
  } else {
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

        <header className="max-w-myMaxWidthHeader mx-auto">
          {/* if both request load */}
          {header.isFetched && about.isFetched ? (
            <Header
              categories={header.data.data}
              about={about.data.data}
              showLoginModel={showLoginModel}
              clickLogin={globalLogin}
            />
          ) : (
            <div className="flex h-screen">
              <div className="m-auto">
                <Spinner />
              </div>
            </div>
          )}
        </header>
        {/*  load show content */}
        <section className="max-w-myMaxWidth mx-auto">{children}</section>

        <footer className="max-w-myMaxWidth mx-auto">
          {/* both query load */}
          {header.isFetched && about.isFetched ? (
            <Footer
              categories={header.data.data}
              about={about.data.data}
              onClick={globalLogin}
            />
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
  }
};

export default Layout;
