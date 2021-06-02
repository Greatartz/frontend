import Stripe from "stripe";
import absoluteUrl from "next-absolute-url";
import { SK_STRIPE } from "../../../../config";

export default async function handler(req, res) {
  const data = req.query.param;
  const { origin } = absoluteUrl(req);
  if (data.length > 1) {
    const priceId = data[0];
    const email = data[1];
    const stripe = new Stripe(SK_STRIPE, { apiVersion: "2020-08-27" });
    const session = await stripe.checkout.sessions.create({
      success_url: origin + "/order?session_id=ok",
      cancel_url: origin,
      payment_method_types: ["card"],
      line_items: [{ price: String(priceId), quantity: 1 }],
      mode: "subscription",
      customer_email: email,
    });
    return res.status(200).json({ sessionId: session.id });
  } else {
    const priceId = data[0];
    const stripe = new Stripe(SK_STRIPE, { apiVersion: "2020-08-27" });
    const session = await stripe.checkout.sessions.create({
      success_url: origin + "/order?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: origin,
      payment_method_types: ["card"],
      line_items: [{ price: String(priceId), quantity: 1 }],
      mode: "subscription",
    });
    return res.status(200).json({ sessionId: session.id });
  }
}
