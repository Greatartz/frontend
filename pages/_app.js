import { Provider } from "next-auth/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PK_STRIPE } from "../config/index";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useRef } from "react";
import "../styles/globals.css";

const promise = loadStripe(PK_STRIPE);
function MyApp({ Component, pageProps }) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Elements stripe={promise}>
            <Component {...pageProps} />
          </Elements>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
