import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import parse from "html-react-parser";
let mark = require("markdown-it");
import Link from "next/link";

const SinglePage = ({ post }) => {
  //render rich text dynamicly
  const myRender = (doc) => {
    let md = new mark();
    md.renderer.rules.image = function (tokens, idx, options, env, slf) {
      let token = tokens[idx];
      token.attrSet("src", `${API_URL}${token.attrGet("src")}`);
      token.attrPush(["className", "w-2/4 my-2"]);

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
          <h1 className="text-5xl capitalize">{post[0].title}</h1>
          <p className="singleDate text-subTitle mt-5">
            <span>{new Date(post[0].updated_at).toLocaleDateString()}</span> -
            <span>
              {post[0].author.firstname} {post[0].author.lastname}
            </span>
          </p>
        </section>

        <section className="singleContent">
          <div className="singleFeatureImage">
            <img src={`${API_URL}${post[0].featured_image.url}`} />
          </div>
          <div className="content">{parse(myRender(post[0].context))}</div>
        </section>
      </main>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const request_post = await fetch(`${API_URL}/posts?slug=${slug}`);
  const res_post = await request_post.json();
  return { props: { post: res_post } };
}

export default SinglePage;
