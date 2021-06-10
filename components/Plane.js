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
  const handleBuy = async () => {
    setProcessing(true);
    if (haveEmail) {
      const email = session.user.email;
      const { data } = await axios.post(
        `/api/payment/createSession/${priceId}/${email}/${after}`
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
        `/api/payment/createSession/${priceId}/${after}`
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
    <div className="shadow rounded w-1/2">
      <div className="p-5">
        <img src={image} className="h-auto max-h-52 w-1/2 object-content" />
      </div>

      <div className="pt-0 px-4">
        <h2 className="mb-5">{name}</h2>
        <p>{desc}</p>
        <p className="font-bold">Cost: {cost} </p>
        <div className="my-5">
          <button
            onClick={handleBuy}
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
                Subscibe Now!
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
