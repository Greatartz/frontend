import Layout from '../components/Layout';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';

const ContactPage = () => {
	return(
		<Layout title="Page | Contact">
			<section className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-5 gap-5">
				<div className="bg-bgColor w-full p-8 rounded-md">
					
					<div>
						<h1 className="capitalize mb-3">contact us</h1>
					</div>

					<div>
						<input type="name" className="inputField w-full my-2 py-3 px-2 rounded-md focus:outline-none" placeholder="Your Name" />
					</div>

					<div>
						<input type="name" className="inputField w-full my-2 py-3 px-2 rounded-md focus:outline-none" placeholder="Your Email" />
					</div>

					<div>
						<input type="name" className="inputField w-full my-2 py-3 px-2 rounded-md focus:outline-none" placeholder="Subject" />
					</div>

					<div>
						<textarea className="inputField w-full my-2 px-2 h-36 rounded-md focus:outline-none" placeholder="Your Message"></textarea>
					</div>
					
					<div className="text-right">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
					</div>

				</div> 
				
				<div>
					
					<div>
						<h1 className="capitalize mt-8 mb-3"> contact details </h1>
					</div>
					
					<div className="flex mb-3">
						<p className="capitalize mr-10 text-title text-xl">phone number: </p>
						<p className=""> +93 780088163 </p>
					</div>

					<div className="flex mb-3">
						<p className="capitalize mr-12 text-title text-xl">Email Address: </p>
						<p className=""> hassanim430@gmail.com </p>
					</div>
						
					<div className="flex mb-3">
						<p className="capitalize mr-20 text-title text-xl">follow us: </p>
						<p className="flex gap-2 ml-1">
							<a href="/" className="facebook"><FacebookIcon /></a>
							<a href="/" className="twitter"><TwitterIcon  /></a>
							<a href="/" className="linkedin"><LinkedInIcon /></a>
							<a href="/" className="youtube"><YouTubeIcon /></a>
						</p>
					</div>

					<div className="mb-3">
						<p className="capitalize mb-2 text-title text-xl">contact info: </p>
						<p className="leading-relaxed">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
						</p>
					</div>	
					
				</div> 
				
			</section>
		</Layout>
	);
}
 export default ContactPage;