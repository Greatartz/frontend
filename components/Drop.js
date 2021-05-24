import { useState } from "react";
import { signOut } from "next-auth/client";

export default function Drop({ name }) {
  const [hide, setHide] = useState(true);
  const handleToggle = () => {
    if (hide) {
      setHide(false);
    } else {
      setHide(true);
    }
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={handleToggle}
        >
          {name}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`origin-top-right absolute left-0 mt-2
         w-32 rounded-md shadow-lg bg-white ring-1
          ring-black ring-opacity-5 focus:outline-none ${
            hide ? "hidden" : "block"
          }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div className="py-1" role="none">
          <button
            className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
