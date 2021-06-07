import Stripe from "stripe";
import { SK_STRIPE } from "../../../config";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const stripe = new Stripe(SK_STRIPE, {
      apiVersion: "2020-08-27",
    });

    let prices = await stripe.prices.list({
      active: true,
      expand: ["data.product"],
    });
    const products = prices.data.map((item) => {
      return {
        priceId: item.id,
        productId: item.product.id,
        productName: item.product.name,
        productDesc: item.product.description,
        productImage: item.product.images[0],
        price: `$${(Number(item.unit_amount) / 100).toFixed(2)}`,
      };
    });
    return res.status(200).json(products);
  }
}
