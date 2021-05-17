import HomeCatagory from "../components/HomeCatagory";
import Layout from "../components/Layout";
import { API_URL } from "../config/index";
import Link from "next/link";

export default function Home({ resCatagory }) {
  return (
    <Layout title="Home">
      {resCatagory.map((i) => (
        <>
          <div key={`home-${i.id}`} className="w-full ml-2 py-2">
            <Link href="/category/name">
              <span className="font-bold">{i.name}</span>
            </Link>
          </div>
          <HomeCatagory catId={i.id} />
        </>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const reqCatagory = await fetch(`${API_URL}/categories`);
  const resCatagory = await reqCatagory.json();

  return {
    props: {
      resCatagory,
    },
  };
}
