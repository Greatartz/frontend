import HomeCatagory from "../components/HomeCatagory";
import Layout from "../components/Layout";
import { API_URL } from "../config/index";
import { NextSeo } from 'next-seo';

export default function Home({ resCatagory }) {
	
	const SEO = {
		title: 'Page | Home',
		description: 'MITCH CUMM Home page to show whole our website concept'
	}	
	
  return (
    <Layout>
	  <NextSeo {...SEO} />	
      <div className="mb-10">
			{resCatagory.map((i) => (
				<HomeCatagory category={i} key={`h-${i.id}`} />
			))}
	  </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const reqCatagory = await fetch(`${API_URL}/categories`);
  const resCatagory = await reqCatagory.json();
  //check subscribtion
  return {
    props: {
      resCatagory,
    },
  };
}
