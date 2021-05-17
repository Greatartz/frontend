import { useEffect, useState } from "react";
import { API_URL } from "../config/index";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import axios from "axios";

export default function HomeCatagory({ catId }) {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/posts?category=${catId}&_limit=6`).then((res) => {
      setData(res.data);
      setLoad(true);
    });
  }, []);
  if (load) {
    return (
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
        {data.map((part) => (
          <div key={`${part.id}-it-${catId}`}>
            <article className="overflow-hidden rounded-lg shadow-md">
              <Link href={`/artical/${part.id}`}>
                <a>
                  <img
                    alt="Placeholder"
                    className="cardImage"
                    src={`${API_URL}${part.featured_image.url}`}
                  />
                </a>
              </Link>
              <div className="w-full h-20 p-2">
                <Link href={`/artical/${part.id}`}>
                  <a className="hover:underline">{part.title}</a>
                </Link>
              </div>
            </article>
          </div>
        ))}
      </section>
    );
  } else {
    return (
      <div>
        <Skeleton count={1} />
      </div>
    );
  }
}
