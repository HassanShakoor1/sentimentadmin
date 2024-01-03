import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
// import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { remove } from "firebase/database";
import { ref } from "firebase/storage";
import { db } from "../Firebase";

const DellModal = ({ handleDelModal, DelModal, handleDelete }) => {
  // console.log(link);

  //   const dispatch = useDispatch();
  //   let navigate = useNavigate();
  let scrnWidth = window.innerWidth;
  // Modal box style
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 200,
    bgcolor: "white",
    borderRadius: "18px",
    boxShadow: 24,
    // overflowY: "scroll",
  };

  let baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <Modal
        open={DelModal}
        onClose={() => {
          handleDelModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <>
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
              <p className="text-lg font-[500]">
                Are you sure to delete this data?
              </p>
              <div className="w-[100%] flex justify-center items-center mt-3">
                <button
                  className="w-[85px] h-[38px]  text-white hover:bg-[#b2d9ee] bg-[#0b567f] rounded-lg mr-2"
                  onClick={() => {
                    handleDelModal(), handleDelete();
                  }}
                >
                  Yes
                </button>
                <button
                  className="w-[85px] h-[38px]  text-white hover:bg-[#b2d9ee] bg-[#0b567f] rounded-lg ml-2"
                  onClick={() => handleDelModal()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        </Box>
      </Modal>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </>
  );
};

export default DellModal;
