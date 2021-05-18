import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({categories, load}) {
  const router = useRouter();
  console.log(router.asPath)
  if (load) {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-white shadow">
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

        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="block lg:hidden ">
            <button
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="menu w-full lg:block flex-grow lg:flex lg:items-center text-lg lg:w-auto uppercase text-title py-3">

          <div className="text-md lg:flex-grow flex">

            {categories.map((data) => (
              <Link href={`/category/${data.name}`} key={`${data.id}`}>
                <a
                  category={data.id}
                  className= {`anchorTag  ${
                    router.asPath === `/category/${data.name}`
                      ? "text-borderColor hover:text-borderColor border-b border-borderColor"
                      : ""
                  }`}
                >
                  {data.name}
                </a>
              </Link>
            ))}

            <div className="searchComponent">
              <form role="search" method="get" className="search-form flex" action="#">
                  <a href="#" class="search-form-link">
                      <img src="/search.svg" alt="Search Icon" className="search-icon" />
                  </a>
                <div className="search-field-group">
                    <input type="search" className="search-field focus-none" placeholder="Search ..." value="" name="s" title="Search for:" />
                    <input type="submit" className="search-submit hidden" value="Search" />
                </div>
              </form>   
            </div>        

          </div>

          <div className="flex mr-8">
            <a href="#" className="block text-md px-4 py-2 ml-2 mt-4 lg:mt-0">
              Sign In
            </a>

            <a href="#" className=" block text-md px-4  ml-2 py-2 mt-4 lg:mt-0">
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    );
  } else {
    return <Skeleton count={1} />;
  }
}
