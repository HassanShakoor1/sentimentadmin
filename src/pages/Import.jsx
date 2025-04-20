// ChangePassword.js

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
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
import Papa from "papaparse";
import { db } from "../Firebase";

const Import = () => {
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  let uploadBulk = () => {
    setLoading(true);
    if (csvFile != null) {
      Papa.parse(csvFile, {
        header: true,
        complete: async (result) => {
          // result.data contains the array of objects
          let theCsvData = result.data;
          console.log(theCsvData);
          const uploadTagsPromise = theCsvData?.map((elm) => {
            var pushkey = push(ref(db, `Tags/`), {
              tagId: elm?.tagId,
              userid: "",
              status: false,
            }).key;
            update(ref(db, `Tags/${pushkey}`), { id: pushkey })
              .then(() => {
                // console.log("submited");
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          });

          try {
            const updatedUserlinks = await Promise.all(uploadTagsPromise);
            console.log("Updated IDs:", updatedUserlinks);
            // Handle success, show success message, etc.
            toast?.success("Submited successfuly");
            setLoading(false);
            setCsvFile("");
          } catch (error) {
            console.error("Error updating objects:", error);
            toast.error("Error updating objects");
            setLoading(false);
          }

          // setData(result.data);
        },
      });
    } else {
      toast?.error("Please select the file");
    }
};

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="w-[85%] flex justify-center items-center">
        <div className="w-[600px] p-6 bg-white border rounded shadow ">
          <h2 className="text-2xl font-semibold mb-1">Import QRs</h2>

          {/* <form> */}
          <div className="mt-3">
            {/* <label
              htmlFor="oldPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Upload File
            </label> */}
            <input
              type="file"
              id="tag"
              name="tag"
              // value={oldPassword}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={(e) => setCsvFile(e.target.files[0])}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          <button
            // type="submit"
            className=" text-white rounded h-[40px] flex items-center justify-center w-[100px] py-2 px-4 hover:bg-[#b2d9ee] bg-[#062A27] focus:outline-none focus:shadow-outline-blue mt-3"
            onClick={() => uploadBulk()}
          >
            {loading ? <CircularProgress color="inherit" size={25} /> : "Save"}
          </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Import;
