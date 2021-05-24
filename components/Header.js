import Skeleton from "react-loading-skeleton";
import { signOut, useSession } from "next-auth/client";
import { BASE_URL } from "../config/index";
import Link from "next/link";

import { useRouter } from "next/router";
import { useState } from "react";

export default function Header({ categories, load }) {
  const [session, loading] = useSession();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();
  const [term, setTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?term=${term}`);
    setTerm("");
  };

  if (load) {
    return (
      <nav className="relative flex flex-wrap items-center justify-between bg-white shadow">
        <div className="bg-bgColor w-full">
          <div className="w-11/12 mx-auto">
            <h1 className="text-3xl uppercase py-5">
              <Link href="/">
                <a>Mitch Cumm</a>
              </Link>
            </h1>
          </div>
        </div>

        <div className="w-11/12 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              Menu
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
                          ? "anchorActive"
                          : "anchor "
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

            <div className="searchComponent">
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
        </div>
      </nav>
    );
  } else {
    return <Skeleton count={1} />;
  }
}
