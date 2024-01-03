import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
// import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import {
  BsBuildingsFill,
  BsFillPersonFill,
  BsTelephoneFill,
} from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { auth, db, storage } from "../Firebase";
import { push, ref, set, update } from "firebase/database";
import { uploadBytes, ref as sref, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { MdOutlineCancel } from "react-icons/md";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { RxCross2 } from "react-icons/rx";
// import { BsPlusLg } from "react-icons/bs";
// import { MdModeEdit } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

const AddUserModal = ({
  handleaddForm,
  addForm,
  data,
  setData,
  isuserEdit,
}) => {
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
    height: 300,
    bgcolor: "white",
    borderRadius: "18px",
    boxShadow: 24,
    // overflowY: "scroll",
  };

  const addData = async () => {
    if (!isaddEdit) {
      if (data.name && data.email && data.password) {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            const user = userCredential.user;
            update(ref(db, `User/${user.uid}`), {
              id: user.uid,
              name: data?.name,
              email: data.email,
              role: "admin",
            }).then(() => {
              toast.success("New user created sucessfuly");
              handleaddForm();
            });
            // Signed in

            // console.log(user.uid)
          })
          .catch((error) => {
            const errorCode = error.code;
            //   const errorMessage = error.message;
            console.log(error.message);
            if (error.message === "Firebase: Error (auth/invalid-email).") {
              toast.error("Please enter valid email");
            } else if (
              error.message === "Firebase: Error (auth/email-already-in-use)."
            ) {
              toast.error("Email already exits");
            } else if (
              error.message ===
              "Firebase: Password should be at least 6 characters (auth/weak-password)."
            ) {
              toast.error("Password must be at least 6 characters");
            }

            // ..
          });

        setData({
          email: "",
          password: "",
          name: "",
        });
      } else {
        toast.error("Email , password and user name should not be empty");
      }
    } else {
      update(ref(db, `User/${data?.id}`), {
        id: data.id,
        name: data?.name,
        email: data?.email,
        role: "user",
      }).then(() => {
        toast.success("New user created sucessfuly");
        handleaddForm();
      });
    }
  };

  return (
    <>
      <Modal
        open={addForm}
        onClose={() => {
          handleaddForm(), setData({ name: "", email: "", password: "" });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <>
            <div className="w-[100%] h-[100%]">
              <div className="w-[100%] flex justify-end">
                <MdOutlineCancel
                  className="mt-[6px] mr-[6px] text-xl cursor-pointer"
                  onClick={() => handleaddForm()}
                />
              </div>
              <div className="w-[100%] flex flex-col items-center">
                <div className="w-[100%] flex flex-col items-center">
                  <div className="w-[90%] flex justify-center items-center ">
                    <div className="sm:w-[30%] w-[27%]   mr-3 h-[1px]  bg-[#696262]"></div>
                    <h2
                      className="sm:text-xl text-[16px]  font-bold text-[#0b567f] text-center"
                      //   style={{ fontFamily: "Roboto" }}
                    >
                      Add User
                    </h2>
                    <div className="sm:w-[30%] w-[27%]  ml-3  h-[1px]  bg-[#696262]"></div>
                  </div>
                </div>
                <div
                  className="sm:w-[87%] w-[87%]  sm:mt-[10px] mt-[20px]  pr-2"
                  //   style={{ overflowY: "scroll", overflowX: "hidden" }}
                >
                  <div className="w-[100%]  flex sm:justify-between items-center sm:flex-row flex-col">
                    <div className="sm:w-[45%] w-[90%] sm:mt-0 mt-3">
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                        >
                          Name <span className="text-red-500 ">*</span>
                        </p>
                      </div>

                      <input
                        type="text"
                        // placeholder="Required Quantity *"
                        className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                        // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                        value={data?.name}
                      />
                    </div>
                    <div className="sm:w-[45%] w-[90%] sm:mt-0 mt-3">
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                        >
                          Email <span className="text-red-500 ">*</span>
                        </p>
                      </div>

                      <input
                        type="text"
                        // placeholder="Required Quantity *"
                        className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                        // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                        onChange={(e) =>
                          setData({
                            ...data,
                            email: e.target.value,
                          })
                        }
                        value={data?.email}
                      />
                    </div>
                  </div>
                  {!isuserEdit && (
                    <div className="w-[100%] flex sm:justify-between items-center sm:flex-row flex-col mt-3">
                      <div className=" w-[100%] sm:mt-0 mt-3">
                        <div>
                          <p
                            className="font-[400] sm:text-[12px]  text-[10px]"
                            //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                          >
                            Password <span className="text-red-500 ">*</span>
                          </p>
                        </div>

                        <input
                          type="text"
                          // placeholder="Required Quantity *"
                          className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                          // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                          onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                          }
                          value={data?.password}
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className="w-[100%] flex sm:mt-[10px] mt-[15px] "
                    style={{
                      justifyContent: !isuserEdit ? "flex-end" : "center",
                    }}
                  >
                    {/* <div
                      className="hover:bg-[#F2F2F2] hover:text-[#585656] cursor-pointer hover:border-[#F2F2F2] sm:w-[120px] sm:h-[44px] w-[100px] h-[40px]  sm:text-[16px] text-[14px] rounded-md flex justify-center items-center mr-3 border border-[#0b567f]  font-[600] text-[#0b567f]"
                    
                    >
                      Reset
                    </div> */}
                    <div
                      className="sm:w-[120px] sm:h-[44px] w-[100px] h-[40px] sm:text-[16px] text-[14px] rounded-md flex justify-center items-center bg-[#0b567f] hover:bg-[#b2d9ee] font-[600] text-white cursor-pointer"
                      //   style={{ fontFamily: "Inter" }}
                      onClick={() => addData()}
                    >
                      Submit
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </>
        </Box>
      </Modal>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </>
  );
};

export default AddUserModal;
