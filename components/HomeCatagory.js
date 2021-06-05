import { useState } from "react";
import { API_URL } from "../config/index";
import Skeleton from "react-loading-skeleton";
import Spinner from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useQuery } from "react-query";
import ArticleBox from "../components/ArticleBox";
import Link from "next/link";
import Slider from "react-slick";

export default function HomeCatagory({ category }) {
	
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
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
	
  const { isLoading, data, isFetched } = useQuery(
    `homeCat-${category.id}`,
    () =>
      axios.get(
        `${API_URL}/posts?category=${category.id}&_limit=6&_sort=id:DESC`
      )
  );
  if (isLoading) {
    return " ";
  }

  if (isFetched) {
	   
    return (
      <>
        {data.data.length > 0 ? (
          <main>
            <h1 className="w-11/12 mx-auto text-3xl mt-10 mb-5">
              <Link href={`/category/${category.name}`}>
                <a className="border-b-2 border-borderColor inline-block pb-2 capitalize">
                  {category.name}
                </a>
              </Link>

              <p className="block text-lg mt-2">{category.description}</p>
            </h1>
			
            
			<div className="w-11/12 mx-auto">
				<Slider {...settings}>
					{data.data.map((part) => (
						<ArticleBox post={part} key={part.id} />
					  ))}
				</Slider>	
			</div>
			
			
          </main>
        ) : (
          " "
        )}
      </>
    );
  }
}
