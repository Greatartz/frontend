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
				
				<section className="py-20 bg-blue-100">
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

				<section className="relative py-20">
				  <div
					className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
					style={{ transform: "translateZ(0)" }}
				  >
					<svg
					  className="absolute bottom-0 overflow-hidden"
					  xmlns="http://www.w3.org/2000/svg"
					  preserveAspectRatio="none"
					  version="1.1"
					  viewBox="0 0 2560 100"
					  x="0"
					  y="0"
					>
					  <polygon
						className="text-white fill-current"
						points="2560 0 2560 100 0 100"
					  ></polygon>
					</svg>
				  </div>

				  <div className="container mx-auto px-4">
					<div className="items-center flex flex-wrap">
					  <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
						<img
						  alt="..."
						  className="max-w-full rounded-lg shadow-lg"
						  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
						/>
					  </div>
					  <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
						<div className="md:pr-12">
						  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blue-100">
							<FastForwardIcon />
						  </div>
						  <h3 className="text-3xl font-semibold">A growing company</h3>
						  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
							The extension comes with three pre-built pages to help you
							get started faster. You can change the text and images and
							you're good to go.
						  </p>
						  <ul className="list-none mt-6">
							<li className="py-2">
							  <div className="flex items-center">
								<div>
								  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
									<i className="fas fa-fingerprint"></i>
								  </span>
								</div>
								<div>
								  <h4 className="text-blueGray-500">
									Carefully crafted components
								  </h4>
								</div>
							  </div>
							</li>
							<li className="py-2">
							  <div className="flex items-center">
								<div>
								  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
									<i className="fab fa-html5"></i>
								  </span>
								</div>
								<div>
								  <h4 className="text-blueGray-500">
									Amazing page examples
								  </h4>
								</div>
							  </div>
							</li>
							<li className="py-2">
							  <div className="flex items-center">
								<div>
								  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
									<i className="far fa-paper-plane"></i>
								  </span>
								</div>
								<div>
								  <h4 className="text-blueGray-500">
									Dynamic components
								  </h4>
								</div>
							  </div>
							</li>
						  </ul>
						</div>
					  </div>
					</div>
				  </div>
				</section>

				<section className="pt-20 pb-20 bg-blue-100">
				  <div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-center text-center mb-24">
					  <div className="w-full lg:w-6/12 px-4">
						<h2 className="text-4xl font-semibold">Here are our heroes</h2>
						<p className="text-lg leading-relaxed m-4 text-blueGray-500">
						  According to the National Oceanic and Atmospheric
						  Administration, Ted, Scambos, NSIDClead scentist, puts the
						  potentially record maximum.
						</p>
					  </div>
					</div>
					<div className="flex flex-wrap">
					  <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
						<div className="px-6">
						  <img
							alt="..."
							src="/team-1-800x800.jpg"
							className="shadow-lg rounded-full mx-auto max-w-120-px"
						  />
						  <div className="pt-6 text-center">
							<h5 className="text-xl font-bold">Ryan Tompson</h5>
							<p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
							  Web Developer
							</p>
						  </div>
						</div>
					  </div>
					  
					  <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
						<div className="px-6">
						  <img
							alt="..."
							src="/team-2-800x800.jpg"
							className="shadow-lg rounded-full mx-auto max-w-120-px"
						  />
						  <div className="pt-6 text-center">
							<h5 className="text-xl font-bold">Romina Hadid</h5>
							<p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
							  Marketing Specialist
							</p>
						  </div>
						</div>
					  </div>
					  <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
						<div className="px-6">
						  <img
							alt="..."
							src="/team-3-800x800.jpg"
							className="shadow-lg rounded-full mx-auto max-w-120-px"
						  />
						  <div className="pt-6 text-center">
							<h5 className="text-xl font-bold">Alexa Smith</h5>
							<p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
							  UI/UX Designer
							</p>
						  </div>
						</div>
					  </div>
					  
					  <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
						<div className="px-6">
						  <img
							alt="..."
							src="/team-4-470x470.png"
							className="shadow-lg rounded-full mx-auto max-w-120-px"
						  />
						  <div className="pt-6 text-center">
							<h5 className="text-xl font-bold">Jenna Kardi</h5>
							<p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
							  Founder and CEO
							</p>
						  </div>
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