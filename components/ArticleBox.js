import { API_URL } from "../config/index";
import Link from "next/link";

const ArticleBox = ({ post }) => {
  return (
    <>
      <div className="text-center shadow border-b-4 border-borderColor pb-5">
        <div className="w-full cursor-pointer">
          <Link href={`/single/${post.slug}`}>
            <img
              className="catImage rounded-t"
              src={`${API_URL}${post.featured_image[0].url}`}
            />
          </Link>
        </div>

        <div className="content">
          <span className="text-subTitle block mt-2">
            <Link href={`/category/${post.category.name}`}>
              <a>{post.category.name}</a>
            </Link>
          </span>
          <h2 className="text-3xl mb-3">
            <Link href={`/single/${post.slug}`}>
              <a className="border-b-2 border-white hover:border-borderColor">
                {post.title.length > 30
                  ? `${post.title.substring(0, 30)}...`
                  : post.title}
              </a>
            </Link>
          </h2>
          <p className="px-2">
            {post.excerpt.length > 150
              ? `${post.excerpt.substring(0, 150)}...`
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
