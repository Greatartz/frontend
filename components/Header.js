import { signOut, useSession } from "next-auth/client";
import { BASE_URL } from "../config/index";
import Link from "next/link";
import { useQuery } from "react-query";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useRouter } from "next/router";
import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";

export default function Header({ categories }) {
  const router = useRouter();
  const [session, loading] = useSession();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [term, setTerm] = useState("");
  const [toggle, setToggle] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?term=${term}`);
    setTerm("");
  };
  const handleCloseIcon = () => {
    setOpen(false);
  };
  const handleToggle = (value) => {
    setToggle(value);
  };
  return (
    <nav className="relative flex flex-wrap items-center justify-between bg-white shadow">
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 py-8">
        <div className="hidden sm:hidden md:hidden lg:flex">
          <div className="self-center">
            <p>
              <MailOutlineIcon className="mr-1" /> hassanim430@gmail.com
            </p>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-5xl uppercase">
            <Link href="/">
              <a>Mitch Cumm</a>
            </Link>
          </h1>
          <p className="text-center mt-5 lg:hidden">
            <MailOutlineIcon className="mr-1" /> hassanim430@gmail.com
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
              <a className="anchor">
                <button
                  onClick={() =>
                    signOut({ callbackUrl: BASE_URL, redirect: false })
                  }
                >
                  Sign out <PersonIcon />
                </button>
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
              <a className="anchor">
                <button
                  onClick={() =>
                    signOut({ callbackUrl: BASE_URL, redirect: false })
                  }
                >
                  Sign out <PersonIcon />
                </button>
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
              <div className="search-field-group">
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
            </form>
          </div>
        </div>
        {/*  menu collapse */}
      </div>
      {/* model */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
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
                      <LoginPopup toggle={handleToggle} />
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
    </nav>
  );
}
