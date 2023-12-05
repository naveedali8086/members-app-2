import React from "react";
import { memo } from "react";
import { TableCell } from "@mui/material";
const Tablerow = ({ row, index }) => {
  return (
    <>
      <TableCell align="inherit">{index + 1}</TableCell>
      <TableCell style={{ color: "blue", cursor: "pointer" }} align="inherit">
        {row.username}
      </TableCell>
      <TableCell align="inherit">{row.name}</TableCell>
      <TableCell align="inherit">{row.email}</TableCell>
      <TableCell align="inherit">{row.phone}</TableCell>
      <TableCell align="inherit">{row.website}</TableCell>
    </>
  );
};

export default memo(Tablerow);
