import React from "react";
import { CSVLink } from "react-csv";

const DownloadExcel = ({ Data }) => {
  console.log(Data);
  const csvData = Data.map((item) => {
    return {
      name: item.name,
      category_1: item.category_1,
      category_2: item.category_2,
      category_3: item.category_3,
      price: item.price,
      sku: item.sku,
      item_description: item?.item_description,
      location: item?.location,
      vendor: item?.vendor,
      stock: item?.stock,
      pic_1: item?.pic_1,
      pic_2: item?.pic_2,
      pic_3: item?.pic_3,
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
