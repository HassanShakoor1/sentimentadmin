import React from "react";
import { CSVLink } from "react-csv";

const DownloadExcel = ({ Data }) => {
  console.log(Data);
  const csvData = Data.map((item) => {
    return {
      Tag_Id: item?.tagId,
      QR:
        "https://66785ce602ce93d7a99beecf--frolicking-mousse-188e81.netlify.app/qr/" +
        item?.tagId,
      Status: item?.Status,
      User_Name: item?.userName,
    };
  });
  return (
    <CSVLink
      data={csvData}
      filename={`products.csv`}
      style={{ textDecoration: "none", color: "white" }}
      className="text-white"
    >
      Export
    </CSVLink>
  );
};

export default DownloadExcel;
