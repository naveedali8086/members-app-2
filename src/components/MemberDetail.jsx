import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/Constants";
import { Usecontext } from "../Context/Context";
import { Button, Menu, MenuItem, useMediaQuery, useTheme, Paper, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Spinner from "./Loader";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { v4 } from "uuid"
import { DataGrid } from "@mui/x-data-grid";
import { format, addMonths, addYears } from "date-fns";

const MemberDetail = () => {

  const [startDate, setStartDate] = useState("")
  const { isAuthenticated } = Usecontext();
  const navigate = useNavigate();
  const billingAddressTextareaRef = useRef(null);
  const [user, setUser] = useState({});
  const [userStats, setUserStats] = useState([])
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const { memberid } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Last 3 Months")
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonSize = isSmallScreen ? "small" : "large";

  const adjustTextareaHeight = (textareaRef) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const content = textarea.value;
      const formattedContent = content.replace(/, /g, "\n");
      textarea.value = formattedContent;
      const wordsPerRow = 3;
      const wordCount = formattedContent.split(/\s+/).length;
      const rowCount = Math.ceil(wordCount / wordsPerRow);
      textarea.rows = rowCount;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account");
    }
    const getMemberDetails = async () => {
      try {
        setIsloading(true);
        const res = await axiosInstance.get(`/get-list/?memberid=${memberid}`);
        setUser(res.data.Item);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsloading(false);
      }
    };
    getMemberDetails();
  }, [isAuthenticated, memberid, navigate]);
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
      obj.id = v4();
      sorrtedArry[i] = obj;
      obj = {};
    }
    return sorrtedArry;
  };

  const dates = () => {
    const now = new Date();

    if (selectedMenuItem === "Last 3 Months") {
      const monthsAgoDate = format(addMonths(now, -3), "yyyy-MM-dd");
      setStartDate(monthsAgoDate)
    }
    else if (selectedMenuItem === "Last 1 year") {
      const yearsAgoDate = format(addYears(now, -1), "yyyy-MM-dd");
      setStartDate(yearsAgoDate)
    }
    else if (selectedMenuItem === "Last 2 years") {
      const yearsAgoDate = format(addYears(now, -2), "yyyy-MM-dd");
      setStartDate(yearsAgoDate)
    }
  }
  useEffect(() => {
    dates();
  }, [selectedMenuItem]);

  useEffect(() => {
    const getMemberStats = async () => {
      try {
        console.log("inside", startDate);
        const todayDate = format(new Date(), "yyyy-MM-dd")
        const res = await axiosInstance.get(`/my-stats/?memberid=1234&startDate=${startDate}&endDate=${todayDate}`)
        // console.log(res);
        if (res.data?.Items?.length > 0) {
          const Sort = Sorting(res.data.Items)
          setUserStats(Sort)
        }
      }
      catch (error) {
        console.error(error);
        setError(error.message);
      }
      finally { }
    }

    getMemberStats()
  }, [user, startDate])

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "memberid", headerName: "No", width: 130 },
    { field: "peakstrength", headerName: "Peak Strength", width: 130 },
    { field: "reps_steps", headerName: "Reps/Steps", width: 150 },
    { field: "workout_name", headerName: "WorkOut Name", width: 170 },
    { field: "didtrain", headerName: "DidTrain", width: 170 },
  ];
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <main className="min-h-[100vh]  bg-gray-100">
      <header className="px-2 py-2 bg-[#223A5E] flex items-center justify-between">
        <Button
          size={buttonSize}
          variant="contained"
          onClick={() => navigate("/members")}
          style={{ backgroundColor: "#ffffff", color: "#000000" }}
          startIcon={<ArrowBackIosIcon style={{ color: "#24FDF7" }} />}
        >
          Back To People
        </Button>
        <div>
          <p className="font-bold text-xl italic text-white  inline-block pr-2" >{user?.status?.S}</p>
          <Button size={buttonSize}

            variant="contained"
            onClick={() => navigate(`/graph/${memberid}`)}
            style={{ backgroundColor: "#ffffff", color: "#000000", display: "inline-block" }}
            endIcon={<ArrowForwardIosIcon style={{ color: "#24FDF7" }} />}
          >
            Graph
          </Button>

        </div>
      </header>
      {isLoading ? (
        <span className=" h-[100vh] flex justify-center items-center">
          <Spinner />
        </span>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="overflow-x-hidden mt-8">
          <div className="px-2 md:grid  md:grid-cols-4   sm:gap-8 ">
            <aside className="border-gray-300 border-4 rounded bg-white">
              <header className="bg-[#162235] p-4 text-lg font-bold text-white">
                Person
              </header>
              <div className="p-4 grid grid-cols-2 md:grid-cols-1 gap-y-2">
                <div>
                  <p className="font-bold">Name</p>
                  <input
                    className="w-[100%] block border-none outline-none text-xs sm:text-base "
                    type="text"
                    name=""
                    id=""
                    value={user?.name?.S}
                    readOnly
                  />
                </div>

                <div>
                  <p className="font-bold">Organization</p>
                  <input
                    className="w-[100%] block border-none outline-none  text-xs sm:text-base"
                    type="text"
                    name=""
                    id=""
                    value={user?.org?.S}
                    readOnly
                  />
                </div>


                <div>
                  <p className="font-bold">Type</p>
                  <input
                    className="w-[100%] block border-none outline-none  text-xs sm:text-base"
                    type="text"
                    name=""
                    id=""
                    value={user?.member_type?.S}
                    readOnly
                  />
                </div>

                <div>
                  <p className="font-bold">Joined Date</p>
                  <input
                    className="w-[100%] block border-none outline-none  text-xs sm:text-base"
                    type="text"
                    name=""
                    id=""
                    value={user?.date_joined?.S}
                    readOnly
                  />
                </div>

                <div>
                  <p className="font-bold">Expiry Date</p>
                  <input
                    className="w-[100%] block border-none outline-none  text-xs sm:text-base"
                    type="text"
                    name=""
                    id=""
                    value={user?.expiry?.S}
                    readOnly
                  />
                </div>

                <div>
                  <p className="font-bold">Address</p>
                  <textarea
                    className=" block border-none outline-none  text-xs sm:text-base"
                    name=""
                    id=""
                    readOnly
                    ref={billingAddressTextareaRef}
                    onChange={() =>
                      adjustTextareaHeight(billingAddressTextareaRef)
                    }
                    value={user?.address?.S}
                    style={{ resize: "none" }}
                  ></textarea>

                </div>

              </div>
            </aside>
            <article className="border-gray-300 border-4 rounded sm:col-span-3 bg-white">
              <header className="flex justify-between items-center p-4 text-lg font-bold border-b-2 border-[#BCC7CC] bg-gray-100 ">
                <h1>
                  Workout Quotes
                </h1>

                <Button
                  variant="outlined"
                  size={buttonSize}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                >
                  {selectedMenuItem}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {
                    selectedMenuItem !== "Last 1 year" && (
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          setSelectedMenuItem("Last 1 year")
                        }}
                      >
                        Last 1 year
                      </MenuItem>
                    )
                  }

                  {
                    selectedMenuItem !== "Last 2 years" && (
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          setSelectedMenuItem("Last 2 years")
                        }}
                      >
                        Last 2 years
                      </MenuItem>
                    )
                  }

                  {selectedMenuItem !== "Last 3 Months" && (
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setSelectedMenuItem("Last 3 Months");
                      }}
                    >
                      Last 3 Months
                    </MenuItem>
                  )}


                </Menu>
              </header>
              <Paper
                sx={{
                  width: "100%",
                }}
              >
                {
                  userStats.length > 0 ? <DataGrid
                    rows={userStats}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}

                  /> : <Typography variant="h1" gutterBottom>No Data found</Typography>
                }


              </Paper>
            </article>
          </div>
        </div>
      )}
    </main>
  );
};
export default MemberDetail;
