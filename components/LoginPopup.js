import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Swal from "sweetalert2";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Visible from "@material-ui/icons/Visibility";
import Blind from "@material-ui/icons/VisibilityOff";

export default function LoginPopup({ toggle, mainPage }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("in", inputs);
    if (inputs.email == "" || inputs.password == "") {
      Swal.fire("Required Field", "email and password are required!");
      return;
    } else {
      setLoading(true);
      const res = await signIn("credentials", {
        email: inputs.email,
        password: inputs.password,
        callbackUrl: `/`,
        redirect: false,
      });

      if (res?.error) {
        setLoading(false);
        Swal.fire("Invalid Login", "username or password is incorrect");
      }
      if (res.url) {
        router.reload();
      }
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
    <>
      <form className="flex flex-col md:pt-2 md:w-full" method="post">
        <div className="flex flex-col pt-2 md:pt-4">
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={(e) =>
              setInputs({ ...inputs, [e.target.name]: e.target.value })
            }
            placeholder="your@email.com"
            className="shadow appearance-none border
                      rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex flex-col pt-4">
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <div className="flex">
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, [e.target.name]: e.target.value })
              }
              className="shadow appearance-none
                      border rounded w-11/12 py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="ml-2 mt-2" onClick={handleVisiblity}>
              {visible ? <Visible /> : <Blind />}
            </span>
          </div>
        </div>
        <button
          className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
          onClick={handleLogin}
        >
          {loading ? <CircularProgress className="p-2" /> : "Log In"}
        </button>
      </form>
      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        {mainPage && (
          <div className="pt-4 pb-4">
            <p>
              Don't have an account?
              <a
                className="underline font-semibold cursor-pointer hover:underline"
                onClick={() => toggle(true)}
              >
                Register here.
              </a>
              <br />
            </p>
          </div>
        )}
        {/* forgot password */}
      </div>
    </>
  );
}
