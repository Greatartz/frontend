import Link from "next/link";

const ArticleBox = ({ post, isSideBar = false }) => {
  if (isSideBar) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow border-b-4 border-borderColor">
        <img
          className="w-full catImage cursor-pointer"
          src={`${
            post?.featured_image?.formats?.small?.url ||
            post?.featured_image?.url
          }`}
          alt="Sunset in the mountains"
        />
        <div className="text-center">
          <Link href={`/category/${encodeURIComponent(post.category.name)}`}>
            <a className="text-subTitle block mt-2">{post.category.name}</a>
          </Link>
        </div>
        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl mb-2">
            <Link href={`/single/${encodeURIComponent(post.slug)}`}>
              <a className="border-b-2 border-white hover:border-borderColor">
                {post?.title?.substr(0, 70) + "..."}
              </a>
            </Link>
          </div>
          <p className="text-gray-700 text-base">
            {post.excerpt.substr(0, 100) + "..."}
          </p>
          <p className="text-center">
            <Link href={`/single/${encodeURIComponent(post?.slug)}`}>
              <a className="text-borderColor text-center font-bold border-b-2 border-white hover:border-borderColor">
                More
              </a>
            </Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="text-center shadow border-b-4 border-borderColor pb-5 mx-2 md:min-h-custom">
        <div className="w-full cursor-pointer">
          <Link href={`/single/${encodeURIComponent(post.slug)}`}>
            <img
              className="catImage rounded-t max-h-smImage"
              src={`${
                post?.featured_image?.formats?.small?.url ||
                post?.featured_image?.url
              }`}
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
