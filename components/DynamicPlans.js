import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../config/index";
import { checkCookies, getCookie, setCookies } from "cookies-next";
import Plane from "./Plane";

export default function DynamicPlans({ isemail, nextLink }) {
  const [load, setLoad] = useState(false);
  const [dataPlane, setDataPlanes] = useState(null);
  useEffect(() => {
    // get country
    async function getCountryCode() {
      try {
        const { data } = await axios.post(`/api/payment/getType`);
        setCookies("code", data.code, { maxAge: 60 * 60 * 24 });
        return data.code;
      } catch {
        console.error("error while getting country");
      }
    }
    async function getPlansByCategory(cat) {
      if (cat == "A") {
        axios.post(`/api/payment/loadPlans`).then(({ data }) => {
          setDataPlanes(data);
          setLoad(true);
        });
      } else {
        axios.post(`/api/payment/loadPlansB`).then(({ data }) => {
          setDataPlanes(data);
          setLoad(true);
        });
      }
    }
    async function loadPlans() {
      const code = await getCountryCode();
      const { data } = await axios.get(`${API_URL}/countries?code=${code}`);

      //search code category
      if (data.length > 0) {
        getPlansByCategory(data[0]?.category);
      } else {
        getPlansByCategory("A");
      }
    }
    if (checkCookies("code")) {
      const code = getCookie("code");
      axios.get(`${API_URL}/countries?code=${code}`).then(({ data }) => {
        if (data.length > 0) {
          getPlansByCategory(data[0]?.category);
        } else {
          getPlansByCategory("A");
        }
      });
    } else {
      loadPlans();
    }
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
