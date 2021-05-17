import Header from "../../../../components/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function CatagoryPage({ posts, slug, page }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>sad</title>
        <meta content="dasd" />
      </Head>
      <header>
        <Header />
      </header>
      <main className="catagory">
        {posts.map((i) => (
          <p key={i.id}>{i.title}</p>
        ))}

        <Link href={`${slug}/page/2`}>Next</Link>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug , id } = params;
  const 
  const reqCatgoryId = await fetch(
    `http://localhost:1337/catagories?name=${slug}`
  );
  const resCatagoryId = await reqCatgoryId.json();
  //get id of catagory
  const catagoryId = resCatagoryId[0].id;
  const catagoryDesc = resCatagoryId[0].description;
  const reqPosts = await fetch(
    `http://localhost:1337/posts?catagory=${catagoryId}&_limit=3`
  );
  const posts = await reqPosts.json();

  return {
    props: {
      posts: posts,
      slug: slug,
      page: +page,
    },
  };
}
