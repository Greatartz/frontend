import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import Swal from "sweetalert2";
import Visible from "@material-ui/icons/Visibility";
import Blind from "@material-ui/icons/VisibilityOff";
import Link from "next/link";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: `/`,
      redirect: false,
    });
    if (res?.error) {
      setLoading(false);
      Swal.fire("Invalid Login", "username or password is incorrect");
    }
    if (res.url) {
      router.push("/");
    }
  };

  const handleVisiblity = () => {
    if (visible == false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  return (
    <div className="w-full flex flex-wrap">
      {/* <!-- Login Section --> */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
          <a href="#" className="bg-black text-white font-bold text-xl p-4">
            Logo
          </a>
        </div>

        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Welcome.</p>
          <form className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <label for="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="shadow appearance-none border
                      rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col pt-4">
              <label for="password" className="text-lg">
                Password
              </label>
              <div className="flex">
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none
                      border rounded w-11/12 py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="ml-2 mt-2" onClick={handleVisiblity}>
                  {visible ? <Visible /> : <Blind />}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
            >
              {loading ? <CircularProgress className="p-2" /> : "Log In"}
            </button>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Don't have an account?{" "}
              <Link href="/register" className="underline font-semibold">
                Register here.
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* <!-- Image Section --> */}
      <div className="w-1/2 shadow-2xl">
        <img
          className="object-cover w-full h-screen hidden md:block"
          src="https://source.unsplash.com/IXUM4cJynP0"
        />
      </div>
    </div>
  );
}
