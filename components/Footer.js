import Link from "next/link";

export default function Footer({categories, load}) {
  
  return (
    <footer>
       <section className="bg-bgColor w-full py-5">
            <div className="container mx-auto grid md:grid-cols-4 grid-cols-2">
                  <div className="w-full text-left">
                      <h1 className="text-2xl text-title pt-5 border-b-2 border-borderColor inline-block py-2">About us</h1>
                      <p className="py-3 leading-loose">
                        We hope you are making progress on your project... 
                        Feel free to read the latest news about Strapi.
                        We are giving our best to improve the product based on your feedback
                      </p>
                  </div>
                  <div className="w-full text-center">
                      <h1 className="text-2xl text-title pt-5 border-b-2 border-borderColor inline-block py-2">Categories</h1>
                      <ul className="py-3">
                          {load ? 
                            categories.map((category)=>(
                              <li className="py-1">
                                  <Link href={`/category/${category.name}`} key={`${category.id}`}>
                                      <a className="hover:text-title hover:border-borderColor border-b">{category.name}</a>
                                  </Link>
                              </li>
                            ))
                          : <p>No categories exists.</p>}
                      </ul>
                  </div>
                  <div className="w-full text-center">
                      <h1 className="text-2xl text-title pt-5 border-b-2 border-borderColor inline-block py-2">Pages</h1>
                      <ul className="py-3">
                            <li className="py-1">
                                <Link href="/"><a className="hover:text-title hover:border-borderColor border-b">Home</a></Link>
                            </li>
                            <li className="py-1">
                                <Link href="/"><a className="hover:text-title hover:border-borderColor border-b">About US</a></Link>
                            </li>
                            <li className="py-1">
                                <Link href="/"><a className="hover:text-title hover:border-borderColor border-b">Contact Us</a></Link>
                            </li>
                            <li className="py-1">
                                <Link href="/"><a className="hover:text-title hover:border-borderColor border-b">Privacy Policy</a></Link>
                            </li>
                            <li className="py-1">
                                <Link href="/"><a className="hover:text-title hover:border-borderColor border-b">Sign Up</a></Link>
                            </li>
                            <li className="py-1">
                                <Link href="/"><a className="hover:text-title hover:border-borderColor border-b">Sing In</a></Link>
                            </li>
                      </ul>
                  </div>
                  <div className="w-full text-left">

                      <h1 className="text-2xl text-title pt-5 mb-5 border-b-2 border-borderColor inline-block py-2">Subscribe</h1>

                      <input type="email" name="email" 
                            className="w-full p-2 rounded focus:outline-none border border-subTitle mb-3" 
                            placeholder="Your email ..." 
                            autoComplete="off"/>

                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Submit
                      </button>
                  </div>
            </div>
       </section>
       <section className="w-full border-t border-borderColor flex justify-center bg-title">
            <p className="text-white py-5">
                © Company name |  Powered by Next.js, Strapi
            </p>
       </section>
    </footer>
  );
}
