// ChangePassword.js

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { auth, db } from "../Firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  equalTo,
  get,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  update,
} from "firebase/database";
import { CircularProgress } from "@mui/material";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const generateUniqueRandomNumbers = (count) => {
  let baseUrl = import.meta.env.VITE_PROFILE_URL;
  const numbers = new Set();

  while (numbers.size < count) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
    numbers.add(randomNumber);
  }

  return Array.from(numbers).map((number) => ({
    tagId: number,
    url: baseUrl + "viewprofile/" + number,
    status: false,
    Qr: baseUrl + "qr/" + number,
  }));
};

const Generate = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);

  const generateTags = () => {
    setLoading(true);
    if (count > 0 && count != null) {
      const uniqueNumbers = generateUniqueRandomNumbers(count);
      const csv = Papa.unparse(uniqueNumbers);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "tags.csv");

      setLoading(false);
      toast.success("Tags generated successfuly");
      setCount("");
    } else {
      toast.error("Number should be greater then 0");
      setLoading(false);
    }
  };
  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="w-[85%] flex justify-center items-center">
        <div className="w-[600px] p-6 bg-white border rounded shadow ">
          <h2 className="text-2xl font-semibold mb-1">Generate QRs</h2>
          <p>Enter number to generate qr (e.g 1,50,100)</p>
          {/* <form> */}
          <div className="mt-3">
            {/* <label
              htmlFor="oldPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tag Id:
            </label> */}
            <input
              type="number"
              id="tag"
              name="tag"
              min={0}
              // value={oldPassword}
              onChange={(e) => setCount(e.target.value)}
              value={count}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          <button
            // type="submit"
            className=" text-white rounded h-[40px] w-[100px] py-2 px-4 hover:bg-[#b2d9ee] bg-[#062A27] focus:outline-none focus:shadow-outline-blue mt-3"
            onClick={() => generateTags()}
          >
            {loading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              "Generate"
            )}
          </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Generate;
