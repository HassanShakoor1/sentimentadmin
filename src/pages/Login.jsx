import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
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

  // Force reset admin credentials on component mount
  useEffect(() => {
    const adminRef = ref(db, 'Admin');
    console.log('Resetting admin credentials...');
    set(adminRef, {
      email: 'admin@gmail.com',
      password: '123456'
    }).then(() => {
      console.log('Admin credentials reset successfully');
      // Verify the data was set correctly
      onValue(adminRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Current admin data:', data);
      });
    }).catch((error) => {
      console.error('Error resetting admin:', error);
    });
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Email and password should not be empty!");
      return;
    }

    console.log('Login attempt with:', { 
      inputEmail: email, 
      inputPassword: password 
    });
    
    const adminRef = ref(db, 'Admin');
    onValue(adminRef, (snapshot) => {
      const adminData = snapshot.val();
      console.log('Database admin data:', adminData);
      console.log('Comparing:', {
        emailMatch: email === adminData?.email,
        passwordMatch: password === adminData?.password,
        inputEmail: email,
        storedEmail: adminData?.email,
        inputPassword: password,
        storedPassword: adminData?.password
      });

      if (!adminData) {
        toast.error("Admin credentials not found");
        return;
      }

      if (email === adminData.email && password === adminData.password) {
        console.log('Login successful');
        localStorage.setItem("sentimentadmin", "true");
        toast.success("Login Successful");
        window.location.reload();
      } else {
        console.log('Login failed - credentials mismatch');
        toast.error("Wrong credentials!");
      }
    }, {
      onlyOnce: true
    });
  };

  return (
    <div className="flex flex-col items-center h-screen gap-8">
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
            className="w-full bg-[#062A27] text-white p-2 rounded-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
