import { useState, useEffect } from "react";
import LoginPopup from "./LoginPopup";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { BASE_URL } from "../config";
import { CircularProgress } from "@material-ui/core";
import Plane from "./Plane";
const AlertSubscribe = ({ show, currentLink }) => {
  const [session, loading] = useSession();
  const [showModal, setShowModal] = useState(show);
  const [loginModel, setLoginModel] = useState(false);
  const [toggle, setToggle] = useState(false);
  // const [processing, setProcessing] = useState(false);
  const [planModal, setPlanModal] = useState(false);
  const [dataPlane, setDataPlanes] = useState(null);
  const [isemail, setIsemail] = useState(false);

  useEffect(() => {
    if (session) {
      setIsemail(true);
    }
    axios.post(`/api/payment/loadPlans`).then(({ data }) => {
      setDataPlanes(data);
    });
  }, []);
  const handlePriority = (value) => {
    if (value) {
      setShowModal(false);
      setLoginModel(true);
    } else {
      setLoginModel(false);
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal ? (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black">
          <div className="relative w-11/12 sm:w-11/12 sm:mx-auto md:w-2/4 lg:w-customW my-6">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-bgColor">
                <h2>Mitch Cumm</h2>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto leading-loose">
                {!session && (
                  <h3>
                    Already subscribed ?{" "}
                    <button
                      onClick={() => handlePriority(true)}
                      className="border-b-2 border-borderColor"
                    >
                      Sign In
                    </button>
                  </h3>
                )}

                <h3> Please subscribe inorder to see the content</h3>
                <div className="mt-3 flex flex-col justify-center content-between text-center">
                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setPlanModal(true)}
                    >
                      Subscribe
                    </button>
                  </div>

                  <div className="mt-2">
                    <Link href={BASE_URL || "/"}>
                      <a className="border-b-2 border-borderColor">Home</a>
                    </Link>
                  </div>
                </div>
              </div>
              {/*footer*/}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* login popup */}
      {loginModel && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {toggle ? "Register" : "Login"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handlePriority(false)}
                  >
                    <CloseIcon className="text-black" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <LoginPopup />
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {/* end loginPopu */}
      {planModal ? (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-visible fixed inset-0 z-50 outline-none focus:outline-none bg-black">
          <div className="w-11/12 sm:w-11/12 sm:mx-auto md:w-2/4 lg:w-customW my-6">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none h-full focus:outline-none">
              {/*body*/}
              <h4 className="m-2">Subscription Planes</h4>
              <div className="leading-loose flex flex-col md:flex-row">
                {dataPlane ? (
                  dataPlane.map((i, n) => (
                    <Plane
                      key={`plan-d-${n}`}
                      after={currentLink}
                      priceId={i.priceId}
                      cost={i.price}
                      desc={i.productDesc}
                      name={i.productName}
                      image={i.productImage}
                      haveEmail={isemail}
                    />
                  ))
                ) : (
                  <div className="text-center">
                    <CircularProgress />
                  </div>
                )}
              </div>
              <button
                className="text-lg bg-red-400 focus:outline-none"
                onClick={() => setPlanModal(false)}
              >
                <span className="p-2 text-black font-bold my-2">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default AlertSubscribe;
