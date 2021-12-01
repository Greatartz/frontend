import { API_URL } from "../config/index";
import RichText from "../components/RichText";
import Layout from "../components/Layout";
import { NextSeo } from "next-seo";

const Privacy = ({ data }) => {
  const SEO = {
    title: "MITCH CUMM | Services",
    description: "MITCH CUMM Terms & Services",
  };

  return (
    <Layout>
      <NextSeo {...SEO} />

      <div className="w-11/12 mx-auto my-10 singlePageContent">
        <h1 className="text-center"> {data[0].title} </h1>
        <div className="mt-5 w-11/12 text-xl my-2 contentApp">
          <RichText doc={data[0]?.content} />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/terms-and-services`);
  const data = await res.json();
  return { props: { data } };
}

export default Privacy;
