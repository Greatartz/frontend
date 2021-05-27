import Link from "next/link";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";

export default function Footer({ categories, about }) {
  return (
    <footer className="border-t-2 border-bgColor pb-6">
      <section className="bg-bgColor pt-8">
        <div className="w-11/12 mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                Find us on any of these platforms.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button
                  className="bg-white facebook shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a href={about[0].facebook} target="_blank">
                    <FacebookIcon />
                  </a>
                </button>
                <button
                  className="bg-white facebook shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a href={about[0].twitter} target="_blank">
                    <TwitterIcon />
                  </a>
                </button>
                <button
                  className="bg-white facebook shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a href={about[0].linkedin} target="_blank">
                    <LinkedInIcon />
                  </a>
                </button>
                <button
                  className="bg-white facebook shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <a href={about[0].youtube} target="_blank">
                    <YouTubeIcon />
                  </a>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Categories
                  </span>
                  <ul className="list-unstyled">
                    {categories.map((category) => (
                      <li key={`cn-${category.id}`}>
                        <Link
                          href={`/category/${category.name}`}
                          key={`${category.id}`}
                        >
                          <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm capitalize">
                            {category.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Pages
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link href="/">
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm capitalize">
                          Home
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/about">
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm capitalize">
                          About US
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm capitalize">
                          Contact Us
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm capitalize">
                          Privacy Policy
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm capitalize">
                          Sign Up
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm capitalize">
                          Sing In
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="mb-6 border-blueGray-300" />

      <div className="flex flex-wrap items-center md:justify-between justify-center">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
          <div className="text-sm text-blueGray-500 font-semibold py-1">
            Copyright © {new Date().getFullYear()} Reserved by{" "}
            <a className="text-blueGray-500 hover:text-blueGray-800">
              {about[0].name}
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
