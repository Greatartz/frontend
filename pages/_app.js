import { Provider } from "next-auth/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PK_STRIPE } from "../config/index";
import "../styles/globals.css";
const promise = loadStripe(PK_STRIPE);
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Elements stripe={promise}>
        <Component {...pageProps} />
      </Elements>
    </Provider>
  );
}

export default MyApp;
