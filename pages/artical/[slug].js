import Layout from "../../components/Layout";
import { API_URL } from "../../config";

export default function Single({ post, slug }) {
  return (
    <div>
      <Layout title={slug}>
        <div></div>
      </Layout>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const reqPost = await fetch(`${API_URL}/posts?slug=${slug}`);
  const post = await reqPost.json();
  console.log(post[0].body);
  return {
    props: { post, slug },
  };
}

export async function getStaticPaths() {
  const req = await fetch(`${API_URL}/posts`);
  const res = await req.json();
  const paths = res.map((d) => ({
    params: { slug: d.slug },
  }));
  return { paths, fallback: false };
}
