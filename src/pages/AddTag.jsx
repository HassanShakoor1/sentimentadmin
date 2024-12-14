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

const AddTag = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    tagId: "",
    status: false,
  });

  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "/Tags");
    onValue(starCountRef, async (snapshot) => {
      const Tagdata = await snapshot.val();
      if (Tagdata) {
        setAllTags(Object.values(Tagdata));
      }
    });
  }, []);
  const addNewTag = async () => {
    setLoading(true);
    const ifExist = allTags?.find((tag) => {
      return tag?.tagId === data?.tagId;
    });

    console.log(ifExist);
    if (!ifExist) {
      let pushKey = push(ref(db, `Tags/`), {
        ...data,
        userid: "",
      }).key;
      setData({
        tagId: "",
        status: false,
      });
      update(ref(db, `Tags/${pushKey}`), {
        id: pushKey,
      }).then(() => {
        toast.success("New tag created successfuly");
        setLoading(false);
      });
      return;
    } else {
      setLoading(false);
      toast.error("This tag is already creadted");
    }
    MediaKeyStatusMap;
  };

  const setStatus = (val) => {
    if (val === "true") {
      setData({ ...data, status: true });
    } else {
      setData({ ...data, status: false });
    }
  };

  return (
    <div className="w-[100%] flex">
      <Sidebar />
      <div className="w-[85%] flex justify-center items-center">
        <div className="w-[600px] p-6 bg-white border rounded shadow ">
          <h2 className="text-2xl font-semibold mb-6">Add New QR</h2>
          {/* <form> */}
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              QR Id:
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              // value={oldPassword}
              onChange={(e) => setData({ ...data, tagId: e.target.value })}
              value={data?.tagId}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Status:
            </label>
            <select
              className="border rounded w-full py-2 px-3"
              onChange={(e) => setStatus(e.target.value)}
              value={`${data?.status}`}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="true">Active</option>
              <option value="false">In Active</option>
            </select>
          </div>
          <button
            // type="submit"
            className=" text-white rounded py-2 px-4  bg-[#062A27] focus:outline-none focus:shadow-outline-blue"
            onClick={() => addNewTag()}
          >
            {loading ? <CircularProgress color="inherit" /> : "Save QR"}
          </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default AddTag;
