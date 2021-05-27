import HomeCatagory from "../components/HomeCatagory";
import Layout from "../components/Layout";
import { API_URL } from "../config/index";

export default function Home({ resCatagory }) {
  return (
    <Layout title="Home">
      {resCatagory.map((i) => (
        <HomeCatagory category={i} key={`h-${i.id}`} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const reqCatagory = await fetch(`${API_URL}/categories`);
  const resCatagory = await reqCatagory.json();
  console.log(resCatagory);
  return {
    props: {
      resCatagory,
    },
  };
}
