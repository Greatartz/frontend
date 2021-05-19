import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import { API_URL } from "../../../config/index";

const providers = [
  Providers.Credentials({
    name: "credentials",
    authorize: async (credentials) => {
      //statr try
      try {
        const user = await axios.post(`${API_URL}/auth/local`, {
          identifier: credentials.email,
          password: credentials.password,
        });

        if (user) {
          console.log("user => --------------", user.data);
          return { status: "success", data: user.data };
        }
      } catch (e) {
        throw new Error("Not found");
      }
    },
  }),
];

const callbacks = {
  // Getting the JWT token from API response
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.data.jwt;
    }

    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  page: {
    error: "/login",
  },
};

export default (req, res) => NextAuth(req, res, options);
