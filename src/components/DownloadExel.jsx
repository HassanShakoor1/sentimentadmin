import React from "react";
import { CSVLink } from "react-csv";

const DownloadExcel = ({ Data }) => {
  let baseUrl = import.meta.env.VITE_PROFILE_URL;
  console.log(Data);
  const csvData = Data.map((item) => {
    return {
      QR_Id: item?.tagId,
      QR: baseUrl + "qr/" + item?.tagId,
      Status: item?.status ? "Active" : "In-Active",
      User_Id: item?.userid,
      QR_URL: baseUrl + "viewprofile/" + item?.tagId,
    };
  });
  return (
    <CSVLink
      data={csvData}
      filename={`Sentiments-QR.csv`}
      style={{ textDecoration: "none", color: "white" }}
      className="text-white"
    >
      Export
    </CSVLink>
  );
};

export default DownloadExcel;
