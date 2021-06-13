import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useRef } from "react";
import "../styles/globals.css";
import "../styles/reset-slick-theme.css";
import "../styles/resetSlick.css";

import SEO from "../next-seo.config.js";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
