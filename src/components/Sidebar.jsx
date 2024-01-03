import React, { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { BsBox2Fill } from "react-icons/bs";
import logo from "../img/logo.png";
import { FaKey } from "react-icons/fa6";

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
      res(localStorage.removeItem("inventoryKey"));
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
        <div className="h-[70%]  w-[90%] flex flex-col">
          <div className="h-[15%]  w-[100%] flex items-center ">
            <img src={logo} alt="logo" className="h-[40px] w-[40px]" />
            <h2 class=" text-xl font-medium  text-black">Inventory</h2>
          </div>
          <div className="h-[30%]  w-[100%] flex flex-col justify-evenly  mt-5">
            {/* {user?.isAdmin && ( */}
            {/* <div
              style={user?.isAdmin === true ? { display: "none" } : null}
              className="h-[100%]  w-[100%]"
            > */}
            {/* <div
              className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[12%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/dashboard")}
              style={
                currentPath.includes("/dashboard")
                  ? { backgroundColor: "#b2d9ee" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                <MdDashboard className="text-[#0b567f] text-xl ml-2 " />
                <p className="ml-[10px] text-base ">Dashboard</p>
              </div>
            </div> */}
            {/* </div> */}
            {/* )} */}
            <div
              className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[30%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/home")}
              style={
                currentPath.includes("/home")
                  ? { backgroundColor: "#b2d9ee" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                <BsBox2Fill className="text-[#0b567f] text-xl ml-2 " />
                <p className="ml-[10px] text-[14px] font-[500]">Products</p>
              </div>
            </div>

            {therole === "admin" ? (
              <div
                className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[30%]  w-[100%] rounded-md flex items-center"
                onClick={() => navigate("/allusers")}
                style={
                  currentPath.includes("/allusers")
                    ? { backgroundColor: "#b2d9ee" }
                    : null
                }
              >
                <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                  <BsFillPeopleFill className="text-[#0b567f] text-xl ml-2 " />
                  <p className="ml-[10px] text-[14px] font-[500]">Users</p>
                </div>
              </div>
            ) : null}
            <div
              className="hover:bg-[#b2d9ee] hover:text-[#0b567f] h-[30%]  w-[100%] rounded-md flex items-center"
              onClick={() => navigate("/changepass")}
              style={
                currentPath.includes("/changepass")
                  ? { backgroundColor: "#b2d9ee" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md hover:bg-[#b2d9ee] hover:text-[#0b567f] cursor-pointer">
                <FaKey className="text-[#0b567f] text-xl ml-2 " />
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
