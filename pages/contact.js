import Layout from '../components/Layout';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "../config/index";
import { NextSeo } from 'next-seo';

const ContactPage = ({data}) => {
	
	const SEO = {
		title: 'Page | Contact',
		description: 'MITCH CUMM Contact page to be in Touch with visitors'
	}

	const [name, setName] 		= useState("");
  	const [email, setEmail]		= useState("");
  	const [subject, setSubject] = useState("");
  	const [message, setMessage] = useState("");
  	const router = useRouter();

  	const handleSubmit = async (e) => {
  		e.preventDefault();
	    if (name === "" || email === "" || subject === "") {
	      Swal.fire(
	        "Invalid",
	        "Please be sure to fill required fields",
	        "error"
	      );
	    } else {

	      const contactMessages = {
	        name: 	 name,
	        email: 	 email,
	        subject: subject,
	        message: message
	      };

	      const messages = await fetch(`${API_URL}/contacts`, {
	        method: "POST",
	        headers: {
	          Accept: "application/json",
	          "Content-Type": "application/json",
	        },
	        body: JSON.stringify(contactMessages),
	      });

	      const res = await messages.json();
	      if (res) {

	      	Swal.fire("Good job!", "Your Message Has been set :) ", "success");
	      	setName("")
	      	setEmail("")
	      	setSubject("")
	      	setMessage("")
	      } else {
	        Swal.fire("Invalid", res.message[0].messages[0].message, "error");
	      }
	    }
  	};

	return(
		<Layout>
			
			<NextSeo {...SEO} />	
			
			<section className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-5 gap-5">
				<div className="bg-bgColor w-full p-8 rounded-md">
					
					<div>
						<h1 className="capitalize mb-3">contact us</h1>
					</div>

					<form method="POST" onSubmit={handleSubmit}>
						<div>
							<input type="text" 
								   className="inputField w-full my-2 py-3 px-2 rounded-md focus:outline-none"
								   placeholder="Your Name *"
								   value={name}
	                			   onChange={(e) => setName(e.target.value)}
								   />
						</div>

						<div>
							<input type="email" 
								   className="inputField w-full my-2 py-3 px-2 rounded-md focus:outline-none" 
								   placeholder="Your Email *"
								   value={email}
	                			   onChange={(e) => setEmail(e.target.value)}
								   />
						</div>

						<div>
							<input type="text" 
								   className="inputField w-full my-2 py-3 px-2 rounded-md focus:outline-none"
								   placeholder="Subject *"
								   value={subject}
	                			   onChange={(e) => setSubject(e.target.value)}
								   />
						</div>

						<div>
							<textarea className="inputField w-full pt-3 my-2 px-2 h-36 rounded-md focus:outline-none"
									  placeholder="Your Message"
									  value={message} 
									  onChange={(e) => setMessage(e.target.value)}></textarea>
						</div>
						
						<div className="text-right">
							<button 
									type="submit"
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
						</div>
					</form>

				</div> 
				
				<div>
					
					<div>
						<h1 className="capitalize mt-8 text-center sm:text-center md:text-left lg:text-left"> contact details </h1>
					</div>
					
					<div className="text-center sm:text-center md:text-left lg:text-left">
						<h3 className="capitalize mt-8 mb-3">Email & Phone</h3>
						<p>{data[0].phone}</p>
						<p>{data[0].email}</p>
					</div>
						
					<div className="text-center sm:text-center md:text-left lg:text-left">
						<h3 className="capitalize mt-8 mb-3">follow us</h3>
						<div className="lg:mb-0 mb-6">

							<button
								className="bg-white facebook shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
								type="button"
							>
								<a href={data[0].facebook} target="_blank">
									<FacebookIcon />
								</a>
							</button>

							<button
								className="bg-white facebook shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
								type="button"
							>
								<a href={data[0].twitter} target="_blank">
									<TwitterIcon />
								</a>
							</button>

							<button
								className="bg-white facebook shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
								type="button"
							>
							<a href={data[0].linkedin} target="_blank">
								<LinkedInIcon />
							</a>
							</button>

							<button
								className="bg-white facebook shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
								type="button"
							>
								<a href={data[0].youtube} target="_blank">
									<YouTubeIcon />
								</a>
							</button>
						</div>
					</div>
					
					<div className="text-center sm:text-center md:text-left lg:text-left">
						<h3 className="capitalize mt-8 mb-3">Adress</h3>
						<p>
							{data[0].address}
						</p>
					</div>

				</div> 
				
			</section>
		</Layout>
	);
}

export async function getStaticProps() {
	
  const res = await fetch(`${API_URL}/abouts`)
  const data = await res.json()

  return {
    props: { data }, // will be passed to the page component as props
  }
}

 export default ContactPage;