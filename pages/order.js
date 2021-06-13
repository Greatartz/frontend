import Stripe from "stripe";
import generator from "generate-password";
import { API_URL, BASE_URL, SK_STRIPE } from "../config";
import { signIn, useSession } from "next-auth/client";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CircularProgress, Link } from "@material-ui/core";
import { NextSeo } from "next-seo";

function order({
  ok,
  login = true,
  customerName = "",
  customerEmail = "",
  password = "",
  next,
}) {
  const [session, loading] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (password !== "") {
      setTimeout(async () => {
        const res = await signIn("credentials", {
          email: customerEmail,
          password: password,
          callbackUrl: BASE_URL,
          redirect: false,
        });
        if (res.url) {
          if (next != "undefined") {
            router.push(`/single/${next}`);
          } else {
            router.push(BASE_URL);
          }
        }
      }, 10000);
    }
  }, []);

  const SEO = {
    title: "Page | Result",
    description:
      "MITCH CUMM subscription result page, to show subscription result",
  };

  return (
    <Layout title="mitch-cum finalized">
      <NextSeo {...SEO} />

      {ok ? (
        <section className="w-11/12 mx-auto my-10 leading-loose">
          <h1>Congratulation: {session && session.user.name}</h1>
          <h3>
            {" "}
            {login
              ? "You have successfully subscribed!"
              : `You have successfully subscribed , with the following email: ${customerEmail}`}{" "}
          </h3>
          <div>
            <Link href={next == "undefined" ? BASE_URL : `/single/${next}`}>
              <span>Continue your artical</span>
            </Link>
          </div>
        </section>
      ) : (
        <section className="w-11/12 mx-auto my-10 leading-loose">
          <h1>Welcome: {customerName}</h1>
          <div>
            <h3>
              Your subscribtion Completed successfully and registered to the
              system.
            </h3>
            <h3>your generated details is here, feel free to change them.</h3>
            <h3>
              Your email: <strong>{customerEmail}</strong>
            </h3>
            <h3>
              Your Password: <strong>{password}</strong>
            </h3>
            <CircularProgress />
          </div>
        </section>
      )}
    </Layout>
  );
}

export async function getServerSideProps({
  query: { session_id },
  query: { next },
}) {
  const nextUrl = next || "";
  if (session_id == "ok") {
    return {
      props: { ok: true, next: nextUrl },
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
      return {
        props: {
          ok: true,
          login: false,
          customerName,
          customerEmail,
          next: nextUrl,
        },
      };
    } else {
      return {
        props: {
          ok: false,
          login: false,
          customerName,
          customerEmail,
          password,
          next: nextUrl,
        },
      };
    }
  }
}
export default order;
