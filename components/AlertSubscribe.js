import { useState } from "react";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
const AlertSubscribe = ({ show }) => {
  const [showModal, setShowModal] = useState(show);
  const [loginModel, setLoginModel] = useState(false);
  const [toggle, setToggle] = useState(false);
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
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Mitch Cumm</h3>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div>
                  Already subscribed ?{" "}
                  <button onClick={() => handlePriority(true)}>Sign In</button>
                </div>
                <p> please subscribe inorder to see the content</p>
                <div>
                  <Link href="/subscriptions">
                    <a className="bg-indigo-500">Subscribe</a>
                  </Link>
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
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
    </>
  );
};
export default AlertSubscribe;
