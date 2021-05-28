const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "/";
const PK_STRIPE = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "";
const SK_STRIPE = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "";
export { API_URL, BASE_URL, PK_STRIPE, SK_STRIPE };
