import Layout from '../components/Layout'
import Link from 'next/link'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import GroupIcon from '@material-ui/icons/Group';
import FastForwardIcon from '@material-ui/icons/FastForward';
import { NextSeo } from 'next-seo';
import { API_URL } from "../config/index";

const AboutPage = ({data}) => {
	
	const SEO = {
		title: 'Page | About',
		description: 'MITCH CUMM About page, to Tell about MITCH CUMM'
	}
	
	return (
		<Layout>
		
			<NextSeo {...SEO} />	
		
			<main>
				
				<section className="py-20">
				  <div className="w-11/12 mx-auto px-4">
				  
					<div className="flex flex-wrap items-center">
					  <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
						<div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
						  <GroupIcon />
						</div>
						<h3 className="text-3xl mb-2 font-semibold leading-normal">
							{data[0].aboutTItle}
						</h3>
						<p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
							{data[0].aboutDescription}
						</p>
					  </div>

					  <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-5 sm:mt-5 md:mt-0 lg:mt-5">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
						  <img
							alt="..."
							src={data[0].banner.url}
							className="w-full align-middle rounded-t-lg"
						  />
						  <blockquote className="relative p-8 mb-4">
							<h4 className="text-xl font-bold text-title">
								{data[0].servicesTitle}
							</h4>
							<p className="text-md font-light mt-2 text-title">
								{data[0].servicesDescription}
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
export async function getStaticProps() {
	
  const res = await fetch(`${API_URL}/abouts`)
  const data = await res.json()

  return {
    props: { data }, // will be passed to the page component as props
  }
}

export default AboutPage;