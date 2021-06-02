import Stripe from "stripe";
import generator from "generate-password";
import { API_URL, SK_STRIPE } from "../config";
import { signIn } from "next-auth/client";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
function order({ ok, customerName = "", customerEmail = "", password = "" }) {
  const router = useRouter();
  const handleQuick = async () => {
    console.log("clciked");
    const res = await signIn("credentials", {
      email: customerEmail,
      password: password,
      callbackUrl: "/",
      redirect: true,
    });
    console.log("result ", res);
    if (res.url) {
      router.push("/");
    }
  };
  return (
    <Layout title="mitch-cum finalized">
      {ok ? (
        <p>For realizing you can just login with your email and password!</p>
      ) : (
        <>
          <h1>Welcome: {customerName}</h1>
          <p>
            Your subscribtion end successfully for Next Time just Login with
            email <b>{customerEmail}</b>
            and password <b>{password}</b>
            You can also Change Your Password later!
          </p>
          <button
            className="bg-indigo-500 p-2 rounded-sm shadow-sm"
            onClick={handleQuick}
          >
            Sign In Now!
          </button>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: { session_id } }) {
  let isOk = session_id == "ok" ? true : false;
  if (!isOk) {
    const sessionId = session_id;
    const stripe = new Stripe(SK_STRIPE, { apiVersion: "2020-08-27" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customer = await stripe.customers.retrieve(session.customer);
    const customerEmail = customer.email;
    const customerName = customer.name;
    const password = generator.generate({
      length: 8,
      numbers: true,
    });
    const registerInfo = {
      username: customerName,
      email: customerEmail,
      password: password,
    };
    const register = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInfo),
    });

    const result = await register.json();
    if (result.statusCode === 400) {
      return {
        props: { ok: true, customerName, customerEmail, password },
      };
    } else {
      return {
        props: { ok: false, customerName, customerEmail, password },
      };
    }
  } else {
    return {
      props: { ok: true },
    };
  }
}
export default order;
