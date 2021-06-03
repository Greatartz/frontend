import Stripe from "stripe";
import { SK_STRIPE } from "../../config/index";
import Layout from "../../components/Layout";
import Plane from "../../components/Plane";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
export default function subscriptions({ plans }) {
  const [session, loading] = useSession();
  const [haveEmail, setHaveEmail] = useState(false);
  useEffect(() => {
    if (session) {
      setHaveEmail(true);
    } else {
      setHaveEmail(false);
    }
  });

  return (
    <Layout title="mitch-cumm | subscribtion">
      <div className="row mt-10">
        {plans.map((item) => (
          <Plane
            key={`${item.price}-la`}
            priceId={item.priceId}
            name={item.productName}
            productId={item.productId}
            desc={item.productDesc}
            cost={item.price}
            image={item.productImage}
            haveEmail={haveEmail}
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

  return {
    props: {
      plans: products,
    },
  };
}
