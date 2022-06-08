import { useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { removeUser } from "../../features/users/usersSlice";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ReadOnlyRow = ({ row, handleEditClick, handleCheckedClick }) => {
  const dispatch = useDispatch();
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell sx={{ padding: "0px" }}>
        <Checkbox
          onChange={() => {
            handleCheckedClick(row.id);
          }}
        />
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.role}</TableCell>
      <TableCell className="action">
        <button
          style={{
            backgroundColor: "white",
            border: "none",
          }}
          type="button"
          onClick={(event) => handleEditClick(event, row)}
        >
          <BorderColorOutlinedIcon />
        </button>
        <DeleteOutlineOutlinedIcon
          onClick={() => dispatch(removeUser(row.id))}
          style={{ marginLeft: "20px", color: "tomato" }}
        />
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;
