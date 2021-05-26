import NextStripe from "next-stripe";
import { SK_STRIPE } from "../../../config/index";

export default NextStripe({
  stripe_key: SK_STRIPE,
});
