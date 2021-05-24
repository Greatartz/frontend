import Skeleton from "react-loading-skeleton";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";

import { useRouter } from "next/router";
import { useState } from "react";
import Drop from "./Drop";
// let DropdownTrigger = D;
// let DropdownContent = Dropdown.DropdownContent;

export default function Header({ categories, load }) {
  const [session, loading] = useSession();
  console.log("seesion => ", session);
  const router = useRouter();
  const [term, setTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?term=${term}`);
    setTerm("");
  };

  if (load) {
    return (
      <nav className="bg-white shadow">
        <div className="bg-bgColor w-full">
          <div className="container mx-auto">
            <div className="flex-grow flex items-center">
              <h1 className="text-3xl uppercase py-5 px-7 cursor-pointer">
                <Link href="/">Mitch Cumm</Link>
              </h1>
              <h3 className="text-lg px-5">Some description about website</h3>
            </div>
          </div>
        </div>

        <div className="container mx-auto flex flex-wrap items-center">
          <div className="md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 uppercase text-title py-3 text-lg">
            {categories.map((data) => (
              <Link href={`/category/${data.name}`} key={`${data.id}`}>
                <a
                  category={data.id}
                  className={`anchorTag  ${
                    router.asPath === `/category/${data.name}`
                      ? "text-borderColor hover:text-borderColor border-b border-borderColor block md:inline-block px-3 py-3"
                      : ""
                  }`}
                >
                  {data.name}
                </a>
              </Link>
            ))}
          </div>

          <div className="searchComponent flex lg:flex-grow sm:ml-5 sm:mb-5">
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

          <div className="mr-2 sm:ml-5 sm:mb-5">
            {!session && (
              <Link href="/login">
                <a>Sign in</a>
              </Link>
            )}
            {session ? <Drop name={session.user.name} /> : ""}
          </div>
        </div>
      </nav>
    );
  } else {
    return <Skeleton count={1} />;
  }
}
