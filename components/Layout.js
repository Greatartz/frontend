import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useRouter } from "next/router";

const Layout = ({ title, children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          lang="en"
          content="width=device-width, initial-scale=1.0"
          http-equiv="X-UA-Compatible"
          content="IE=edge"
          charset="UTF-8"
        />
      </Head>
      <header>
        <Header />
      </header>

      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

Layout.defaultProps = {
  title: "News",
};
export default Layout;
