import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import { API_URL } from "../../../config/index";
import { data } from "autoprefixer";

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
          user.data.password = credentials.password;
          return { status: "success", data: user.data };
        }
      } catch (e) {
        throw new Error("Not found ");
      }
    },
  }),
];

const callbacks = {
  // Getting the JWT token from API response
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.data.jwt;
      token.name = user.data.user.username;
      token.email = user.data.user.email;
      token.password = user.data.password;
    }

    return token;
  },

  async session(session, token) {
    session.passwordMain = token.password;
    session.accessToken = token.accessToken;
    return session;
  },
};

const options = {
  providers,
  callbacks,
};

export default (req, res) => NextAuth(req, res, options);
