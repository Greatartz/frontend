import Stripe from "stripe";
import { SK_STRIPE } from "../../../../config";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const stripe = new Stripe(SK_STRIPE, { apiVersion: "2020-08-27" });
    const { slug } = req.query;
    const email = String(slug);
    const one = await stripe.customers.list({
      email: email,
    });

    if (one.data.length > 0) {
      const data = await getSubscribeId(one?.data[0]?.id);
      return res.status(200).json(data);
    } else {
      return res.status(200).json({ active: false, subId: "" });
    }
  }
}
async function getSubscribeId(id) {
  try {
    const stripe = new Stripe(SK_STRIPE, { apiVersion: "2020-08-27" });
    const subscribtion = await stripe.subscriptions.list({
      customer: id,
    });
    if (subscribtion.data[0].status == "active") {
      return { active: true, subId: subscribtion.data[0].id };
    } else {
      return { active: false, subId: "" };
    }
  } catch {
    return { active: false, subId: "" };
  }
}
