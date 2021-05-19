import HomeCatagory from "../components/HomeCatagory";
import Layout from "../components/Layout";
import { API_URL } from "../config/index";

export default function Home({ resCatagory }) {
  return (
    <Layout title="Home">
      {resCatagory.map((i) => (
        <HomeCatagory catId={i.id} catName={i.name} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const reqCatagory = await fetch(`${API_URL}/categories`);
  const resCatagory = await reqCatagory.json();
  return {
    props: {
      resCatagory,
    },
  };
}
