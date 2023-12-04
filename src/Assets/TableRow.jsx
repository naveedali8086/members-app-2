import React from "react";
import { memo } from "react";
import { TableCell } from "@mui/material";
const Tablerow = ({row , index}) => {
  return (
    <>
      <TableCell align="">{index + 1}</TableCell>
      <TableCell style={{ color: "blue", cursor: "pointer" }} align="">
        {row.username}
      </TableCell>
      <TableCell align="">{row.name}</TableCell>
      <TableCell align="">
       {row.email}
      </TableCell>
      <TableCell align="">
       {row.phone}
      </TableCell>
      <TableCell align="">
       {row.website}
      </TableCell>
    </>
  );
};

export default memo(Tablerow);
