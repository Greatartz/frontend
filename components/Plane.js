import { CircularProgress } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { PK_STRIPE } from "../config";
export default function Plane({
  name,
  priceId,
  desc,
  cost,
  image,
  haveEmail,
  after,
}) {
  const [session, loading] = useSession();
  const [processing, setProcessing] = useState(false);
  const handleBuy = async (planName) => {
    setProcessing(true);
    if (haveEmail) {
      const email = session.user.email;
      const { data } = await axios.post(
        `/api/payment/createSession/${priceId}/${email}/${after}/${planName}`
      );
      const recivedId = data.sessionId;
      const stripe = await loadStripe(PK_STRIPE);
      if (stripe) {
        stripe.redirectToCheckout({
          sessionId: recivedId,
        });
      }
    } else {
      const { data } = await axios.post(
        `/api/payment/createSession/${priceId}/${after}/${planName}`
      );
      const recivedId = data.sessionId;
      const stripe = await loadStripe(PK_STRIPE);
      if (stripe) {
        stripe.redirectToCheckout({
          sessionId: recivedId,
        });
      }
    }
  };

  return (
    <div className="shadow rounded sm:w-1/2 flex flex-col justify-between py-2 text-center">
      <div className="mx-auto pt-1 w-40 sm:w-50 md:w-50 lg:w-56 h-auto">
        <img src={image} className="max-w-full max-h-full block" />
      </div>
      <div className="my-5">
        <button
          onClick={() => handleBuy(name)}
          disabled={processing}
          className="focus:outline-none"
        >
          {processing ? (
            <CircularProgress />
          ) : (
            <span
              className="px-5 py-3 rounded-lg shadow-lg bg-indigo-500 
      text-white uppercase tracking-wider font-semibold text-sm sm:text-base"
            >
              Subscribe Now!
            </span>
          )}
        </button>
      </div>

      <div className="pt-0 px-4">
        <h2 className="mb-5">{name}</h2>
        <p>{desc}</p>
        <p className="font-bold">Cost: {cost} </p>
      </div>
    </div>
  );
}
