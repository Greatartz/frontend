import { CircularProgress } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { PK_STRIPE } from "../config";
export default function Plane({
  name,
  priceId,
  productId,
  desc,
  cost,
  image,
  haveEmail,
}) {
  const [session, loading] = useSession();
  const [processing, setProcessing] = useState(false);
  const handleBuy = async () => {
    setProcessing(true);
    if (haveEmail) {
      const email = session.user.email;
      const { data } = await axios.post(
        `/api/payment/createSession/${priceId}/${email}`
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
        `/api/payment/createSession/${priceId}`
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
    <div className="shadow rounded text-center">
      <div className="w-full p-5">
        <img src={image} className="h-auto max-h-52 w-full object-content" />
      </div>

      <div className="p-10 pt-0">
        <h2 className="mb-5">{name}</h2>
        <p className="leading-loose">{desc}</p>
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
