import Link from 'next/link'
export default function Footer() {
  return (
    <footer>
       <section className="bg-bgColor w-full">
            <ul className="container mx-auto flex justify-center py-5 text-lg uppercase">
                <li className="px-4 cursor-pointer">
                  <Link href="/">Home</Link>
                </li>
                <li className="px-4">Contact us</li>
                <li className="px-4">About us</li>
                <li className="px-4">Privacy Policy</li>
                <li className="px-4">Sign in</li>
                <li className="px-4">Sign Up</li>
            </ul>
       </section>
       <section className="w-full border-t border-borderColor flex justify-center bg-title">
            <p className="text-white py-5">
                © Company name |  Powered by Next.js, Strapi
            </p>
       </section>
    </footer>
  );
}
