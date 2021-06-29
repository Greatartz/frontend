import { API_URL } from "../config/index";
import RichText from "../components/RichText";
import Layout from "../components/Layout";
import { NextSeo } from "next-seo";

const Privacy = ({ data }) => {
  const SEO = {
    title: "Page | Privacy",
    description: "MITCH CUMM Policy & Privacy",
  };

  return (
    <Layout>
      <NextSeo {...SEO} />

      <div className="w-11/12 mx-auto my-10 singlePageContent">
        <h1 className="text-center"> {data[0].title} </h1>
        <style>{`
          .contextApp  p {
            font-size: 20px;
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: start;
          }
        `}</style>
        <div className="mt-5 w-11/12 text-xl contextApp">
          <RichText doc={data[0].content} />
        </div>
      </div>
    </Layout>
  );
};

Privacy.getInitialProps = async (ctx) => {
  const res = await fetch(`${API_URL}/privacies`);
  const data = await res.json();

  return { data };
};

export default Privacy;
