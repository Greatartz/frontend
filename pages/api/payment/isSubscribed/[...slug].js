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
      const csId = String(one.data[0].id);
      const final = await isSubscribed(csId);
      if (final) {
        return res
          .status(200)
          .json({ subscribed: true, isCustomer: true, customerId: csId });
      } else {
        return res
          .status(200)
          .json({ subscribed: false, isCustomer: true, customerId: csId });
      }
    } else {
      //there is no customer
      return res
        .status(200)
        .json({ subscribed: false, isCustomer: false, customerId: "" });
    }
  } else {
    //if request methd is not post
    return res.status(404).send("404");
  }
}
async function isSubscribed(id) {
  try {
    const stripe = new Stripe(SK_STRIPE, { apiVersion: "2020-08-27" });
    const subscribtion = await stripe.subscriptions.list({
      customer: id,
    });
    if (subscribtion.data[0].status == "active") {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}
