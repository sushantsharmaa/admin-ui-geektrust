import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const initialState = {
  users: [],
  isLoading: true,
};

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  try {
    const res = await axios(url);
    return res.data;
  } catch (error) {
    return error;
  }
});

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUser: (state, action) => {
      const { id, name, email, role } = action.payload;
      const currentUser = state.users.find((user) => user.id === id);
      if (currentUser) {
        currentUser.name = name;
        currentUser.email = email;
        currentUser.role = role;
      }
    },
    removeUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((item) => item.id !== userId);
    },
    removeCheckedUser: (state, action) => {
      const checkedItem = action.payload;
      state.users = state.users.filter(
        (item) => !checkedItem.includes(item.id)
      );
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getUsers.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { editUser, removeUser, removeCheckedUser } = usersSlice.actions;

export default usersSlice.reducer;
