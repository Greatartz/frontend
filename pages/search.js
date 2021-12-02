import qs from "qs";
import Layout from "../components/Layout";
import ArticleBox from "../components/ArticleBox";
import { API_URL } from "../config/index";
import { useRouter } from "next/router";
import Link from "next/link";

const SearchPage = ({ posts }) => {
  const router = useRouter();
  return (
    <Layout title={`Search | ${router.query.term}`}>
      <section className="w-11/12 mx-auto mt-5">
        <Link href="/">
          <a className="text-blue-500 border-b border-blue-500">Go Back</a>
        </Link>
        <h1>Search Results for {router.query.term}:</h1>
        <h1 className="my-5 text-red-500">
          {posts.length === 0 && <h3>Sorry No Items match</h3>}{" "}
        </h1>
      </section>

      <section className="row">
        {posts.map((post, n) => (
          <ArticleBox post={post} key={`search-${n}`} />
        ))}
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [{ title_contains: term }, { excerpt_contains: term }],
    },
  });

  const res = await fetch(`${API_URL}/posts?${query}`);
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}

export default SearchPage;
