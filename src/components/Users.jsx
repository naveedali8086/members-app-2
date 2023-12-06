import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom"
import Spinner from "./Loader";
import PopUp from "./Popup";
import { DataGrid } from "@mui/x-data-grid";
import { v4 } from "uuid";
import { Usecontext } from "../Context/Context";

import {
  Box,
  Button,
  Paper,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TablePagination,
  // TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { axiosInstance } from "../utils/Constants";

const Users = () => {
  const { isAuthenticated } = Usecontext();
  const navigate = useNavigate()

  useEffect(()=>{
   if(!isAuthenticated){
       navigate("/account")
   }

  },[])
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonSize = isSmallScreen ? "small" : "large";
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
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

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsloading(true);
        const res = await axiosInstance.get("/get-accounts");
        const sort = await Sorting(res.data.Items);
        setUserList(sort);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsloading(false);
      }
    };
    getUsers();
  }, []);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  // const handleChangeRowsPerPage = (event) => {
  //   const newRowsPerPage = parseInt(event.target.value, 10);
  //   setRowsPerPage(newRowsPerPage);
  //   setPage(0);
  // };
  const columns = [
    {
      field: "picture",
      headerName: "Image",
      sortable: false,
      width: 50,
      renderCell: (params) => (
        <img
          src={params.row.picture || ""}
          alt="User"
          style={{ width: 40, borderRadius: "50%" }}
        />
      ),
    },
    { field: "memberid", headerName: "No", width: 70 },
    { field: "date_joined", headerName: "Date Joined", width: 150 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
        <span style={{ color: "#2667ad" }}>{params.row.name}</span>
      ),
    },
    { field: "org", headerName: "Org.", width: 170 },
    { field: "address", headerName: "Location", width: 170 },
    { field: "member_type", headerName: "Type", width: 130 },
    { field: "wol_value", headerName: "Woil Value", width: 130 },
    { field: " ", headerName: "Expiry", width: 150 },
    { field: "active", headerName: "Status", width: 100 },
  ];

 
  const handleCellClick = (params) => {
    if (params.field === "name") {
      const clickedRowData = params.row.memberid;
      navigate(`/detail/${clickedRowData}`)
    }
  };
  return (
    <>
      <main className="min-h-[100vh]  bg-gray-100 ">
        <header className="bg-black px-2">
          <Box
            p="10px 0px"
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
              style={{ backgroundColor: "#27FDF5", color: "#000000" }}
            >
              Add Member
            </Button>
            <Button size={buttonSize} variant="contained">
              Generate
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
              />
            </Box>
            <Paper
              sx={{
                width: "100%",
                // overflowX: isSmallScreen ? "scroll" : "auto",
              }}
            >
              <DataGrid
                rows={userList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onCellClick={handleCellClick}
              />
              {/* <TableContainer sx={{ maxHeight: "auto", minWidth: "768px" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="inherit" colSpan={1}>
                        Sr
                      </TableCell>
                      <TableCell align="inherit" colSpan={1}>
                        User Name
                      </TableCell>
                      <TableCell align="inherit" colSpan={1}>
                        Name
                      </TableCell>
                      <TableCell align="inherit" colSpan={1}>
                        Email
                      </TableCell>
                      <TableCell align="inherit" colSpan={1}>
                        Phone
                      </TableCell>
                      <TableCell align="inherit" colSpan={1}>
                        Website
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList?.length > 0
                      ? userList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, i) => {
                          // console.log(row)
                          return (
                           
                            <TableRow hover key={row.memberid.S}>
                              <Tablerow row={row} index={i} />
                            </TableRow>
                          );
                        })
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 25]}
                component="div"
                count={userList?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
            </Paper>
          </div>
        )}
      </main>
      <div
        className={` ${
          showPopUp ? "block" : "hidden"
        } top-10 fixed w-[100%] h-[100%] bg-[#00001352] z-40 `}
       
      >
        <PopUp setShowPopUp={setShowPopUp} showPopUp={showPopUp} />
      </div>
    </>
  );
};

export default Users;
