import Skeleton from "react-loading-skeleton";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header({ categories, load }) {
  const [session, loading] = useSession();
  const router = useRouter();

  const [term, setTerm] = useState("");
  const handleSubmit = (e) => {
<<<<<<< HEAD
    e.preventDefault();
    router.push(`/search?term=${term}`);
    setTerm("");
  };

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

        <div className="menu w-full  flex-grow lg:flex lg:items-center text-lg lg:w-auto uppercase text-title py-3">
          <div className="text-md lg:flex-grow flex">
            {categories.map((data) => (
              <Link href={`/category/${data.name}`} key={`${data.id}`}>
                <a
                  category={data.id}
                  className={`anchorTag  ${
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

          <div className="flex mr-8">
            {!session && (
              <>
                <button
                  className="block
                   text-md px-4 py-2 ml-2
                    mt-4 lg:mt-0"
                  onClick={() => signIn("credentials")}
                >
                  Sign in
                </button>
              </>
            )}
            {session && (
              <>
                <button onClick={() => signOut()}>Sign out</button>
              </>
            )}
          </div>
        </div>
      </nav>
=======
      e.preventDefault()
      router.push(`/search?term=${term}`)
      setTerm('')
  }
	const [showMe, setShowMe] = useState(false);
	
	const handleToggle = () => {
		setShowMe(!showMe);
	}	

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
			
			<div className="container mx-auto flex flex-wrap items-center justify-between">
				
				<div className="flex md:hidden">
				  <button id="hamburger" onClick={ handleToggle }>
					<img className="toggle" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" />
				  </button>
				</div>
				
				<div 
					className="hidden md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 uppercase text-title py-3 text-lg"
					style={{ display: showMe ? "block" : "hidden" }}
					> 
				
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
				  
					<div className="searchComponent">
					  <form
						onSubmit={handleSubmit}
						className="search-form flex bg-bgColor"
					  >
						<button type="submit" className="search-form-link focus:outline-none">
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
							onChange={ (e) => setTerm(e.target.value) }
							title="Search for:"
							autoComplete="off"
						  />
						</div>
					  </form>
					</div>
				  
				</div>
				
				{!session && (
					<a
					  className="mr-2"
					  onClick={() => router.push("/login")}
					>
					  Sign in
					</a>
				)}
				{session && (
				  <a className="mr-2">
					Signed in as {session.user.username} <br />
					<button onClick={() => signOut()}>Sign out</button>
				  </a>
				)}	
				
			</div>
		</nav> 
>>>>>>> cc0469b697a65060acb67630493b307347d1941c
    );
  } else {
    return <Skeleton count={1} />;
  }
}
