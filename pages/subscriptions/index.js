import Stripe from "stripe";
import { SK_STRIPE } from "../../config/index";
import Layout from "../../components/Layout";
import Plane from "../../components/Plane";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";

export default function subscriptions({ plans, after }) {
  const [session, loading] = useSession();
  const [haveEmail, setHaveEmail] = useState(false);
  useEffect(() => {
    if (session) {
      setHaveEmail(true);
    } else {
      setHaveEmail(false);
    }
  });

  const SEO = {
    title: "Page | Subscription",
    description:
      "MITCH CUMM subscribtion page, to provide subscribtion service for users",
  };

  return (
    <Layout title="mitch-cumm | subscribtion">
      <NextSeo {...SEO} />

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
            after={after}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { next } }) {
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
      after: next || "",
    },
  };
}
