import Stripe from "stripe";
import { SK_STRIPE } from "../../../../config";

export default async function handler(req, res) {
  const { slug } = req.query;
  const csId = String(slug);
  if (req.method == "POST") {
    const stripe = new Stripe(SK_STRIPE, { apiVersion: "2020-08-27" });
    const subId = await getSubscribeId(csId);
    const result = await stripe.subscriptions.del(subId);
    if (result) {
      res.status(200).json(true);
    }
  }
}
async function getSubscribeId(customerId) {
  try {
    const stripe = new Stripe(SK_STRIPE, { apiVersion: "2020-08-27" });
    const subscribtion = await stripe.subscriptions.list({
      customer: customerId,
    });
    const subId = String(subscribtion.data[0].id);
    return subId;
  } catch {
    return false;
  }
}
