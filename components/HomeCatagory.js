import ArticleBox from "../components/ArticleBox";
import Slider from "react-slick";
import Link from "next/link";

export default function HomeCatagory({ category, posts }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <main>
        <h1 className="w-11/12 text-3xl mt-10 mb-5 mx-auto pl-2">
          <Link href={`/category/${encodeURIComponent(category.name)}`}>
            <a className="border-b-2 border-borderColor inline-block pb-2 capitalize">
              {category.name}
            </a>
          </Link>

          <p className="block text-lg mt-2">{category.description}</p>
        </h1>

        <div className="w-11/12 mx-auto">
          <Slider {...settings}>
            {posts.map((part) => (
              <ArticleBox post={part} key={part.id} />
            ))}
          </Slider>
        </div>
      </main>
    </>
  );
}
