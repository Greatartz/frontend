import { API_URL } from "../config/index";
import RichText from "../components/RichText";
import Layout from "../components/Layout";
import { NextSeo } from 'next-seo';

export default function Privacy({data}) {
	
	const SEO = {
		title: 'Page | Privacy',
		description: 'MITCH CUMM Policy & Privacy'
	}	
	
  return (
    <Layout>
			
		<NextSeo {...SEO} />	
		
      <div className="w-11/12 mx-auto my-10 singlePageContent">
			<h1> {data[0].title} </h1>
			<div className="mt-5">
				 <RichText doc={data[0].content} />
			</div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
	
  const res = await fetch(`${API_URL}/privacies`)
  const data = await res.json()
	
   console.log(data)		
	
  return {
    props: { data }, // will be passed to the page component as props
  }
}
