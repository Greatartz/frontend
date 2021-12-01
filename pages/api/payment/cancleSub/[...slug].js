import Stripe from "stripe";
import { SK_STRIPE } from "../../../../config";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const stripe = new Stripe(SK_STRIPE, { apiVersion: "2020-08-27" });
    const { slug } = req.query;
    const subId = String(slug);
    try {
      const one = await stripe.subscriptions.del(subId);
      return res.status(200).json(one);
    } catch {
      return res.status(200).json({});
    }
  }
}
