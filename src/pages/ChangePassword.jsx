// ChangePassword.js

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { auth, db } from "../Firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { onValue, ref, update } from "firebase/database";

const ChangePassword = () => {
  const [actualPassword, setActualPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const starCountRef1 = ref(db, `/Admin`);
    onValue(starCountRef1, async (snapshot) => {
      const data = await snapshot.val();
      setActualPassword(data?.password);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (oldPassword && newPassword) {
      if (oldPassword === actualPassword) {
        update(ref(db, `Admin/`), {
          password: newPassword,
        }).then(() => {
          toast.success("Password updated successfuly");
          setNewPassword("");
          setOldPassword("");
          // setLoading(false);
        });
      } else {
        toast.error("Your old password is incorrect");
      }
    } else {
      toast.error("Both fields are required");
    }
  };

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="w-[85%] flex justify-center items-center">
        <div className="w-[600px] p-6 bg-white border rounded shadow ">
          <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Old Password:
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <button
              type="submit"
              className=" text-white rounded py-2 px-4 hover:bg-[#b2d9ee] bg-[#062A27] focus:outline-none focus:shadow-outline-blue"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
