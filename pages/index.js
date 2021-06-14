import HomeCatagory from "../components/HomeCatagory";
import Layout from "../components/Layout";
import { API_URL } from "../config/index";
import axios from "axios";
import { NextSeo } from "next-seo";
export default function Home({ resCatagory, posts }) {
  const SEO = {
    title: "Page | Home",
    description: "MITCH CUMM Home page to show whole our website concept",
  };

  return (
    <Layout>
      <NextSeo {...SEO} />
      <div className="mb-10">
        {resCatagory.map((cat, n) => (
          <HomeCatagory
            category={cat}
            posts={posts[n]}
            key={`index-${cat.id}`}
          />
        ))}
      </div>
    </Layout>
  );
}

Home.getInitialProps = async () => {
  const reqCatagory = await fetch(`${API_URL}/categories`);
  const resCatagory = await reqCatagory.json();
  const posts = await Promise.all(
    resCatagory.map(async (cat) => {
      const main = await axios
        .get(`${API_URL}/posts?category=${cat.id}&_limit=6&_sort=id:DESC`)
        .then(({ data }) => {
          return data;
        });
      return main;
    })
  );

  return {
    resCatagory,
    posts,
  };
};
