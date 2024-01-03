// ChangePassword.js

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { auth } from "../Firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

    auth.onAuthStateChanged(function (user) {
      if (user) {
        var credentials = EmailAuthProvider.credential(
          user?.email,
          oldPassword
        );
        reauthenticateWithCredential(user, credentials)
          .then(function () {
            updatePassword(user, newPassword)
              .then(function () {
                setOldPassword("");
                setNewPassword("");
                toast.success("Password changed successfuly");
              })
              .catch(function (error) {
                toast.error("Something went wrong");
              });
          })
          .catch(function (error) {
            toast.error("Old password is incorrect");
          });
      }
    });
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
              className=" text-white rounded py-2 px-4 hover:bg-[#b2d9ee] bg-[#0b567f] focus:outline-none focus:shadow-outline-blue"
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
