import React from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
const Widgets = ({ tags }) => {
  const allusers = tags.length;

  console.log(allusers);

  const activeusersarray = tags.filter((elm) => {
    return elm.status === true;
  });

  const activeUsers = activeusersarray.length;

  const notActiveUsersArray = tags.filter((elm) => {
    return elm.status === false;
  });

  const notActiveUsers = notActiveUsersArray.length;

  // ---------------------------Chart Js--------------------------------------------

  ChartJs.register(ArcElement, Tooltip);

  const data1 = {
    datasets: [
      {
        label: "Total profiles",
        data: [allusers],
        backgroundColor: ["#062A27"],
      },
    ],
  };

  const data2 = {
    labels: ["Total Profiles", "Active profiles"],
    datasets: [
      {
        data: [allusers, activeUsers],
        backgroundColor: ["#062A27", "#00c867"],
      },
    ],
  };

  const data3 = {
    labels: ["Total Profiles", "Inactive profiles"],
    datasets: [
      {
        data: [allusers, notActiveUsers],
        backgroundColor: ["#062A27", "red"],
      },
    ],
  };

  return (
    <div className=" w-max h-max">
      {/* <h2 className='text-2xl font-[500] ml-[50px] mt-6'>Overview</h2> */}
      <div className="flex justify-around flex-wrap mt-6 w-[1000px] h-[180px] ">
        <div className="h-[150px] w-[240px]   rounded-lg bg-[#ffffff]  shadow-md border">
          <p className="font-[450] mt-2 ml-[10px] text-xl">All Profiles</p>
          <div className="flex justify-around w-[190px] h-[70px] ">
            <div className="h-[75px]  w-[75px] mt-1">
              <Doughnut data={data1}></Doughnut>
            </div>
            <div>
              <h2 className="text-4xl mt-5">{allusers}</h2>
              <p>Profiles</p>
            </div>
          </div>
        </div>
        {/* <div className='h-[120px] w-[210px]  border rounded-lg bg-[#DAECF3] flex justify-center items-center flex-col'>
          <h2 className='text-5xl'>0</h2>
          <p>Blocked users</p>
        </div> */}

        <div className="h-[150px] w-[240px]   rounded-lg bg-[#ffffff]  shadow-md border">
          <p className="font-[450] mt-2 ml-[10px] text-xl">Active Profiles</p>
          <div className="flex justify-around w-[190px] h-[70px] ">
            <div className="h-[75px]  w-[75px] mt-1">
              <Doughnut data={data2}></Doughnut>
            </div>
            <div>
              <h2 className="text-4xl mt-5">{activeUsers}</h2>
              <p>Profiles</p>
            </div>
          </div>
        </div>

        <div className="h-[150px] w-[240px]   rounded-lg bg-[#ffffff]  shadow-md border">
          <p className="font-[450] mt-2 ml-[10px] text-xl">Inactive Profiles</p>
          <div className="flex justify-around w-[190px] h-[70px] ">
            <div className="h-[75px]  w-[75px] mt-1">
              <Doughnut data={data3}></Doughnut>
            </div>
            <div>
              <h2 className="text-4xl mt-5">{notActiveUsers}</h2>
              <p>Profiles</p>
            </div>
          </div>
        </div>

        {/* <div className='h-[120px] w-[210px]  border rounded-lg bg-[#DAECF3] flex justify-center items-center flex-col'>
          <h2 className='text-5xl'>{activeUsers}</h2>
          <p>Active users</p>
        </div>
        <div className='h-[120px] w-[210px]  border rounded-lg bg-[#DAECF3] flex justify-center items-center flex-col'>
          <h2 className='text-5xl'>{notActiveUsers}</h2>
          <p>Inactive users</p>
        </div> */}
      </div>
    </div>
  );
};

export default Widgets;
