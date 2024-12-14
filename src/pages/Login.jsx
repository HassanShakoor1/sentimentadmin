import { signInWithEmailAndPassword } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiEye } from "react-icons/pi";
import { PiEyeClosed } from "react-icons/pi";
import logo from "../img/logo.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {}, []);

  const handleLogin = () => {
    if (email && password) {
      const starCountRef1 = ref(db, `/Admin`);
      onValue(starCountRef1, async (snapshot) => {
        const data = await snapshot.val();
        MediaKeyStatusMap;
        if (data?.email === email && data?.password === password) {
          localStorage.setItem("sentimentadmin", "true");
          toast.success("Login Sucessfuly");
          window.location.reload();
        } else {
          toast.error("Wrong credentials!");
        }

        // setfiltered(Object.values(alldata));

        // updateStarCount(postElement, data);
      });
    } else {
      toast.error("Email and password should not be empty!");
    }
  };

  return (
    <div className="flex  flex-col items-center h-screen gap-8">
      <img src={logo} alt="" className="mt-[6%]" />
      <div className="bg-white shadow-md p-6 rounded-md w-96 mt-[6%]">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <div className="w-[100%] relative">
            {showpassword ? (
              <PiEye
                className="absolute right-2 top-[20%] text-xl cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <PiEyeClosed
                className="absolute right-2 top-[20%] text-xl cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full  bg-[#062A27] text-white p-2 rounded-md  transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
