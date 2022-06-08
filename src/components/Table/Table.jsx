import "./table.scss";
import EditRow from "../Rows/EditRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import ReadOnlyRow from "../Rows/ReadOnlyRow";
import Checkbox from "@mui/material/Checkbox";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Fragment, useState } from "react";
import TableContainer from "@mui/material/TableContainer";

export const TableList = ({ users, isChecked, handleCheckedClick }) => {
  const [userId, setUserId] = useState(null);

  const handleEditClick = (event, row) => {
    event.preventDefault();
    setUserId(Number(row.id));
  };

  const handleCancelClick = () => {
    setUserId(null);
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className="heading">
            <TableCell sx={{ paddingLeft: "0px" }}>
              <Checkbox />
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <Fragment key={row.id}>
              {userId === Number(row.id) ? (
                <EditRow
                  row={row}
                  setUserId={setUserId}
                  handleCancelClick={handleCancelClick}
                />
              ) : (
                <ReadOnlyRow
                  row={row}
                  isChecked={isChecked}
                  handleEditClick={handleEditClick}
                  handleCheckedClick={handleCheckedClick}
                />
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
