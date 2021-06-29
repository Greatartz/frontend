import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import Plane from "./Plane";

export default function DynamicPlans({ isemail, nextLink }) {
  const [load, setLoad] = useState(false);
  const [dataPlane, setDataPlanes] = useState(null);
  useEffect(() => {
    axios.post(`/api/payment/loadPlans`).then(({ data }) => {
      setDataPlanes(data);
      setLoad(true);
    });
  }, []);
  if (load) {
    return (
      <>
        {dataPlane.map((i, n) => (
          <Plane
            key={`plan-d-${n}`}
            priceId={i.priceId}
            cost={i.price}
            desc={i.productDesc}
            name={i.productName}
            image={i.productImage || null}
            after={nextLink}
            haveEmail={isemail}
          />
        ))}
      </>
    );
  } else {
    return <CircularProgress className="text-center mx-auto" />;
  }
}
