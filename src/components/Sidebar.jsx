import React, { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { BsBox2Fill } from "react-icons/bs";
import logo from "../img/logo.png";
import { FaKey } from "react-icons/fa6";
import { IoPricetags } from "react-icons/io5";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaFileImport } from "react-icons/fa";
import { IoQrCodeSharp } from "react-icons/io5";

const Sidebar = () => {
  let navigate = useNavigate();

  let [user, setuser] = useState({});
  let [modal, setModal] = useState(false);

  let handleModal = () => {
    setModal(!modal);
  };
  let therole = localStorage.getItem("inventoryrole");
  // --------------------------geting the user data from firebase------------------------

  // useEffect(() => {
  //   let getingdata = async () => {
  //     const starCountRef = ref(db, `/User/${userId}`);
  //     onValue(starCountRef, async (snapshot) => {
  //       const data = await snapshot.val();

  //       setuser(data);
  //     });
  //   };

  //   getingdata();
  // }, []);

  let logOut = () => {
    let promise = new Promise((res, rej) => {
      res(localStorage.removeItem("sentimentadmin"));
    });

    promise.then(() => {
      navigate("/Login");
    });
    window.location.reload();
    // setModal(!modal);
  };

  let currentPath = window.location.href;

  return (
    <div className="w-[15%] max-h-[100vh] border-r flex flex-col sticky">
      <div className="h-[90vh]  w-[100%] flex flex-col justify-between items-center">
        <div className="h-[75%]  w-[90%] flex flex-col">
          <div className="  w-[100%] flex justify-center mt-[20px]">
            <img src={logo} alt="logo" />
            {/* <h2 class=" text-xl font-medium  text-black">Inventory</h2> */}
          </div>
          <div className="h-[70%]  w-[100%] flex flex-col gap-5  mt-9">
            <div
              className="hover:bg-[#062a2781]  h-[30%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/home")}
              style={
                currentPath.includes("/home")
                  ? { backgroundColor: "#062a2781", color: "#062A27" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md   cursor-pointer">
                <IoQrCodeSharp className="text-[#062A27] text-xl ml-2 " />
                <p className="ml-[10px] text-[14px] font-[500]">QR</p>
              </div>
            </div>

            <div
              className="hover:bg-[#062a2781] hover:text-[#062A27] h-[30%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/addTag")}
              style={
                currentPath.includes("/addTag")
                  ? { backgroundColor: "#062a2781", color: "#062A27" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md  hover:text-[#062A27] cursor-pointer">
                <MdOutlinePlaylistAdd className="text-[#062A27] text-2xl ml-2 " />
                <p className="ml-[5px] text-[14px] font-[500]">Add QR</p>
              </div>
            </div>

            <div
              className="hover:bg-[#062a2781] hover:text-[#062A27] h-[30%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/generate")}
              style={
                currentPath.includes("/generate")
                  ? { backgroundColor: "#062a2781", color: "#062A27" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md   cursor-pointer">
                <RiFileExcel2Fill className="text-[#062A27] text-xl ml-2 " />
                <p className="ml-[10px] text-[14px] font-[500]">Generate QR</p>
              </div>
            </div>

            <div
              className="hover:bg-[#062a2781] hover:text-[#062A27] h-[30%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/import")}
              style={
                currentPath.includes("/import")
                  ? { backgroundColor: "#062a2781", color: "#062A27" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md  hover:text-[#062A27] cursor-pointer">
                <FaFileImport className="text-[#062A27] text-xl ml-2 " />
                <p className="ml-[10px] text-[14px] font-[500]">Import QR</p>
              </div>
            </div>

            <div
              className="hover:bg-[#062a2781] hover:text-[#062A27] h-[30%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/changepass")}
              style={
                currentPath.includes("/changepass")
                  ? { backgroundColor: "#062a2781", color: "#062A27" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md  hover:text-[#062A27] cursor-pointer">
                <FaKey className="text-[#062A27] text-xl ml-2 " />
                <p className="ml-[10px] text-[14px] font-[500]">
                  Change Password
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[10%]  w-[90%] flex flex-col justify-between">
          <div className="h-[20%]  w-[100%] flex items-center rounded-md cursor-pointer ml-2">
            <BiHelpCircle className="text-gray-500 text-xl " />
            <p className="ml-[10px] text-base text-gray-500">Help</p>
          </div>
          <div
            className="h-[20%]  w-[100%] flex items-center rounded-md cursor-pointer ml-2"
            onClick={() => logOut()}
          >
            <LuLogOut className="text-gray-500 text-xl " />
            <p className="ml-[10px] text-base text-gray-500">Logout</p>
          </div>
        </div>
      </div>
      {/* <LogoutModal
        modal={modal}
        handleModal={handleModal}
        logoutFunc={logOut}
      /> */}
    </div>
  );
};

export default Sidebar;
