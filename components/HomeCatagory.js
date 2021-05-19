import { useEffect, useState } from "react";
import { API_URL } from "../config/index";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import axios from "axios";
import TimeAgo from "react-timeago";

export default function HomeCatagory({ catId }) {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/posts?catagory=${catId}&_limit=6`).then((res) => {
      console.log(res.data);
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
              <Link href={`/artical/${part.slug}`}>
                <a>
                  <img
                    alt="Placeholder"
                    className="w-full h-auto"
                    src={`${API_URL}${part.image[0].url}`}
                  />
                </a>
              </Link>
              <div className="w-full h-28 p-2">
                <Link href={`/artical/${part.slug}`}>
                  <a className="hover:underline">{part.title}</a>
                </Link>
                <br />
                <small>
                  <TimeAgo date={new Date(part.updated_at).toUTCString()} />
                </small>
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
