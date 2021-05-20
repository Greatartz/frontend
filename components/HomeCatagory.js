import { useEffect, useState } from "react";
import { API_URL } from "../config/index";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import ArticleBox from '../components/ArticleBox'
import Link from "next/link";

export default function HomeCatagory({ catId , catName}) {

  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/posts?category=${catId}&_limit=6&_sort=id:DESC`).then((res) => {

      setData(res.data);
      setLoad(true);

    });
  }, []);
 
  if (load) {
    return (
      <>
        {data.length > 0 ? 
          <main>
            <h1 className="container mx-auto text-3xl mt-10 mb-5">
                <Link href={`/category/${catName}`}>
                    <a className="border-b-2 border-borderColor inline-block pb-2">{catName}</a>
                </Link>
            </h1>
            <section className="container mb-10 mx-auto grid grid-cols-3 gap-10">
                {data.map((part) => (
                    <ArticleBox post={part} />
                ))}
            </section>
          </main>
        : " " }
        
      </>
    );
  } else {
    return (
      <div>
        <Skeleton count={1} />
      </div>
    );
  }
}
