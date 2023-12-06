import React from "react";
import { memo } from "react";
import { TableCell, Checkbox } from "@mui/material";
const Tablerow = ({ row, index }) => {
  console.log(row);
  return (
    <>
      <TableCell align="inherit">
        <Checkbox />
      </TableCell>
      <TableCell width="20px" align="inherit"><img src={row.picture["S"]} alt="" /> </TableCell>
      <TableCell style={{ color: "blue", cursor: "pointer" }}> </TableCell>
      <TableCell align="inherit"> </TableCell>
      <TableCell align="inherit"> </TableCell>
      <TableCell align="inherit"> </TableCell>
      <TableCell align="inherit"> </TableCell>
    </>
  );
};

export default memo(Tablerow);
