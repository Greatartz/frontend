import Layout from "../../components/Layout";
import Head from "next/head";
import Header from "../../components/Header";
export default function Catagorys({ id, slug, needPages }) {
  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <header>
        <Header />
      </header>
      <main className="catagory">Ok</main>
    </>
  );
}

//render selected catagory and its post

export async function getStaticProps({ params }) {
  const { slug } = params;

  const reqCatgoryId = await fetch(
    `http://localhost:1337/catagories?name=${slug}`
  );
  const resCatagoryId = await reqCatgoryId.json();
  //get id of catagory
  const id = resCatagoryId[0].id;
  const reqCount = await fetch(`http://localhost:1337/posts?catagory=${id}`);
  const resCount = await reqCount.json();
  const needPages = Math.ceil(resCount.length / 6);
  return {
    props: { id, needPages, slug },
  };
}

// how many pages there are
export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/catagories");
  const datas = await res.json();
  const paths = datas.map((d) => ({
    params: { slug: d.name },
  }));
  return {
    paths,
    fallback: false, //404
  };
}
