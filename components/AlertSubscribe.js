import { useState, useEffect } from "react";
import LoginPopup from "./LoginPopup";
import CloseIcon from "@material-ui/icons/Close";
import { useSession } from "next-auth/client";
import { BASE_URL } from "../config";
import { Button } from "@material-ui/core";
import DynamicPlans from "./DynamicPlans";
import { useRouter } from "next/router";
const AlertSubscribe = ({ show, currentLink }) => {
  const [session, loading] = useSession();
  const [showModal, setShowModal] = useState(show);
  const [loginModel, setLoginModel] = useState(false);
  const [planModal, setPlanModal] = useState(false);
  const [isemail, setIsemail] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (session) {
      setIsemail(true);
    }
  }, []);
  const handleRedirection = () => {
    router.push(BASE_URL);
  };
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
        <div
          className="alertSubscribtion
         justify-center items-center
          flex overflow-x-hidden overflow-y-auto
           fixed inset-0 z-50 outline-none
            focus:outline-none bg-black max-w-myMaxWidth mx-auto"
        >
          <div className="relative w-11/12 sm:w-11/12 sm:mx-auto md:w-2/4 lg:w-customW my-6">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex justify-center p-5 border-b border-solid border-blueGray-200 rounded-t bg-bgColor">
                <h2>Mitch Cumm</h2>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto leading-loose">
                {!session && (
                  <h3>
                    Already subscribed ?
                    <button
                      onClick={() => handlePriority(true)}
                      className="border-b-2 border-borderColor ml-1"
                    >
                      Sign In
                    </button>
                  </h3>
                )}
                <h3> Please subscribe in order to see the content</h3>
                <div className="mt-3 flex justify-around items-center flex-col sm:flex-row">
                  <div>
                    <Button
                      variant="outlined"
                      className="focus:outline-none"
                      onClick={() => setPlanModal(true)}
                    >
                      Subscribe
                    </Button>
                  </div>
                  <div className="py-2 sm:py-0">
                    <Button
                      variant="outlined"
                      onClick={handleRedirection}
                      className="focus: outline-none"
                    >
                      Home
                    </Button>
                  </div>
                </div>
                {/* parents */}
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
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black max-w-myMaxWidth mx-auto">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Login</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handlePriority(false)}
                  >
                    <CloseIcon className="text-black" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <LoginPopup mainPage={false} />
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
        </>
      )}
      {/* end loginPopu */}
      {planModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black max-w-myMaxWidth mx-auto">
            <div className="relative w-11/12 my-6 mx-auto max-w-3xl h-myHeight sm:h-myHeight md:h-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                    Subscription Plans
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setPlanModal(false)}
                  >
                    <CloseIcon className="text-black" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative leading-loose flex flex-col sm:flex-row">
                  <DynamicPlans isemail={isemail} />
                </div>
                <button
                  className="text-lg bg-red-400 focus:outline-none"
                  onClick={() => setPlanModal(false)}
                >
                  <span className="p-2 text-black font-bold my-2">Cancel</span>
                </button>
                {/*footer*/}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default AlertSubscribe;
