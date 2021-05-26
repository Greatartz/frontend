import Link from "next/link";
import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import RichText from "../../components/RichText";
import ArticleBox from "../../components/ArticleBox";
import TimeAgo from "react-timeago";

const SinglePage = ({ post, rel_posts }) => {
  return (
    <Layout title={`Single | ${post[0].title}`}>
      <main className="w-11/12 mx-auto py-10">
	  
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

        <section className="singleContent flex flex-wrap">
		
          <div className="w-full sm:w-full md:w-full lg:w-10/12">
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
          </div> {/* / col-1 */}
		  
		  <div className="w-full sm:w-full md:w-full lg:w-2/12">
				sidebar
		  </div> {/* / col-2 */}
		  
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
