import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import Plane from "./Plane";
export default function subscriptions({ next }) {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [session, loading] = useSession();
  const [haveEmail, setHaveEmail] = useState(false);
  useEffect(() => {
    axios.post("/api/payment/loadPlans").then(({ data }) => {
      setData(data);
      setLoad(true);
    });
    if (session) {
      setHaveEmail(true);
    } else {
      setHaveEmail(false);
    }
  }, []);
  if (!load) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 w-full outline-none focus:outline-none bg-black">
          <div className="relative my-6 mx-auto h-full w-11/12 max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-bgColor">
                <h2>Subscription plans</h2>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto leading-loose">
                <h3> Please subscribe inorder to see the content</h3>
                <div className="grid grid-col-1 md:grid-cols-2 mt-10">
                  {data.map((item) => (
                    <Plane
                      key={`${item.price}-la`}
                      priceId={item.priceId}
                      name={item.productName}
                      productId={item.productId}
                      desc={item.productDesc}
                      cost={item.price}
                      image={item.productImage}
                      haveEmail={haveEmail}
                      after={next}
                    />
                  ))}
                </div>
              </div>
              {/*footer*/}
            </div>
          </div>
        </div>
      </>
    );
  }
}
