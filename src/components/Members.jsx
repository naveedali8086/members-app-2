import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Loader";
import PopUp from "./Popup";
import { DataGrid } from "@mui/x-data-grid";
import { v4 } from "uuid";
import { Usecontext } from "../Context/Context";

import {
  Box,
  Button,
  Paper,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { axiosInstance } from "../utils/Constants";

const Members = () => {
  const { isAuthenticated } = Usecontext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account");
    }
  }, []);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonSize = isSmallScreen ? "small" : "large";
  const [userList, setUserList] = useState([]);
  const [userFilteredList, setUserFilteredList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [editableMember, setEditableMember] = useState({});
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
  const getMembers = useCallback(async () => {
    try {
      setIsloading(true);
      const res = await axiosInstance.get("/get-accounts");
      const sort = await Sorting(res.data.Items);
      setUserList(sort);
      setUserFilteredList([...sort]);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    getMembers();
  }, []);
  const handleCustomAction = (params) => {
    const id = params.row.memberid;
    const editMember = userList.filter((member) => member.id === id);
    if (editMember.length > 0) {
      setEditableMember(editMember[0]);
      setEditPopUp(true);
      setShowPopUp(true);
    }
  };

  const columns = [
    {
      field: "edit", // Field name for the custom column
      headerName: "Edit",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleCustomAction(params)}
          >
            Edit
          </Button>
        </div>
      ),
    },
    {
      field: "picture",
      headerName: "",
      sortable: false,
      width: 50,
      renderCell: (params) => (
          <img
              src={params.row.picture || `${window.location.origin}/blankmale.jpg`}
              alt="User"
              style={{ width: 40, borderRadius: "50%" }}
          />
      ),
    },
    { field: "memberid", headerName: "No", width: 30 },
    { field: "date_joined", headerName: "Joined on", width: 130 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
          <span style={{ color: "#2667ad", cursor: "pointer" }}>
          {params.row.name}
        </span>
      ),
    },
    { field: "org", headerName: "Org.", width: 170 },
    { field: "address", headerName: "Location", width: 170 },
    { field: "member_type", headerName: "Type", width: 130 },
    { field: "wol_value", headerName: "WOL Value", width: 130 },
    { field: "expiry", headerName: "Expiry", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
  ];

  const handleCellClick = (params) => {
    if (params.field === "name") {
      const clickedRowData = params.row.memberid;
      navigate(`/detail/${clickedRowData}`);
    } else if (params.field === "edit") {
      setEditableMember(params.row)
      setEditPopUp(true)
      setShowPopUp(true)
    }
  };

  const handleSearch = (e) => {
    const searchInput = e.target.value.toLowerCase();
    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const results = userList.filter((obj) =>
        obj.name.split(" ").join("").toLowerCase().includes(searchInput)
      );
      setUserFilteredList(results);
    }, 500);
  };

  return (
      <>
        <main className="min-h-[100vh]  bg-gray-100 ">
          <header className="bg-[#223A5E] p-2">
            <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
            >
              <Button
                  size={buttonSize}
                  onClick={() => setShowPopUp(true)}
                  variant="contained"
                  style={{ backgroundColor: "#24FDF7", color: "#000000" }}
              >
                Add Member
              </Button>

            </Box>
          </header>
          {isLoading ? (
              <span className=" h-[100vh] flex justify-center items-center">
            <Spinner />
          </span>
          ) : error ? (
              <p>{error}</p>
          ) : (
              <div
                  className={`
             
             w-[100%]  p-2  `}
              >
                <Box pb="10px">
                  <TextField
                      name="name"
                      variant="outlined"
                      label="Search"
                      type="text"
                      color="primary"
                      onChange={handleSearch}
                  />
                </Box>
                <Paper
                    sx={{
                      width: "100%",
                    }}
                >
                  <DataGrid
                      className='border-gray-300 border-4 rounded'
                      rows={userFilteredList}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      onCellClick={handleCellClick}
                  />
                </Paper>
              </div>
          )}
        </main>
        <div
            className={` ${showPopUp ? "" : "hidden"
            } fixed top-0 w-[100%] h-[100%] bg-[#00001352] flex z-50`}
        >
          <PopUp setShowPopUp={setShowPopUp} showPopUp={showPopUp} getmembers={getMembers} editPopUp={editPopUp} setEditPopUp={setEditPopUp} editableMember={editableMember} />
        </div>
      </>
  );
};

export default Members;
