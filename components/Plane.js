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
    <div className="obj1 md:flex md:border md:border-solid md:border-black md:p-4">
      <img src={image} className="h-auto w-48 md:mx-2" />
      <div>
        <h2>{name}</h2>
        <p>{desc}</p>
        <p>Cost: {cost} </p>
        <div className="my-2">
          <button onClick={handleBuy} disabled={processing}>
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
