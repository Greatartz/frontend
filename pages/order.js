import Stripe from "stripe";
import generator from "generate-password";
import { API_URL, BASE_URL, SK_STRIPE } from "../config";
import { signIn, useSession } from "next-auth/client";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Link } from "@material-ui/core";
import { NextSeo } from "next-seo";

export default function Order({
  ok,
  login = true,
  customerName = "",
  customerEmail = "",
  password = "",
  next,
  plan,
}) {
  const [session, loading] = useSession();
  const [processing, setProcessing] = useState(true);
  // time
  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  //end time
  if (!loading && session) {
    const jwt = session.accessToken;
    const id = session.idCard;
    axios.put(
      `${API_URL}/users/${id}`,
      { plan: plan, PlanBuyDate: getDate() },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
  }
  useEffect(async () => {
    if (password !== "") {
      setProcessing(true);
      const res = await signIn("credentials", {
        email: customerEmail,
        password: password,
        callbackUrl: BASE_URL,
        redirect: false,
      });
      if (res.url && session) {
        const jwt = session.accessToken;
        const id = session.idCard;
        await axios.put(
          `${API_URL}/users/${id}`,
          { plan: plan, PlanBuyDate: getDate() },
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
      }
      setProcessing(false);
    }
  }, [loading]);

  const SEO = {
    title: "Page | Result",
    description:
      "MITCH CUMM subscription result page, to show subscription result",
  };
  if (loading) {
    return (
      <div className="container mx-auto my-10">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <Layout title="mitch-cum finalized">
        <NextSeo {...SEO} />

        {ok ? (
          <section className="w-11/12 mx-auto my-10 leading-loose">
            <h1>
              Congratulations: {(session && session.user.name) || customerName}
            </h1>
            <h3>
              {login
                ? "You have successfully subscribed!"
                : `You have successfully subscribed , with the following email: ${customerEmail}`}
            </h3>
            <div>
              <Link href={next == "undefined" ? BASE_URL : `/single/${next}`}>
                <span>Continue your artical</span>
              </Link>
            </div>
          </section>
        ) : (
          <section className="w-11/12 mx-auto my-10 leading-loose">
            <h1>Congratulations: {customerName}</h1>
            <div>
              <h3>
                Your subscribtion Completed successfully and registered to the
                system.
              </h3>
              <h3>
                your generated details is here, feel free to change them through
                <strong>Settings</strong>.
              </h3>
              <h3>
                Your email: <strong>{customerEmail}</strong>
              </h3>
              <h3>
                Your Password: <strong>{password}</strong>
              </h3>
              {processing ? (
                <CircularProgress />
              ) : (
                <Link href={next == "undefined" ? BASE_URL : `/single/${next}`}>
                  <span>Continue your artical</span>
                </Link>
              )}
            </div>
          </section>
        )}
      </Layout>
    );
  }
}

Order.getInitialProps = async ({
  query: { session_id },
  query: { next },
  query: { plan },
}) => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  if (session_id == "ok") {
    return {
      ok: true,
      next,
      plan,
    };
  } else {
    const stripe = new Stripe(SK_STRIPE, { apiVersion: "2020-08-27" });
    const session = await stripe.checkout.sessions.retrieve(String(session_id));
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
      await axios
        .get(`${API_URL}/users?email=${customerEmail}`)
        .then(({ data }) => {
          axios.put(`${API_URL}/users/${data[0].id}`, {
            plan: plan,
            PlanBuyDate: today,
          });
        });
      return {
        ok: true,
        login: false,
        customerName,
        customerEmail,
        next,
        plan,
      };
    } else {
      return {
        ok: false,
        login: false,
        customerName,
        customerEmail,
        password,
        next,
        plan,
      };
    }
  }
};
