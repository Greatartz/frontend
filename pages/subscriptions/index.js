import Stripe from "stripe";
import { SK_STRIPE } from "../../config/index";
import Layout from "../../components/Layout";
import Plane from "../../components/Plane";
export default function subscriptions({ plans }) {
  // Stripe()
  return (
    <Layout title="mitch-cumm | subscribtion">
      <div className="container my-10 mx-auto md:grid md:grid-cols-2 md:gap-4">
        {plans.map((item) => (
          <Plane
            key={`${item.price}-la`}
            priceId={item.priceId}
            name={item.productName}
            productId={item.productId}
            desc={item.productDesc}
            cost={item.price}
            image={item.productImage}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const stripe = new Stripe(SK_STRIPE, {
    apiVersion: "2020-08-27",
  });

  let prices = await stripe.prices.list({
    active: true,
    limit: 2,
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

  console.log("Products", products);
  return {
    props: {
      plans: products,
    },
  };
}
