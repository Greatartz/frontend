import Stripe from "stripe";
import { SK_STRIPE } from "../../../config";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const GROUPA = process.env.NEXT_PUBLIC_PRODUCT_A_NAME || "countrya";
    const stripe = new Stripe(SK_STRIPE, {
      apiVersion: "2020-08-27",
    });

    let productsList = await stripe.products.list({
      active: true,
    });
    let [groupA] = productsList.data.filter((i) => i.name == GROUPA);
    let prices = await stripe.prices.list({
      active: true,
      product: String(groupA.id),
      expand: ["data.product"],
    });
    const PRICES = [prices.data[0].unit_amount, prices.data[1].unit_amount];

    const products = prices.data.map((item, i) => {
      return {
        priceId: item.id,
        productName:
          PRICES[i] >= PRICES[0] ? "Annual Digital" : "Monthly Digital",
        productId: item.product.id,
        productDesc: item.nickname,
        productImage: item.product.images[0],
        price: `$${(Number(item.unit_amount) / 100).toFixed(2)}`,
      };
    });

    return res.status(200).json(products);
  }
}
