import React, {useEffect, useState} from "react";
import Spinner from "./Loader";
import Tablerow from "./TableRow";
import PopUp from "./Popup";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {axiosInstance} from "../utils/Constants";

const Users = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonSize = isSmallScreen ? "small" : "large";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const getUsers = async () => {
    setIsloading(true);
    try {
      const res = await axiosInstance.get("/get-accounts");
      setUserList(res.data);
      setIsloading(false);
    } catch (err) {
      setError(err.message);
      setIsloading(false);
      console.error(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };
  return (
    <>
      <main className="min-h-[100vh] p-2 sm:p-4 container mx-auto  bg-gray-100 ">
        {isLoading ? (
          <span className=" h-[100vh] flex justify-center items-center">
            <Spinner />
          </span>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div
            className={`
             
             w-[100%]  `}
          >
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
              >
                Add Member
              </Button>
              <Button size={buttonSize} variant="contained">
                Generate
              </Button>
            </Box>
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
                overflowX: isSmallScreen ? "scroll" : "auto",
              }}
            >
              <TableContainer sx={{ maxHeight: "auto", minWidth: "768px" }}>
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
                          return (
                            <TableRow hover key={row.id}>
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
              />
            </Paper>
          </div>
        )}
      </main>
      <div
        className={` ${showPopUp ? "block" : "hidden"
          } top-10 fixed w-[100%] h-[100%] bg-[#00001352] z-40 `}
        onClick={() => setShowPopUp(!showPopUp)}
      >
        <PopUp />
      </div>
    </>
  );
};

export default Users;
