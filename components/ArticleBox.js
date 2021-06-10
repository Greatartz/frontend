import { API_URL } from "../config/index";
import Link from "next/link";

const ArticleBox = ({ post }) => {
  return (
    <>
      <div className="text-center shadow border-b-4 border-borderColor pb-5 mx-2 md:min-h-custom">
        <div className="w-full cursor-pointer">
          <Link href={`/single/${post.slug}`}>
            <img
              className="catImage rounded-t max-h-small"
              src={`${post.featured_image.formats.medium.url}`}
            />
          </Link>
        </div>

        <div className="content max-h-small">
          <span className="text-subTitle block mt-2">
            <Link href={`/category/${post.category.name}`}>
              <a>{post.category.name}</a>
            </Link>
          </span>
          <h2 className="text-3xl mb-3">
            <Link href={`/single/${post.slug}`}>
              <a className="border-b-2 border-white hover:border-borderColor">
                {post.title.length > 20
                  ? `${post.title.substring(0, 20)}...`
                  : post.title}
              </a>
            </Link>
          </h2>
          <p className="px-2">
            {post.excerpt.length > 100
              ? `${post.excerpt.substring(0, 100)}...`
              : post.excerpt}
          </p>
          <span className="inline-block mt-3">
            <Link href={`/single/${post.slug}`}>
              <a className="text-borderColor font-bold border-b-2 border-white hover:border-borderColor">
                More
              </a>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default ArticleBox;
