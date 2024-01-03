import React from "react";
import {
  limitToFirst,
  onValue,
  push,
  query,
  ref,
  remove,
  startAfter,
  update,
} from "firebase/database";
import { db } from "../Firebase";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../components/Sidebar";
import Tooltip from "@mui/material/Tooltip";
import AddProductModal from "../components/AddProductModal";
import DellModal from "../components/DellModal";
import DownloadExcel from "../components/DownloadExel";
import Papa from "papaparse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUserModal from "../components/AddUserModal";

const Users = () => {
  let [mylist, setmylist] = useState([]);
  let [csvFile, setCsvFile] = useState(null);
  const [lastRecordKey, setLastRecordKey] = useState(null);
  let uploadBulk = (value) => {
    Papa.parse(value, {
      header: true,
      complete: (result) => {
        // result.data contains the array of objects
        let theCsvData = result.data;
        theCsvData?.map((elm) => {
          var pushkey = push(ref(db, `Records/`), elm).key;
          update(ref(db, `Records/${pushkey}`), { id: pushkey })
            .then(() => {
              // console.log("submited");
              toast?.success("Submited successfuly");
            })
            .catch((err) => {
              console.log(err);
            });
        });

        // setData(result.data);
      },
    });
  };
  useEffect(() => {
    let getingdata = async () => {
      const starCountRef = ref(db, "/User");
      //   const starCountRef = query(ref(db, "/Records"), limitToFirst(1000));
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        //  console.log(data)
        MediaKeyStatusMap;
        setmylist(Object.values(data));

        setfiltered(Object.values(data));

        // onValue(starCountRef1, async (snapshot) => {
        //   const alldata = await snapshot.val();
        //   //  console.log(data)
        //   MediaKeyStatusMap;
        //   setmylist(Object.values(alldata));

        //   setfiltered(Object.values(alldata));

        //   // updateStarCount(postElement, data);
        // });

        // updateStarCount(postElement, data);
      });
    };

    getingdata();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const db = getDatabase();
  //     const recordsRef = ref(db, '/Records');

  //     let query = limitToFirst(100);

  //     if (lastRecordKey) {
  //       query = startAfter(lastRecordKey);
  //     }

  //     onValue(query, (snapshot) => {
  //       const data = snapshot.val();

  //       if (data) {
  //         const records = Object.values(data);
  //         setMyList((prevList) => [...prevList, ...records]);
  //         setFiltered((prevFiltered) => [...prevFiltered, ...records]);

  //         // If there are more records, update lastRecordKey for the next batch
  //         const lastRecord = records[records.length - 1];
  //         if (lastRecord) {
  //           setLastRecordKey(lastRecord.key);
  //         }
  //       }
  //     });
  //   };

  //   fetchData();
  // }, [lastRecordKey]);

  let [DelModal, setDelModal] = useState(false);

  let handleDelModal = () => {
    setDelModal(!DelModal);
  };

  let [delid, setdelid] = useState();

  const handleDelete = () => {
    remove(ref(db, `/Records/${delid}`)).then(() => {
      toast?.success("Data deleted successfuly");
    });
    setdelid("");
  };

  let [isEdit, setisedit] = useState(false);

  // console.log(mylist);

  let [DataForm, setDataForm] = useState(false);
  let [isaddEdit, setisaddEdit] = useState(false);
  let handleDataForm = () => {
    setDataForm(!DataForm);
  };
  let [isuserEdit, setisuserEdit] = useState(false);
  const columns = [
    // {
    //   name: "Sr",
    //   selector: (_, index) => index + 1,
    //   sortable: false,
    //   width: "60px",
    // },
    {
      name: "name",
      selector: (row) => {
        return (
          <Tooltip
            title={row.name}
            className="cursor-pointer"
            placement="bottom-start"
          >
            {row.name}
          </Tooltip>
        );
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => {
        return row.email;
      },
      sortable: true,
      width: "200px",
    },

    {
      name: "Role",
      selector: (row) => {
        return row.role;
      },
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex ">
          <button
            className="h-[40px] w-[70px] border bg-[#35A1CC] rounded-md text-white mr-2"
            onClick={() => {
              handleaddForm(), setData(row), setisuserEdit(true);
            }}
          >
            Edit
          </button>{" "}
          <button
            className="h-[40px] w-[70px] border bg-[#f44336] rounded-md text-white"
            onClick={() => {
              return handleDelModal(), setdelid(row.id);
            }}
          >
            Delete
          </button>
        </div>
      ),
      width: "175px",
    },

    // {
    //   name: "Category 3",
    //   selector: (row) => {
    //     return row.category_3;
    //   },
    //   sortable: true,
    // },
    // {
    //   name: "price",
    //   selector: (row) => {
    //     return row.price;
    //   },
    //   sortable: true,
    //   width: "150px",
    // },
    // {
    //   name: "sku",
    //   selector: (row) => {
    //     return row.sku;
    //   },
    //   sortable: true,
    // },
    // {
    //   name: "Description",
    //   selector: (row) => {
    //     return (
    //       <Tooltip
    //         title={row.item_description}
    //         className="cursor-pointer"
    //         placement="bottom-start"
    //       >
    //         {row.item_description}
    //       </Tooltip>
    //     );
    //   },
    //   width: "150px",
    //   sortable: true,
    // },
    // {
    //   name: "Address",
    //   selector: (row) => {
    //     return (
    //       <Tooltip
    //         title={row.location}
    //         className="cursor-pointer"
    //         placement="bottom-start"
    //       >
    //         {row.location}
    //       </Tooltip>
    //     );
    //   },
    //   sortable: true,
    // },
    // {
    //   name: "Vendor",
    //   selector: (row) => {
    //     return (
    //       <Tooltip
    //         title={row.vendor}
    //         className="cursor-pointer"
    //         placement="bottom-start"
    //       >
    //         {row.vendor}
    //       </Tooltip>
    //     );
    //   },
    //   sortable: true,
    // },
    // {
    //   name: "Image 1",
    //   selector: (row) => {
    //     return (
    //       <>
    //         {" "}
    //         <div className="h-[65px] w-[65px] flex justify-center items-center">
    //           <img
    //             src={row?.pic_1 ? row?.pic_1 : "https://placehold.co/58x58"}
    //             alt=""
    //             className="h-[60px] w-[60px] rounded-lg"
    //           />
    //         </div>
    //       </>
    //     );
    //   },
    //   sortable: true,
    //   width: "150px",
    // },
    // {
    //   name: "Image 2",
    //   selector: (row) => {
    //     return (
    //       <>
    //         {" "}
    //         <div className="h-[65px] w-[65px] flex justify-center items-center">
    //           <img
    //             src={row?.pic_2 ? row?.pic_2 : "https://placehold.co/58x58"}
    //             alt=""
    //             className="h-[60px] w-[60px] rounded-lg"
    //           />
    //         </div>
    //       </>
    //     );
    //   },
    //   sortable: true,
    //   width: "150px",
    // },
    // {
    //   name: "Image 3",
    //   selector: (row) => {
    //     return (
    //       <>
    //         {" "}
    //         <div className="h-[65px] w-[65px] flex justify-center items-center">
    //           <img
    //             src={row?.pic_3 ? row?.pic_3 : "https://placehold.co/58x58"}
    //             alt=""
    //             className="h-[60px] w-[60px] rounded-lg"
    //           />
    //         </div>
    //       </>
    //     );
    //   },
    //   sortable: true,
    //   width: "150px",
    // },
    // {
    //   name: "stock",
    //   selector: (row) => {
    //     return row.stock;
    //   },
    //   sortable: true,
    //   width: "150px",
    // },
  ];
  const [search, setsearch] = useState("");
  const [filtered, setfiltered] = useState([]);
  //----------------------Filtering the userdata (search functionality)--------------------

  useEffect(() => {
    const result = mylist.filter((user) => {
      return user.name?.toLowerCase().match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);

  let [addForm, setaddForm] = useState(false);
  let handleaddForm = () => {
    setaddForm(!addForm);
  };

  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const conditionalRowStyles = [
    {
      when: (row) => row.role === "admin",
      style: {
        display: "none",
      },
    },
  ];

  return (
    <div className="w-[100%] flex max-h-[100vh] ">
      <Sidebar />
      <div className="w-[85%] h-[100vh] overflow-y-scroll">
        <AddUserModal
          handleaddForm={handleaddForm}
          addForm={addForm}
          data={data}
          setData={setData}
          isuserEdit={isuserEdit}
        />
        <DellModal
          handleDelModal={handleDelModal}
          DelModal={DelModal}
          handleDelete={handleDelete}
        />
        <div className="   ml-[45px] mt-[60px] relative ">
          {/* <Widgets /> */}
          {/* <h2 className='text-xl font-[500]] mb-[20px]'>{`All users[${mylist.length}]`}</h2> */}
          <div className="border w-[95%] overflow-x-scroll">
            <DataTable
              columns={columns}
              data={filtered}
              style={{ width: "1200px" }}
              wrapperStyle={{ backgroundColor: "#DAECF3" }}
              pagination
              fixedHeader
              subHeader
              conditionalRowStyles={conditionalRowStyles}
              subHeaderComponent={
                <div className=" h-[70px] mt-3 w-[100%]  flex justify-between items-center">
                  {/* <h2 className="text-xl  font-[450]">Search</h2>{" "} */}
                  <input
                    type="search"
                    placeholder="Search here"
                    className=" h-[25px] w-[310px] border-b-[1px]   p-1 outline-none placeholder:text-sm"
                    value={search}
                    onChange={(e) => {
                      setsearch(e.target.value);
                    }}
                  />{" "}
                  <div className="w-[35%]  h-[70px] flex items-center justify-end ">
                    <div
                      className="w-[25%] h-[40px]  flex justify-center items-center text-white hover:bg-[#b2d9ee] bg-[#0b567f] rounded-lg cursor-pointer"
                      onClick={() => {
                        handleaddForm(), setisuserEdit(false);
                      }}
                    >
                      Add
                    </div>
                    {/* <label htmlFor="fileSelect" className="w-[35%] h-[40px]">
                      <input
                        id="fileSelect"
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        className="opacity-0"
                        style={{ display: "none" }}
                        onChange={(e) => uploadBulk(e.target.files[0])}
                      />
                      <div className="w-[100%] h-[100%]  flex justify-center items-center text-white hover:bg-[#b2d9ee] bg-[#0b567f] rounded-lg cursor-pointer">
                        Bulk Upload
                      </div>
                    </label> */}

                    {/* <div className="w-[25%] h-[40px]  flex justify-center items-center text-white hover:bg-[#b2d9ee] bg-[#0b567f] rounded-lg cursor-pointer">
                      <DownloadExcel Data={filtered} />
                    </div> */}
                  </div>
                </div>
              }
              subHeaderAlign="left"
            />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Users;
