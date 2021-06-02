import Link from "next/link";
import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import RichText from "../../components/RichText";
import ArticleBox from "../../components/ArticleBox";
import TimeAgo from "react-timeago";
import { NextSeo } from "next-seo";

const SinglePage = ({ post, rel_posts, rel_user }) => {
  const SEO = {
    title: `Single | ${post[0].title}`,
    description: `Description | ${post[0].excerpt}`,
  };

  return (
    <Layout>
      <NextSeo {...SEO} />
      <main className="w-11/12 mx-auto py-10 singlePageContent">
        <section className="singleHeader">
          <h3 className="text-xl border-b-2 border-borderColor inline-block my-5 py-1 capitalize">
            <Link href={`/category/${post[0].category.name}`}>
              {post[0].category.name}
            </Link>
          </h3>
          <h1 className="text-5xl leading-snug">
            <span className="border-b-2 border-white hover:border-borderColor">
              {post[0].title}
            </span>
          </h1>
          <p className="singleDate text-subTitle mt-5 text-xl">
            <span>{new Date(post[0].updated_at).toLocaleDateString()}</span> -{" "}
            <span>
              <Link href={`/author/${post[0].author.id}`}>
                <a className="cursor-pointer border-b-2 border-white hover:border-borderColor">
                  {post[0].author.firstname} {post[0].author.lastname}
                </a>
              </Link>
            </span>
          </p>
        </section>

        <section className="singleContent flex flex-wrap">
          <div className="w-full sm:w-full md:w-full lg:w-9/12">
            <div className="singleFeatureImage my-10">
              <img src={`${post[0].featured_image.formats.large.url}`} />
            </div>
            <div className="content">
              <section className="tags mb-5">
                {post[0].tags.map((tag) => (
                  <Link href={`/tag/${tag.id}`} key={`tag-link-${tag.id}`}>
                    <span className="bg-borderColor p-2 rounded text-white mr-2">
                      {tag.title}
                    </span>
                  </Link>
                ))}
              </section>

              <section id="content">
                <RichText doc={post[0].context} />
              </section>

              <hr className="my-5" />
              <section className="location grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <p className="text-title">
                  Location:{" "}
                  <span className="font-bold">{post[0].location}</span>
                </p>
                <p className="text-title">
                  Author:{" "}
                  <span className="font-bold border-b-2 border-white hover:border-borderColor">
                    <Link href={`/author/${post[0].author.id}`}>
                      <a className="cursor-pointer">
                        {post[0].author.firstname} {post[0].author.lastname}
                      </a>
                    </Link>
                  </span>
                </p>
                <p className="text-title">
                  Posted:{" "}
                  <span className="font-bold">
                    <TimeAgo
                      date={new Date(post[0].updated_at).toUTCString()}
                    />
                  </span>
                </p>
              </section>
            </div>
          </div>{" "}
          {/* / col-1 */}
          <div className="w-full sm:w-full md:w-full lg:w-3/12">
            <h2 className="border-2 border-borderColor p-1 rounded text-center w-11/12 mx-auto my-5">
              <Link href={`/author/${rel_user[0].author.id}`}>
                <a className="cursor-pointer">
                  {rel_user[0].author.firstname} {rel_user[0].author.lastname}
                </a>
              </Link>
            </h2>

            <div className="grid grid-cols-1 gap-5 w-11/12 mx-auto">
              {rel_user.map((data, n) => (
                <ArticleBox post={data} key={`single-artical-${n}`} />
              ))}
            </div>
          </div>{" "}
          {/* / col-2 */}
        </section>
      </main>

      <main className="w-11/12 mx-auto">
        <hr className="my-5" />
        <h1>Related Posts:</h1>
        <section className="related_posts row mt-5">
          {rel_posts
            .filter((rel_posts) => rel_posts.id != post[0].id)
            .map((post) => (
              <ArticleBox post={post} />
            ))}
        </section>
      </main>
      {/*model */}
      {loadAlert ? <AlertSubscribe show={loadAlert} /> : ""}
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;

  const request_post = await fetch(`${API_URL}/posts?slug=${slug}`);
  const res_post = await request_post.json();

  const cat = res_post[0].category.id;
  const req_related_posts = await fetch(
    `${API_URL}/posts?category=${cat}&_limit=3`
  );
  const res_related_posts = await req_related_posts.json();

  const user = res_post[0].author.id;
  const req_user_posts = await fetch(
    `${API_URL}/posts?author=${user}&_limit=2`
  );
  const res_user_posts = await req_user_posts.json();

  return {
    props: {
      post: res_post,
      rel_posts: res_related_posts,
      rel_user: res_user_posts,
    },
  };
}

export default SinglePage;
