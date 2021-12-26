const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://mitch-cumm-api.herokuapp.com";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "/";
const PK_STRIPE = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "";
const SK_STRIPE = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "";
const IPFINDER = process.env.NEXT_PUBLIC_IPREGISTRY;
export { API_URL, BASE_URL, PK_STRIPE, SK_STRIPE, IPFINDER };
