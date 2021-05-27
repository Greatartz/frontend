import { signOut, useSession } from "next-auth/client";
import { BASE_URL } from "../config/index";
import Link from "next/link";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useRouter } from "next/router";
import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";

export default function Header({ categories }) {
  const [session, loading] = useSession();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();
  const [term, setTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?term=${term}`);
    setTerm("");
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
        </div>

        <div className="hidden sm:hidden md:hidden lg:flex ml-auto">
          <p className="self-center">
            <PersonIcon />
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
        </div>
        <div
          className={
            "lg:flex flex-grow items-left flex-col lg:flex-row" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:mr-auto">
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
            <li className="nav-item">
              {!session && (
                <Link href="/login">
                  <a className="anchor">Sign in</a>
                </Link>
              )}
              {session && (
                <a className="anchor">
                  <button
                    onClick={() =>
                      signOut({ callbackUrl: BASE_URL, redirect: false })
                    }
                  >
                    Sign out
                  </button>
                </a>
              )}
            </li>
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
        </div>{" "}
        {/*  menu collapse */}
      </div>
    </nav>
  );
}
