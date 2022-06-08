import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../features/users/usersSlice";

const EditRow = ({ handleCancelClick, row, setUserId }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.users);
  const currentUser = users.filter((user) => user.id === row.id);
  const { name, email, role } = currentUser[0];
  const [formData, setFormData] = useState({
    name,
    email,
    role,
  });

  const handleFormChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      id: row.id,
      [name]: value,
    });
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell sx={{ padding: "0px" }}>
        <Checkbox />
      </TableCell>
      <TableCell>
        <input
          name="name"
          required="required"
          type="text"
          placeholder="Name..."
          autocomplete="off"
          value={formData.name}
          onChange={handleFormChange}
        />
      </TableCell>
      <TableCell>
        <input
          name="email"
          required="required"
          type="text"
          placeholder="abc@mailinator.com"
          autocomplete="off"
          value={formData.email}
          onChange={handleFormChange}
        />
      </TableCell>
      <TableCell>
        <input
          name="role"
          required="required"
          type="text"
          placeholder="Role..."
          autocomplete="off"
          value={formData.role}
          onChange={handleFormChange}
        />
      </TableCell>
      <TableCell>
        <button
          onClick={() => {
            dispatch(editUser(formData));
            setUserId(null);
          }}
          style={{
            backgroundColor: "#646fd4",
            color: "white",
            border: "none",
            padding: "5px",
            borderRadius: "2px",
          }}
        >
          Save
        </button>
        <button
          onClick={handleCancelClick}
          style={{
            backgroundColor: "#646fd4",
            color: "white",
            border: "none",
            marginLeft: "15px",
            padding: "5px",
            borderRadius: "2px",
          }}
        >
          Cancel
        </button>
      </TableCell>
    </TableRow>
  );
};

export default EditRow;
