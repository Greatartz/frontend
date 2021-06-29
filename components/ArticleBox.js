import Link from "next/link";

const ArticleBox = ({ post }) => {
  return (
    <>
      <div className="text-center shadow border-b-4 border-borderColor pb-5 mx-2 md:min-h-custom">
        <div className="w-full cursor-pointer">
          <Link href={`/single/${encodeURIComponent(post.slug)}`}>
            <img
              className="catImage rounded-t max-h-smImage"
              src={`${post.featured_image.formats.small.url}`}
            />
          </Link>
        </div>

        <div className="content sm:min-h-medium md:min-h-small md:max-h-revise">
          <span className="text-subTitle block mt-2">
            <Link href={`/category/${encodeURIComponent(post.category.name)}`}>
              <a>{post.category.name}</a>
            </Link>
          </span>
          <h2 className="text-xl font-semibold sm:font-medium sm:text-2xl md:text-3xl mb-3">
            <Link href={`/single/${encodeURIComponent(post.slug)}`}>
              <a className="border-b-2 border-white hover:border-borderColor">
                {post.title.length > 30
                  ? `${post.title.substring(0, 40)}...`
                  : post.title}
              </a>
            </Link>
          </h2>
          <p className="px-2">
            {post.excerpt.length > 100
              ? `${post.excerpt.substring(0, 100)}...`
              : post.excerpt}
          </p>
          <span className="inline-block mt-1 md:mt-3">
            <Link href={`/single/${encodeURIComponent(post.slug)}`}>
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
