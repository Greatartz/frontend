import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import parse from "html-react-parser";
import mark from "markdown-it";
import ArticleBox from "../../components/ArticleBox";
import TimeAgo from "react-timeago";
import Link from "next/link";

const SinglePage = ({ post, rel_posts }) => {
  const myRender = (doc) => {
    let md = new mark();
    md.renderer.rules.image = function (tokens, idx, options, env, slf) {
      let token = tokens[idx];
      token.attrSet("src", `${API_URL}${token.attrGet("src")}`);
      token.attrPush(["id", "content_image"]);

      token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(
        token.children,
        options,
        env
      );

      return slf.renderToken(tokens, idx, options);
    };
    let result = md.render(doc);
    return result;
  };
  return (
    <Layout title={`Single | ${post[0].title}`}>
      <main className="container mx-auto py-10">
        <section className="singleHeader">
          <h3 className="text-xl border-b-2 border-borderColor inline-block my-5 py-1">
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

        <section className="singleContent grid grid-cols-4 gap-2">
          <div className="col-span-3">
            <div className="singleFeatureImage my-10">
              <img src={`${API_URL}${post[0].featured_image.url}`} />
            </div>
            <div className="content">
              <section className="tags mb-5">
                {post[0].tags.map((tag) => (
                  <Link href={`/tag/${tag.id}`}>
                    <a className="bg-borderColor p-2 rounded text-white mr-2">
                      {tag.title}
                    </a>
                  </Link>
                ))}
              </section>

              <section id="content">{parse(myRender(post[0].content))}</section>

              <hr className="my-5" />
              <section className="location flex gap-5">
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
          {/* / col */}
        </section>

        <hr className="my-5" />
        <h1>Related Posts:</h1>
        <section className="related_posts mb-10 mt-5 container mx-auto grid grid-cols-3 gap-10">
          {rel_posts
            .filter((rel_posts) => rel_posts.id != post[0].id)
            .map((post) => (
              <ArticleBox post={post} />
            ))}
        </section>
      </main>
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

  return {
    props: {
      post: res_post,
      rel_posts: res_related_posts,
    },
  };
}

export default SinglePage;
