import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Swal from "sweetalert2";
import Visible from "@material-ui/icons/Visibility";
import Blind from "@material-ui/icons/VisibilityOff";

export default function LoginPopup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleVisiblity = () => {
    if (visible == false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  return (
    <>
      <form className="flex flex-col pt-3 md:pt-8 md:w-full">
        <div className="flex flex-col pt-4">
          <label for="email" className="text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="shadow appearance-none border
                      rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex flex-col pt-4">
          <label for="password" className="text-lg">
            Password
          </label>
          <div className="flex">
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none
                      border rounded w-11/12 py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span className="ml-2 mt-2" onClick={handleVisiblity}>
              {visible ? <Visible /> : <Blind />}
            </span>
          </div>
        </div>
        <button className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
          {loading ? <CircularProgress className="p-2" /> : "Log In"}
        </button>
      </form>
    </>
  );
}
