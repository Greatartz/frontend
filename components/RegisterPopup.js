import { useState } from "react";
import Swal from "sweetalert2";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import Link from "next/link";
import Ok from "@material-ui/icons/VerifiedUser";
import { API_URL, BASE_URL } from "../config/index";

export default function RegisterPopup({ toggle }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nomatch, setNomatch] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const renderPassword = () => {
    if (nomatch === 0) {
      return;
    } else if (nomatch === 1) {
      return <span className="text-red-500">Password are not matched!</span>;
    } else {
      return (
        <span className="text-blue-400">
          <Ok />
        </span>
      );
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
    setLoading(true);
    if (confirm === "" || password === "" || name === "" || email === "") {
      setLoading(false);
      Swal.fire(
        "Invalid",
        "Please cheeck that you fill all form correctly",
        "error"
      );
    } else if (confirm !== password) {
      setLoading(false);
      Swal.fire("Invalid", "Password are not matched!", "error");
    } else if (password.length < 6) {
      setLoading(false);
      Swal.fire("Invalid", "Password must be at least 6 character!", "error");
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
          callbackUrl: BASE_URL,
          redirect: false,
        });
        if (res?.error) {
          setLoading(false);
          Swal.fire("Invalid Login", "username or password is incorrect");
        }
        if (res.url) {
          router.reload();
        }
        //
      } else {
        Swal.fire("Invalid", res.message[0].messages[0].message, "error");
      }
    }
  };
  return (
    <>
      <form
        method="POST"
        className="flex flex-col pt-3 md:pt-8 md:w-full"
        onSubmit={handleSubmit}
      >
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
          className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
        >
          {loading ? <CircularProgress className="p-2" /> : "Create Account"}
        </button>
      </form>
      <div className="text-center text-sm text-grey-dark mt-4">
        By signing up, you agree to the
        <Link
          className="no-underline border-b border-grey-dark text-grey-dark ml-1"
          href="/privacy-policy"
        >
          Privacy Policy
        </Link>
      </div>

      <div className="text-grey-dark mt-6">
        Already have an account?
        <a
          className="underline font-semibold cursor-pointer hover:underline"
          onClick={() => toggle(false)}
        >
          Log In
        </a>
        .
      </div>
    </>
  );
}
