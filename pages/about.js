import Layout from '../components/Layout'
import Link from 'next/link'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import GroupIcon from '@material-ui/icons/Group';
import FastForwardIcon from '@material-ui/icons/FastForward';

const AboutPage = () => {
	
	return (
		<Layout title="Page | About">
			<main>
				
				<section className="py-20">
				  <div className="container mx-auto px-4">
				  
					<div className="flex flex-wrap items-center">
					  <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
						<div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
						  <GroupIcon />
						</div>
						<h3 className="text-3xl mb-2 font-semibold leading-normal">
						  Working with us is a pleasure
						</h3>
						<p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
						  Don't let your uses guess by attaching tooltips and popoves to
						  any element. Just make sure you enable them first via
						  JavaScript.
						</p>
						<p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
						  The kit comes with three pre-built pages to help you get
						  started faster. You can change the text and images and you're
						  good to go. Just make sure you enable them first via
						  JavaScript.
						</p>
						<Link href="/" className="font-bold text-blueGray-700 mt-8">
						  Check Notus React!
						</Link>
					  </div>

					  <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
						  <img
							alt="..."
							src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
							className="w-full align-middle rounded-t-lg"
						  />
						  <blockquote className="relative p-8 mb-4">
							<h4 className="text-xl font-bold text-title">
							  Top Notch Services
							</h4>
							<p className="text-md font-light mt-2 text-title">
							  The Arctic Ocean freezes every winter and much of the
							  sea-ice then thaws every summer, and that process will
							  continue whatever happens.
							</p>
						  </blockquote>
						</div>
					  </div>
					</div>
				  </div>
				</section>
				
			  </main>
		</Layout>
	)
}

export default AboutPage;