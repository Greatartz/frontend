import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import swal from "sweetalert2";
import { useState } from "react";
import Stripe from "stripe";
import Layout from "../../../components/Layout";
import { SK_STRIPE } from "../../../config/index";
import { useRouter } from "next/router";
export default function Payment({ product, secret }) {
  //first part
  const client_secret = secret;
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  //

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disable, setDisable] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        swal.fire("bank", "Your subscribed successfully", "success");
      });
  };
  const handleChange = (e) => {
    setDisable(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <Layout>
      <div className="container mx-auto my-10">
        <h2> {product.productName} </h2>
        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} className="w-1/2" />
            <button
              type="submit"
              className="mt-3 bg-indigo-500 text-white p-1"
              disabled={processing || disable || succeeded}
            >
              <span>{processing ? <p>processing</p> : "Subscibe Now"}</span>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const stripe = new Stripe(SK_STRIPE, {
    apiVersion: "2020-08-27",
  });
  const cs = await stripe.customers.list({
    email: "ahmad@gmail.com",
  });
  console.log("cs ", cs);
  let prices = await stripe.prices.list({
    active: true,
    limit: 2,
    expand: ["data.product"],
    product: slug,
  });
  const product = prices.data.map((item) => {
    return {
      priceId: item.id,
      productName: item.product.name,
      productDesc: item.product.description,
      productImage: item.product.images[0],
      price: `$${(Number(item.unit_amount) / 100).toFixed(2)}`,
    };
  });

  const searchCustomer = await stripe.customers.retrieve("ahmad@gmail.com");
  console.log("searched ", searchCustomer);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: prices.data[0].unit_amount,
    currency: "usd",
  });
  return {
    props: {
      product: product[0],
      secret: paymentIntent.client_secret,
    },
  };
}
