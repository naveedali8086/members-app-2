import React, { useState, useEffect } from "react";
import {
  startOfDay,
  endOfDay,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addWeeks,
  format,
} from "date-fns";
import DatePicker from "react-datepicker";
import { axiosInstance } from "../utils/Constants";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import { Usecontext } from "../Context/Context";

import "react-datepicker/dist/react-datepicker.css";
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
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

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
      position: "bottom",
      display: "none",
    },
    title: {
      display: true,
      text: 'Weekly Progress',
    },
  },
};

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: 'This Week vs Last Week',
    },
  },
};

const Graph = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonSize = isSmallScreen ? "small" : "large";
  const navigate = useNavigate();
  const { isAuthenticated } = Usecontext();
  const { memberid } = useParams();
  const currentDate = new Date();
  const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
  );
  const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
  );
  const currentWeekStartDate = startOfWeek(currentDate);
  const currentWeekEndDate = endOfWeek(currentDate);
  const lastWeekStartDate = startOfWeek(addWeeks(currentDate, -1));
  const lastWeekEndDate = endOfWeek(addWeeks(currentDate, -1));
  const [startDate, setStartDate] = useState(startOfMonth);
  const [endDate, setEndDate] = useState(endOfMonth);
  const [strength, setStrength] = useState([]);
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState("");


  const formattedDays = (startDate, endDate, data) => {
    const daysInInterval = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
    // console.log(daysInInterval);
    const dataDates = data.map((ele) => new Date(ele.date));
    
    const uniqueDatesSet = new Set(daysInInterval.map(date => format(date, "yyyy/MM/dd")));
  
    for (const date of dataDates) {
      uniqueDatesSet.add(format(date, "yyyy/MM/dd"));
    }
  
    return Array.from(uniqueDatesSet);
  };
  
  const labels = ["Current Week", "Last Week"];
  const [repsSteps, setRepsSteps] = useState([]);
  const [trainDays, setTrainDays] = useState(0);
  const data2 = {
    labels,
    datasets: [
      {
        data: repsSteps,
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderColor: ["rgb(255, 99, 132, 1)", "rgb(54, 162, 235, 1)"],
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
    return format(date, "yyyy-MM-dd");
  };
  const getStats = async () => {
    const startDateFormatted = await formatDateForURL(startDate);
    const endDateFormatted = await formatDateForURL(endDate);
    // console.log(`${startDateFormatted} ${endDateFormatted}`);
    try {
      const res = await axiosInstance.get(
          `/my-stats/?memberid=${memberid}&startDate=${startDateFormatted}&endDate=${endDateFormatted}`
      );
      const Sort = Sorting(res.data.Items);
      console.log("peakstrength",res.data.Items);
      setStrength(Sort);
         console.log(formattedDays(startDate, endDate, Sort));
      const updatedChartData = {
        
        labels: formattedDays && formattedDays(startDate, endDate, Sort),
        datasets: [
          {
            fill: true,
            label: "PeakStrength",
            data:
                formattedDays &&
                formattedDays(startDate, endDate, Sort).map((formattedDate) => {
                  const matchingData = Sort.find(
                      (ele) => format(new Date(ele.date),  "yyyy/MM/dd") === formattedDate
                  );
                  return matchingData ? matchingData.peakstrength : null;
                }),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };

      setChartData(updatedChartData);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const getTotalRepsSteps = async (startDate, endDate, isCurrentWeek) => {
    const startDateFormatted = formatDateForURL(startDate);
    const endDateFormatted = formatDateForURL(endDate);

    try {
      console.log( `${startDateFormatted} - ${endDateFormatted}`);
      const res = await axiosInstance.get(
          `/my-stats/?memberid=${memberid}&startDate=${startDateFormatted}&endDate=${endDateFormatted}`
      );
      // console.log("steps",res);
      if (res.data?.Items?.length > 0) {
        const totalRepsSteps = res.data.Items.reduce(
            (total, item) => total + item.reps_steps,
            0
        );
        const daysOfTraining = res.data.Items.reduce(
            (total, item) => total + item.didtrain,
            0
        );
        setRepsSteps((prevData) => [...prevData, totalRepsSteps]);
        if (isCurrentWeek) {
          setTrainDays(daysOfTraining);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const Steps = () => {
    // console.log(`${currentWeekStartDate} - ${currentWeekEndDate}`);
    getTotalRepsSteps(currentWeekStartDate, currentWeekEndDate, true);
    getTotalRepsSteps(lastWeekStartDate, lastWeekEndDate, false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account");
    }
    getStats();
    Steps();
  }, []);

  const fetchData = () => {
    getStats();
  };

  // console.log(strength);
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
        { error ? (
            <p>{error.message}</p>
        ) : (
            <div>
              <div className="flex flex-col sm:flex-row  justify-end items-center p-2">
                <div className="pb-2 flex sm:pb-0">
                  <DatePicker
                      className=" outline-line border-2 border-2 solid"
                      selected={startDate}
                      onChange={(date) => setStartDate(startOfDay(date))}
                      dateFormat="dd/MM/yyyy"
                  />
                  <DatePicker
                      className=" outline-line border-2 border-2 solid mr-2"
                      selected={endDate}
                      onChange={(date) => setEndDate(endOfDay(date))}
                      dateFormat="dd/MM/yyyy"
                  />
                </div>

                <Button size={buttonSize} variant="outlined" onClick={fetchData}>
                  Fetch Data
                </Button>
              </div>

              <div className="grid grid-cols-1 grid-rows-4  sm:grid-cols-4 sm:grid-rows-3 bg-white  gap-x-4 sm:px-2">
                <div className=" row-span-1 border-gray-300 border-4 rounded bg-white flex flex-col">
                  <header className="bg-[#162235] p-2 lg:p-4 text-lg font-bold text-white">
                    Days Worked Out
                  </header>
                  <p className="flex-1 text-8xl sm:text-4xl lg:text-8xl flex items-center justify-center">
                    {trainDays}
                  </p>
                </div>

                <div className=" row-span-1  sm:col-span-3 sm:row-span-3 border-gray-300 border-4 rounded bg-white">
                  <header className="bg-[#162235]  p-2 lg:p-4 text-lg font-bold text-white">
                    Weekly Progress
                  </header>
                  {strength.length > 0 ? (
                      <Line options={options} data={chartData} />
                  ) : (
                      <p>No Data found</p>
                  )}
                </div>

                <div className="sm:mt-4 row-span-2  border-gray-300 border-4 rounded bg-white">
                  <header className="bg-[#162235]  p-2 lg:p-4 text-lg font-bold text-white">
                    This Week vs Last Week
                  </header>
                  {repsSteps.length > 0 ? (
                      <Pie options={options2} data={data2} />
                  ) : (
                      <p>No Data Found</p>
                  )}
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Graph;
