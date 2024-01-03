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
import { db, storage } from "../Firebase";
import { push, ref, update } from "firebase/database";
import { uploadBytes, ref as sref, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { RxCross2 } from "react-icons/rx";
// import { BsPlusLg } from "react-icons/bs";
// import { MdModeEdit } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

const AddProductModal = ({
  handleDataForm,
  DataForm,
  formData,
  setFormData,
  isEdit,
}) => {
  console.log(isEdit);
  console.log(formData);

  //   const dispatch = useDispatch();
  //   let navigate = useNavigate();
  let scrnWidth = window.innerWidth;
  // Modal box style
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: scrnWidth >= 600 ? 900 : "85%",
    height: scrnWidth >= 600 ? 570 : 700,
    bgcolor: "white",
    borderRadius: "18px",
    boxShadow: 24,
    // overflowY: "scroll",
  };

  let baseUrl = import.meta.env.VITE_BASE_URL;

  let reset = () => {
    setFormData({
      name: "",
      sku: "",
      stock: "",
      vendor: "",
      price: "",
      location: "",
      pic_1: "",
      pic_2: "",
      pic_3: "",
      item_description: "",
      category_1: "",
      category_2: "",
      category_3: "",
    });
  };

  let saveToDb = async () => {
    // console.log("testing");
    const headFormData = new FormData();
    headFormData.append("name", formData.name);
    headFormData.append("phone", formData.phone);
    headFormData.append("email", formData.email);
    headFormData.append("comment", formData.comment);
    headFormData.append("orderType", "customQuote");
    headFormData.append("company", formData.company);
    headFormData.append("stock", formData.stock);
    headFormData.append("lamination", formData.lamination);
    headFormData.append("printing", formData.printing);
    headFormData.append("deliveryDate", formData.deliveryDate);
    headFormData.append("image", formData.artImg);
    headFormData.append("boxType", formData.boxType);
    headFormData.append("dimentions", formData.dimention);
    headFormData.append("quantity", formData.quantity);
    headFormData.append("units", formData.units);
    try {
      await axios
        .post(`${baseUrl}/api/submitOrder`, headFormData)
        .then((resp) => {
          console.log("testing2", resp);

          toast.success(resp?.data?.message);
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            stock: "",
            lamination: "",
            printing: "",
            deliveryDate: "",
            artImg: "",
            boxType: "",
            dimention: "",
            units: "",
            comment: "",
            quantity: "",
          });
        });

      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const addData = async () => {
    // if (data.name) {

    if (isEdit) {
      update(ref(db, `Records/${formData?.id}`), { ...formData })
        .then(() => {
          console.log(formData?.id);
          toast?.success("Submited successfuly");
        })
        .catch((err) => {
          console.log(err);
          toast?.error(err);
        });
    } else {
      var pushkey = push(ref(db, `Records/`), formData).key;
      update(ref(db, `Records/${pushkey}`), { id: pushkey });
      toast?.success("Submited successfuly");
    }
    let theId = isEdit ? formData?.id : pushkey;
    if (formData?.pic_1 && formData?.pic_1?.slice(0, 5) != "https") {
      let name = new Date().getTime() + formData?.pic_1.name;
      const storageRef = sref(storage, name);
      uploadBytes(storageRef, formData?.pic_1)
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              console.log(URL);
              update(ref(db, `Records/${theId}`), { pic_1: URL });
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          // setimg(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (formData?.pic_2 && formData?.pic_2.slice(0, 5) != "https") {
      let name2 = new Date().getTime() + formData?.pic_2.name;
      const storageRef = sref(storage, name2);
      uploadBytes(storageRef, formData?.pic_2)
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              console.log(URL);
              update(ref(db, `Records/${theId}`), { pic_2: URL });
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          setimg(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (formData?.pic_3 && formData?.pic_3.slice(0, 5) != "https") {
      let name3 = new Date().getTime() + formData?.pic_3.name;
      const storageRef = sref(storage, name3);
      uploadBytes(storageRef, formData?.pic_3)
        .then(() => {
          console.log("img testing");
          getDownloadURL(storageRef)
            .then((URL) => {
              console.log(URL);
              update(ref(db, `Records/${theId}`), { pic_3: URL });
              // window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
          setimg(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setFormData({
      name: "",
      sku: "",
      stock: "",
      vendor: "",
      price: "",
      location: "",
      pic_1: "",
      pic_2: "",
      pic_3: "",
      item_description: "",
      category_1: "",
      category_2: "",
      category_3: "",
    });

    //   if (!img) {
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 3000);
    //   }
    // }
  };

  let shortString = (str) => {
    if (str?.length <= 16) {
      return str;
    } else {
      return str?.slice(0, 16) + "...";
    }
  };

  return (
    <>
      <Modal
        open={DataForm}
        onClose={() => {
          handleDataForm(), reset();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <>
            <div className="w-[100%] h-[100%]  scrollbar-hide">
              <div className="w-[100%] flex flex-col items-center">
                <div className="w-[100%] flex flex-col items-center">
                  <div className="w-[90%] flex justify-center items-center mt-[10px]">
                    <div className="sm:w-[30%] w-[27%]   mr-3 h-[1px]  bg-[#696262]"></div>
                    <h2
                      className="sm:text-xl text-[16px]  font-bold text-[#0b567f] text-center"
                      //   style={{ fontFamily: "Roboto" }}
                    >
                      Product Information
                    </h2>
                    <div className="sm:w-[30%] w-[27%]  ml-3  h-[1px]  bg-[#696262]"></div>
                  </div>
                </div>
                <div
                  className="sm:w-[87%] w-[87%]  sm:mt-[10px] mt-[20px]  pr-2 "
                  //   style={{ overflowY: "scroll", overflowX: "hidden" }}
                >
                  <div className="w-[100%]  flex sm:justify-between items-center sm:flex-row flex-col">
                    <div className="sm:w-[30%] w-[90%] sm:mt-0 mt-3">
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
                          setFormData({ ...formData, name: e.target.value })
                        }
                        value={formData?.name}
                      />
                    </div>
                    <div className="sm:w-[30%] w-[90%] sm:mt-0 mt-3">
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                        >
                          Sku <span className="text-red-500 ">*</span>
                        </p>
                      </div>

                      <input
                        type="text"
                        // placeholder="Required Quantity *"
                        className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                        // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sku: e.target.value,
                          })
                        }
                        value={formData?.sku}
                      />
                    </div>
                    <div className="sm:w-[30%] w-[90%] sm:mt-0 mt-3">
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                        >
                          Category 1<span className="text-red-500 ">*</span>
                        </p>
                      </div>

                      <input
                        type="text"
                        // placeholder="Required Quantity *"
                        className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                        // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category_1: e.target.value,
                          })
                        }
                        value={formData?.category_1}
                      />
                    </div>
                  </div>
                  <div className="sm:mt-[10px]  w-[100%] flex sm:justify-between items-center sm:flex-row flex-col">
                    <div
                      className="sm:w-[30%] w-[90%] sm:mt-0 mt-3"
                      //   style={isDesktopOrLaptop ? null : { marginTop: "14px" }}
                    >
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                        >
                          Category 2 <span className="text-red-500 ">*</span>
                        </p>
                      </div>

                      <input
                        type="text"
                        // placeholder="Required Quantity *"
                        className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                        // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category_2: e.target.value,
                          })
                        }
                        value={formData?.category_2}
                      />
                    </div>
                    <div
                      className="sm:w-[30%] w-[90%] sm:mt-0 mt-3"
                      //   style={isDesktopOrLaptop ? null : { marginTop: "14px" }}
                    >
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                        >
                          Category 3 <span className="text-red-500 ">*</span>
                        </p>
                      </div>

                      <input
                        type="text"
                        // placeholder="Required Quantity *"
                        className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                        // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category_3: e.target.value,
                          })
                        }
                        value={formData?.category_3}
                      />
                    </div>
                    <div
                      className="sm:w-[30%] w-[90%] sm:mt-0 mt-3"
                      //   style={isDesktopOrLaptop ? null : { marginTop: "14px" }}
                    >
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                        >
                          Price<span className="text-red-500 ">*</span>
                        </p>
                      </div>

                      <input
                        type="number"
                        // placeholder="Required Quantity *"
                        className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                        // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        value={formData?.price}
                      />
                    </div>
                  </div>

                  <div className="sm:mt-[10px] w-[100%] flex sm:justify-between items-center sm:flex-row flex-col">
                    <div
                      className="sm:w-[30%] w-[90%] sm:mt-0 mt-3"
                      //   style={isDesktopOrLaptop ? null : { marginTop: "14px" }}
                    >
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                        >
                          Stock <span className="text-red-500 ">*</span>
                        </p>
                      </div>

                      <input
                        type="number"
                        // placeholder="Required Quantity *"
                        className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                        // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        value={formData?.stock}
                      />
                    </div>
                    <div
                      className="sm:w-[30%] w-[90%] sm:mt-0 mt-3"
                      //   style={isDesktopOrLaptop ? null : { marginTop: "14px" }}
                    >
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                        >
                          Address <span className="text-red-500 ">*</span>
                        </p>
                      </div>

                      <input
                        type="text"
                        // placeholder="Required Quantity *"
                        className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                        // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        value={formData?.location}
                      />
                    </div>
                    <div
                      className="sm:w-[30%] w-[90%] sm:mt-0 mt-3"
                      //   style={isDesktopOrLaptop ? null : { marginTop: "14px" }}
                    >
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          //   style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                        >
                          Vendor <span className="text-red-500 ">*</span>
                        </p>
                      </div>

                      <input
                        type="text"
                        // placeholder="Required Quantity *"
                        className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 "
                        // className="outline-none p-2 w-[100%] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1"
                        onChange={(e) =>
                          setFormData({ ...formData, vendor: e.target.value })
                        }
                        value={formData?.vendor}
                      />
                    </div>
                  </div>

                  <div className=" w-[100%] flex sm:justify-between items-center sm:flex-row flex-col">
                    <div className="sm:w-[30%] w-[90%] sm:mt-0 mt-1">
                      <div className="w-[100%] flex justify-center mt-2">
                        <img
                          // src="https://placehold.co/70x70"
                          src={
                            formData?.pic_1
                              ? typeof formData?.pic_1 === "string"
                                ? formData?.pic_1
                                : URL.createObjectURL(formData?.pic_1)
                              : "https://placehold.co/70x70"
                          }
                          alt=""
                          className="h-[70px] w-[70px] rounded-md"
                        />
                      </div>
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          style={{
                            lineHeight: "13px",
                          }}
                        >
                          Picture 1
                        </p>
                      </div>

                      <div>
                        <label htmlFor="img-picker">
                          <input
                            type="file"
                            id="img-picker"
                            className="outline-none"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pic_1: e.target.files[0],
                              })
                            }
                          />

                          <div className="  w-[100%] h-[42px] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 flex  items-center ">
                            <div
                              className="h-[87%] sm:w-[40%] w-[40%] sm:text-sm text-[white] border rounded-md bg-[#0b567f] hover:bg-[#b2d9ee] ml-1  flex justify-center items-center cursor-pointer"
                              style={{
                                // fontFamily: "Roboto",
                                lineHeight: "13px",
                              }}
                            >
                              Select File
                            </div>
                            <div
                              className="ml-2 h-[87%] sm:w-[50%] w-[60%]  text-sm flex  items-center"
                              style={
                                {
                                  // fontFamily: "Roboto",
                                  // lineHeight: "13px",
                                }
                              }
                            >
                              {formData?.pic_1?.name
                                ? shortString(formData?.pic_1?.name)
                                : "No file chosen"}
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="sm:w-[30%] w-[90%] sm:mt-0 mt-1">
                      <div className="w-[100%] flex justify-center mt-2">
                        <img
                          src={
                            formData?.pic_2
                              ? typeof formData?.pic_2 === "string"
                                ? formData?.pic_2
                                : URL.createObjectURL(formData?.pic_2)
                              : "https://placehold.co/70x70"
                          }
                          alt=""
                          className="h-[70px] w-[70px] rounded-md"
                        />
                      </div>
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          style={{
                            lineHeight: "13px",
                          }}
                        >
                          Picture 2
                        </p>
                      </div>
                      <div>
                        <label htmlFor="img-picker2">
                          <input
                            type="file"
                            id="img-picker2"
                            className="  outline-none"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pic_2: e.target.files[0],
                              })
                            }
                          />

                          <div className="  w-[100%] h-[42px] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 flex  items-center ">
                            <div
                              className="h-[87%] sm:w-[40%] w-[40%] sm:text-sm text-[white] border rounded-md bg-[#0b567f] hover:bg-[#b2d9ee] ml-1  flex justify-center items-center cursor-pointer"
                              style={{
                                // fontFamily: "Roboto",
                                lineHeight: "13px",
                              }}
                            >
                              Select File
                            </div>
                            <div
                              className="ml-2 h-[87%] sm:w-[50%] w-[60%]  text-sm flex  items-center"
                              style={
                                {
                                  // fontFamily: "Roboto",
                                  // lineHeight: "13px",
                                }
                              }
                            >
                              {formData?.pic_2?.name
                                ? shortString(formData?.pic_2?.name)
                                : "No file chosen"}
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="sm:w-[30%] w-[90%] sm:mt-0 mt-1">
                      <div className="w-[100%] flex justify-center mt-2">
                        <img
                          src={
                            formData?.pic_3
                              ? typeof formData?.pic_3 === "string"
                                ? formData?.pic_3
                                : URL.createObjectURL(formData?.pic_3)
                              : "https://placehold.co/70x70"
                          }
                          alt=""
                          className="h-[70px] w-[70px] rounded-md"
                        />
                      </div>
                      <div>
                        <p
                          className="font-[400] sm:text-[12px]  text-[10px]"
                          style={{
                            lineHeight: "13px",
                          }}
                        >
                          Picture 3
                        </p>
                      </div>
                      <div>
                        <label htmlFor="img-picker3">
                          <input
                            type="file"
                            id="img-picker3"
                            className="  outline-none"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pic_3: e.target.files[0],
                              })
                            }
                          />

                          <div className="  w-[100%] h-[42px] border rounded-md border-[#c4c4c4] placeholder:text-sm mt-1 flex  items-center ">
                            <div
                              className="h-[87%] sm:w-[40%] w-[40%] sm:text-sm text-[white] border rounded-md bg-[#0b567f] hover:bg-[#b2d9ee] ml-1  flex justify-center items-center cursor-pointer"
                              style={{
                                // fontFamily: "Roboto",
                                lineHeight: "13px",
                              }}
                            >
                              Select File
                            </div>
                            <div
                              className="ml-2 h-[87%] sm:w-[50%] w-[60%]  text-sm flex  items-center"
                              style={
                                {
                                  // fontFamily: "Roboto",
                                  // lineHeight: "13px",
                                }
                              }
                            >
                              {formData?.pic_3?.name
                                ? shortString(formData?.pic_3?.name)
                                : "No file chosen"}
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="sm:mt-[10px] mt-[14px] w-[100%] flex flex-col items-center">
                    <div className="sm:w-[100%] w-[90%]">
                      <p
                        className="font-[400] sm:text-[12px]  text-[10px]"
                        // style={{ fontFamily: "Roboto", lineHeight: "13px" }}
                      >
                        Additional Comment
                      </p>
                    </div>
                    <textarea
                      name=""
                      id=""
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          item_description: e.target.value,
                        })
                      }
                      value={formData?.item_description}
                      className="outline-none p-2 sm:h-[80px] sm:w-[100%] w-[90%] border rounded-md border-[#c4c4c4] placeholder:text-sm  resize-none"
                    ></textarea>
                  </div>

                  <div className="w-[100%] flex sm:mt-[10px] mt-[15px] sm:justify-end justify-center">
                    <div
                      className="hover:bg-[#F2F2F2] hover:text-[#585656] cursor-pointer hover:border-[#F2F2F2] sm:w-[120px] sm:h-[44px] w-[100px] h-[40px]  sm:text-[16px] text-[14px] rounded-md flex justify-center items-center mr-3 border border-[#0b567f]  font-[600] text-[#0b567f]"
                      //   style={{ fontFamily: "Inter" }}
                      onClick={() => reset()}
                    >
                      Reset
                    </div>
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

export default AddProductModal;
