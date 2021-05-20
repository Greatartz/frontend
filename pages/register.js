import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import Link from "next/link";
import { API_URL } from "../config/index";
function register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nomatch, setNomatch] = useState(0);
  const router = useRouter();

  const renderPassword = () => {
    if (nomatch === 0) {
      return;
    } else if (nomatch === 1) {
      return <span className="text-red-500">Password are not matched!</span>;
    } else {
      return <span className="text-green-500">Password are matched!</span>;
    }
  };

  const handlePassword = (value, type) => {
    //set value according to type
    if (type === 1) {
      setPassword(value);
    } else if (type === 2) {
      setConfirm(value);
    }
    //when we type in confirm input check validation
    if (type === 2 && password === value) {
      setNomatch(2);
    } else if (type === 2 && password !== value) {
      setNomatch(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm || name === "" || email === "") {
      Swal.fire(
        "Invalid",
        "Please cheeck that you fill all form correctly",
        "error"
      );
    } else {
      const registerInfo = {
        username: name,
        email: email,
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

      const res = await register.json();
      if (res.jwt) {
        //
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
        //
      } else {
        Swal.fire("Invalid", res.message[0].messages[0].message, "error");
      }
    }
  };
  return (
    <div className="register">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <form method="POST" onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                className="block border border-grey-light
               w-full p-3 rounded mb-4"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handlePassword(e.target.value, 1)}
              />
              <input
                type="password"
                className={`block border border-grey-light
               w-full p-3 rounded mb-4 ${nomatch ? "border-red" : ""}`}
                name="confirm_password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => handlePassword(e.target.value, 2)}
              />
              {renderPassword()}
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-800 focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <Link
                className="no-underline border-b border-grey-dark text-grey-dark ml-1"
                href="/privacy"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <Link className="border-b border-blue text-blue" href="/login">
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

export default register;
