import { useState } from "react";
import { API_URL } from "../config/index";
import Skeleton from "react-loading-skeleton";
import Spinner from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useQuery } from "react-query";
import ArticleBox from "../components/ArticleBox";
import Link from "next/link";

export default function HomeCatagory({ category }) {

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

              <span className="block text-lg mt-2">{category.description}</span>
            </h1>
            <section className="row">
              {data.data.map((part) => (
                <ArticleBox post={part} key={part.id} />
              ))}
            </section>
          </main>
        ) : (
          " "
        )}
      </>
    );
  }
}
