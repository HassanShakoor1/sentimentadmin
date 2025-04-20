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
import Widgets from "../components/widgets";
// import { QRCode } from "react-qrcode-logo";
import { LuDownload } from "react-icons/lu";
import QRCode from "qrcode";

const Home = () => {
  const qrValue = import.meta.env.VITE_PROFILE_URL;
  let [mylist, setmylist] = useState([]);
  const [userTag, setUserTag] = useState(null);
  useEffect(() => {
    let getingdata = async () => {
      const starCountRef1 = ref(db, "/Tags");
      const starCountRef = query(ref(db, "/Tags"), limitToFirst(1000));
      onValue(starCountRef, async (snapshot) => {
        const data = await snapshot.val();
        console.log(data);
        console.log("testing data");
        MediaKeyStatusMap;
        setmylist(Object.values(data));

        setfiltered(Object.values(data));

        onValue(starCountRef1, async (snapshot) => {
          const alldata = await snapshot.val();
          //  console.log(data)
          MediaKeyStatusMap;
          setmylist(Object.values(alldata));

          setfiltered(Object.values(alldata));

          // updateStarCount(postElement, data);
        });

        // updateStarCount(postElement, data);
      });
    };

    getingdata();
  }, []);

  // useEffect(() => {
  //   if (userTag && userTag != null) {
  //     <div>
  //       <QRCode
  //         id="download-qr"
  //         value={qrValue + "viewprofile/" + userTag}
  //         size={150}
  //       />
  //     </div>;
  //     const canvas = document.getElementById("download-qr");
  //     if (canvas) {
  //       const pngUrl = canvas
  //         .toDataURL("image/png")
  //         .replace("image/png", "image/octet-stream");
  //       let downloadLink = document.createElement("a");
  //       downloadLink.href = pngUrl;
  //       downloadLink.download = `QR_Code.png`;
  //       document.body.appendChild(downloadLink);
  //       downloadLink.click();
  //       document.body.removeChild(downloadLink);
  //       setUserTag(null);
  //     }
  //   }
  // }, [userTag]);

  const downloadQr = async (tag) => {
    if (tag) {
      const qrValue2 = `${qrValue}viewprofile/${tag}`;
      try {
        const canvas = document.createElement("canvas");
        await QRCode.toCanvas(canvas, qrValue2, { width: 150 });
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QR_Code.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } catch (err) {
        console.error(err);
      }
    }
  };

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
    remove(ref(db, `/Tags/${delid}`)).then(() => {
      toast?.success("Data deleted successfuly");
    });
    setdelid("");
  };

  // console.log(mylist);

  let [formData, setFormData] = useState({
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

  let [DataForm, setDataForm] = useState(false);

  let handleDataForm = () => {
    setDataForm(!DataForm);
  };
  let therole = localStorage.getItem("inventoryrole");
  const columns = [
    {
      name: "Sr",
      selector: (_, index) => index + 1,
      sortable: false,
    },
    {
      name: "QR Id",
      selector: (row) => {
        return row.tagId;
      },
      sortable: true,
    },
    {
      name: "User-Id",
      selector: (row) => {
        return row.userid;
      },
      width: "200px",
    },

    {
      name: "QR-code",
      cell: (row) => (
        <div className="flex">
          <button
            className="h-[40px] w-[100px] border bg-[#062A27] rounded-md text-white flex gap-1 justify-center items-center  "
            onClick={() => {
              downloadQr(row?.tagId);
            }}
          >
            Download
            <LuDownload />
          </button>
        </div>
      ),

      sortable: true,
    },

    {
      name: "Status",
      cell: (row) => (
        <div className="flex ">
          {row.status ? (
            <button
              className="h-[40px] w-[70px] border bg-green-500 rounded-md text-white "
              onClick={() => {}}
            >
              Active
            </button>
          ) : (
            <button className="h-[40px] w-[70px] border bg-[#f44336] rounded-md text-white cursor-default">
              In Active
            </button>
          )}
        </div>
      ),

      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex ">
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
  ];
  const [search, setsearch] = useState("");
  const [filtered, setfiltered] = useState([]);
  //----------------------Filtering the userdata (search functionality)--------------------

  useEffect(() => {
    const result = mylist.filter((user) => {
      return user.tagId?.toLowerCase().match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);

  return (
    <div className="w-[100%] flex max-h-[100vh] ">
      <Sidebar />
      <div className="w-[85%] h-[100vh] overflow-y-scroll">
        <DellModal
          handleDelModal={handleDelModal}
          DelModal={DelModal}
          handleDelete={handleDelete}
        />
        <div className="   ml-[45px] mt-[60px] relative ">
          {/* <Widgets /> */}
          {/* <h2 className='text-xl font-[500]] mb-[20px]'>{`All users[${mylist.length}]`}</h2> */}
          <Widgets tags={mylist} />
          <div className="border w-[95%] overflow-x-scroll">
            <DataTable
              columns={columns}
              data={filtered}
              style={{ width: "1200px" }}
              wrapperStyle={{ backgroundColor: "#DAECF3" }}
              pagination
              fixedHeader
              subHeader
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
                  <div className="w-[35%]  h-[70px] flex items-center justify-end">
                    <div className="w-[25%] h-[40px]  flex justify-center items-center text-white bg-[#062A27] rounded-lg cursor-pointer">
                      <DownloadExcel Data={filtered} />
                    </div>
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

export default Home;
