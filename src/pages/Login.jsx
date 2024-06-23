import { signInWithEmailAndPassword } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md p-6 rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={handleLogin}
            className="w-full hover:bg-[#b2d9ee] bg-[#0b567f] text-white p-2 rounded-md  transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
