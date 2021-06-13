import { signout, signOut, useSession } from "next-auth/client";
import { API_URL, BASE_URL } from "../config/index";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Visible from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import Blind from "@material-ui/icons/VisibilityOff";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import { Button } from "@material-ui/core";
import Swal from "sweetalert2";
import axios from "axios";
import DynamicPlans from "./DynamicPlans";
import Link from "next/link";
export default function Header({ categories, about }) {
  const router = useRouter();
  const [session, loading] = useSession();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [term, setTerm] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [subscribeModal, setSubscribeModal] = useState(false);
  //for setting ..
  //userData
  const [userFull, setUserFull] = useState(null);
  const [password, setPassword] = useState("");
  const [blind, setBlind] = useState(true);
  const [isEmail, setIsemail] = useState(false);
  //when loadin finished and there is session
  useEffect(() => {
    if (!loading) {
      if (session) {
        setIsemail(true);
        const jwt = session.accessToken;
        axios
          .get(`${API_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })
          .then(({ data }) => {
            setUserFull(data);
            setPassword(session.passwordMain);
          })
          .catch((err) => {
            //jwt expired
            signOut({ redirect: false, url: BASE_URL });
          });
      }
    }
  }, [loading]);
  const changePassword = async () => {
    const id = userFull.id;
    const { value } = await Swal.fire({
      input: "text",
      showCancelButton: "Cancel",
      inputPlaceholder: "New password",
      inputLabel: "New Password:",
    });
    if (value) {
      if (value.length >= 6) {
        axios
          .put(
            `${API_URL}/users/${id}`,
            { password: value },
            { headers: { Authorization: `Bearer ${session.accessToken}` } }
          )
          .then(() => {
            Swal.fire({
              title: "Security",
              text: "Password changed! you should sign in again",
              icon: "success",
              showConfirmButton: "Ok",
            }).then(() => {
              signout({ redirect: false });
              setShowSetting(false);
            });
          });
      } else {
        Swal.fire({
          title: "Error",
          text: "Your password must be at least 6 characters!",
          icon: "error",
        });
      }
    }
  };

  const changeName = async () => {
    const id = userFull.id;
    const { value } = await Swal.fire({
      input: "text",
      showCancelButton: "Cancel",
      inputPlaceholder: "New username",
      inputLabel: "New Username:",
    });
    if (value) {
      if (value.length >= 4) {
        axios
          .put(
            `${API_URL}/users/${id}`,
            { username: value },
            { headers: { Authorization: `Bearer ${session.accessToken}` } }
          )
          .then(() => {
            Swal.fire({
              title: "Security",
              text: "Username changed! you should sign in again",
              icon: "success",
              showConfirmButton: "Ok",
            }).then(() => {
              signout({ redirect: false });
              setShowSetting(false);
            });
          });
      } else {
        Swal.fire({
          title: "Error",
          text: "Username must be at least 4 characters!",
          icon: "error",
        });
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?term=${term}`);
    setTerm("");
  };

  const handleToggle = (value) => {
    setToggle(value);
  };
  const handleSettings = () => {
    setShowSetting(true);
  };
  const handleLogout = () => {
    setShowSetting(false);
    signOut({ redirect: false, callbackUrl: BASE_URL });
  };

  return (
    <nav className="relative flex flex-wrap items-center justify-between bg-white max-w-myMaxWidth mx-auto">
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 py-8">
        <div className="hidden sm:hidden md:hidden lg:flex">
          <div className="self-center flex flex-col justify-center">
            <div>
              <a href={`mailto:${about[0].email}`}>
                <MailOutlineIcon className="mr-1" /> {about[0].email}
              </a>
            </div>
            <button
              className="self-center
             border border-solid border-black
              focus:outline-none w-1/2 mt-3"
              onClick={() => setSubscribeModal(true)}
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-5xl uppercase">
            <Link href="/">
              <a> {about[0].name} </a>
            </Link>
          </h1>
          <p className="text-center mt-5 lg:hidden">
            <MailOutlineIcon className="mr-1" /> {about[0].email}
          </p>
        </div>

        <div className="hidden sm:hidden md:hidden lg:flex ml-auto">
          <p className="self-center">
            {!session && (
              <a
                className="anchor cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Sign in <PersonIcon />
              </a>
            )}
            {session && (
              <a className="anchor cursor-pointer" onClick={handleSettings}>
                Settings <PersonIcon />
              </a>
            )}
          </p>
        </div>
      </div>

      <hr className="mb-2 w-11/12 mx-auto border-blueGray-300" />

      <div className="w-11/12 mx-auto flex flex-wrap items-center justify-between">
        <div className="mb-2 w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <MenuIcon />
          </button>

          <p className="self-center lg:hidden">
            {!session && (
              <a
                className="anchor cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Sign in <PersonIcon />
              </a>
            )}
            {session && (
              <a className="anchor cursor-pointer" onClick={handleSettings}>
                Settings <PersonIcon />
              </a>
            )}
          </p>
        </div>

        <div
          className={
            "lg:flex flex-grow items-left flex-col lg:flex-row" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:mr-auto">
            <li className="nav-item">
              <Link href="/">
                <a className="anchor border-b border-borderColor sm:border-borderColor md:border-borderColor lg:border-white">
                  Home
                </a>
              </Link>
            </li>
            {categories.map((data) => (
              <li className="nav-item" key={`${data.id}`}>
                <Link href={`/category/${data.name}`}>
                  <a
                    category={data.id}
                    className={`${
                      router.asPath === `/category/${data.name}`
                        ? "anchorActive border-b border-borderColor sm:border-borderColor md:border-borderColor lg:border-white"
                        : "anchor border-b border-borderColor sm:border-borderColor md:border-borderColor lg:border-white"
                    }`}
                  >
                    {data.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="searchComponent py-5">
            <form
              onSubmit={handleSubmit}
              className="search-form flex bg-bgColor"
            >
              <div className="search-field-group w-full">
                <input
                  type="text"
                  className="pl-3 focus:outline-none bg-bgColor"
                  placeholder="Search ..."
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  title="Search for:"
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="search-form-link focus:outline-none"
              >
                <img
                  src="/search.svg"
                  alt="Search Icon"
                  className="search-icon"
                />
              </button>
            </form>
          </div>
        </div>
        {/*  menu collapse */}
      </div>
      {/* model */}
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex
           overflow-x-hidden overflow-y-auto fixed inset-0
            z-50 outline-none focus:outline-none max-w-myMaxWidth mx-auto"
          >
            <div className="relative w-auto my-6 mx-auto md:w-96 max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {toggle ? "Register" : "Login"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <CloseIcon className="text-black" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {toggle ? (
                    <>
                      <RegisterPopup toggle={handleToggle} />
                    </>
                  ) : (
                    <>
                      <LoginPopup toggle={handleToggle} mainPage={true} />
                    </>
                  )}
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* end model */}
      {/* setting */}
      {showSetting ? (
        <>
          <div
            className="justify-center items-center
           flex overflow-x-hidden overflow-y-auto fixed
            inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto md:w-96 max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {userFull.username}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowSetting(false)}
                  >
                    <CloseIcon className="text-black" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <label>Username:</label>
                  <div className="mb-4 relative flex items-center">
                    <input
                      className="input border filled border-gray-400 appearance-none rounded w-full md:w-11/12 px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                      type="text"
                      value={userFull.username}
                      disabled
                      autoFocus
                    />
                    <div className="editUsername">
                      <Edit onClick={changeName} />
                    </div>
                  </div>

                  <div className="mb-4 relative">
                    Email:
                    <input
                      className="input border filled border-gray-400 appearance-none rounded w-full md:w-11/12 px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                      type="email"
                      value={userFull.email}
                      disabled
                      autoFocus
                    />
                  </div>
                  <label>Password:</label>
                  <div className="mb-4 relative flex items-center">
                    <input
                      className="input border filled border-gray-400 appearance-none rounded w-full md:w-10/12 px-3 py-3 pt-3 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600"
                      type={blind ? "password" : "text"}
                      disabled
                      value={password}
                      autoFocus
                    />
                    <div className="seePassword">
                      {blind ? (
                        <Blind onClick={() => setBlind(false)} />
                      ) : (
                        <Visible onClick={() => setBlind(true)} />
                      )}
                    </div>
                    <div className="editPassword">
                      <Edit className="mx-2" onClick={changePassword} />
                    </div>
                  </div>

                  <div className="p-1">
                    <Button
                      variant="outlined"
                      color="default"
                      onClick={handleLogout}
                    >
                      Logout
                      <ExitToAppIcon className="text-black mx-2" />
                    </Button>
                  </div>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* end setting */}
      {subscribeModal ? (
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-visible
         fixed inset-0 z-50 outline-none focus:outline-none bg-black max-w-myMaxWidth mx-auto"
        >
          <div className="w-11/12 sm:w-11/12 sm:mx-auto md:w-2/4 lg:w-customW my-6">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none h-full focus:outline-none">
              {/*body*/}
              <h3 className="m-2 text-center">Subscription Plans</h3>
              <div className="leading-loose flex flex-col md:flex-row">
                <DynamicPlans isemail={isEmail} />
              </div>
              <button
                className="text-lg bg-red-400 focus:outline-none"
                onClick={() => setSubscribeModal(false)}
              >
                <span className="p-2 text-black font-bold my-2">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
