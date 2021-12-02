import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import "../styles/globals.css";
import "../styles/reset-slick-theme.css";
import "../styles/resetSlick.css";
import SEO from "../next-seo.config.js";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <DefaultSeo {...SEO} />
          {loading && <Loader />}
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
