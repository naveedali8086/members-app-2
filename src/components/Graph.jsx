import React, { useState, useEffect } from 'react';
import { startOfDay, endOfDay, eachDayOfInterval, startOfWeek, endOfWeek, addWeeks, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { axiosInstance } from "../utils/Constants";
import { Button, useMediaQuery, useTheme, } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom"
import { Usecontext } from "../Context/Context";

import 'react-datepicker/dist/react-datepicker.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      display:"none",
    },
    title: {
      display: true,
      text: 'PeakStrength',
    },
  },

};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Reps Steps Comparison',
    },
  },
};

const Graph = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonSize = isSmallScreen ? "small" : "large";
  const navigate = useNavigate()
  const { isAuthenticated } = Usecontext();
  const { memberid } = useParams();
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const currentWeekStartDate = startOfWeek(currentDate);
  const currentWeekEndDate = endOfWeek(currentDate);
  const lastWeekStartDate = startOfWeek(addWeeks(currentDate, -1));
  const lastWeekEndDate = endOfWeek(addWeeks(currentDate, -1));
  const [startDate, setStartDate] = useState(startOfMonth);
  const [endDate, setEndDate] = useState(endOfMonth);
  const [strength, setStrength] = useState([])

  // const formattedDays = (startDate, endDate) => {
  //   const daysInInterval = eachDayOfInterval({ start: startDate, end: endDate });
  //   return daysInInterval.map((date) => format(date, 'MMM d'));
  // };
  const data1 = {
    labels: strength.map((ele) => format(new Date(ele.date), 'MMM d')),
    datasets: [
      {
        fill: true,
        label: 'PeakStrength',
        data: strength.map((ele) => ele.peakstrength),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const labels = ['Current Week', 'Last Week'];
  const [chartData, setChartData] = useState(data1);
  const [repsSteps, setRepsSteps] = useState([200, 300]);
  const data2 = {
    labels,
    datasets: [
      {
        data: repsSteps,
        backgroundColor: ['rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',],
        borderColor: ['rgb(255, 99, 132, 1)',
          'rgb(54, 162, 235, 1)',],
        borderWidth: 1,
      },
    ],
  };

  const Sorting = (array) => {
    let sorrtedArry = [];
    let obj = {};
    for (let i = 0; i < array.length; i++) {
      for (let j in array[i]) {
        let value = array[i][j];
        let resultedValue = Object.values(value);
        let result;
        if (resultedValue.length === 1) {
          result = resultedValue[0];
        }
        obj[j] = result;
      }
      sorrtedArry[i] = obj;
      obj = {};
    }
    return sorrtedArry;
  };
  const formatDateForURL = (date) => {
    return format(date, 'yyyy-MM-dd');
  };
  const getStats = async () => {
    const startDateFormatted = await formatDateForURL(startDate);
    const endDateFormatted = await formatDateForURL(endDate);
    console.log(`${startDateFormatted} ${endDateFormatted}`);
    try {

      const res = await axiosInstance.get(`/my-stats/?memberid=1234&startDate=${startDateFormatted}&endDate=${endDateFormatted}`)
      console.log(res);
      const Sort = Sorting(res.data.Items)
      setStrength(Sort)
      const updatedChartData = {
        labels: Sort.map((ele) => format(new Date(ele.date), 'MMM d')),
        datasets: [
          {
            fill: true,
            label: 'PeakStrength',
            data: Sort.map((ele) => ele.peakstrength),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      setChartData(updatedChartData);
    }
    catch (err) {

    }
  }

  const getTotalRepsSteps = async (startDate, endDate) => {
    const startDateFormatted = formatDateForURL(startDate);
    const endDateFormatted = formatDateForURL(endDate);

    try {
      const res = await axiosInstance.get(`/my-stats/?memberid=1234&startDate=${startDateFormatted}&endDate=${endDateFormatted}`);
      console.log(res);
      if (res.data?.Items?.length > 0) {
        const totalRepsSteps = res.data.Items.reduce((total, item) => total + item.reps_steps, 0);
        setRepsSteps((prevData) => [...prevData, totalRepsSteps]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const Steps = () => {
    getTotalRepsSteps(currentWeekStartDate, currentWeekEndDate);
    getTotalRepsSteps(lastWeekStartDate, lastWeekEndDate);
  }


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account")
    }
    getStats()
    Steps()

  }, [])


  const fetchData = () => {
    getStats()
  };


  console.log(strength);
  return (

    <div className="min-h-[100vh]  bg-gray-100">
      <header className="px-2 py-2 bg-[#223A5E] flex items-center justify-between">
        <Button
          size={buttonSize}
          variant="contained"
          onClick={() => navigate(`/detail/${memberid}`)}
          style={{ backgroundColor: "#ffffff", color: "#000000" }}
          startIcon={<ArrowBackIosIcon style={{ color: "#24FDF7" }} />}
        >
          Back To Detail
        </Button>
      </header>
      <div className='flex flex-col sm:flex-row  justify-end items-center p-2'>
        <div className='pb-2 sm:pb-0'>
          <DatePicker
            className=' outline-line border-2 border-2 solid'
            selected={startDate} onChange={(date) => setStartDate(startOfDay(date))} />
          <DatePicker className=' outline-line border-2 border-2 solid mr-2' selected={endDate} onChange={(date) => setEndDate(endOfDay(date))} />
        </div>

        <Button
          size={buttonSize}
          variant="outlined"
          onClick={fetchData}>Fetch Data
        </Button>
      </div>


      <div className='grid grid-cols-1 grid-rows-4  sm:grid-cols-4 sm:grid-rows-3 bg-white gap-x-4 sm:px-2'>

        <div className='text-3xl row-span-1 border-gray-300 border-4 rounded bg-white'>
          <header className="bg-[#162235] p-2 lg:p-4 text-lg font-bold text-white">
            Person
          </header>
          <p>100</p>
        </div>

        <div className=' row-span-1  sm:col-span-3 sm:row-span-3 border-gray-300 border-4 rounded bg-white'>
          <header className="bg-[#162235]  p-2 lg:p-4 text-lg font-bold text-white">
            Person
          </header>
          <Line options={options} data={chartData} />

        </div>

        <div className='mt-4 row-span-2  border-gray-300 border-4 rounded bg-white'>
          <header className="bg-[#162235]  p-2 lg:p-4 text-lg font-bold text-white">
            Person
          </header>
          <Pie options={options2} data={data2} />
        </div>

      </div>
    </div>
  );
};

export default Graph;
