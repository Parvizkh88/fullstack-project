import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@types";


interface UserState {
  users: User[];
  isLoggedIn: boolean;
  isAdmin: boolean;
}
const checkRole = (): boolean => {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === 1) {
      return true;
    }
  }
  return false;
};

const initialState: UserState = {
  users: [],
  isLoggedIn: localStorage.getItem("user") ? true : false,
  isAdmin: checkRole(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      const userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(userInfo));
      state.users.push(userInfo);
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      localStorage.removeItem("user");
    },
  },
});

export const { addUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;


 // extraReducers: (builder) => {
  //   builder.addCase(loginService.fulfilled, (state, action) => {
  //     // Update the state with the user data
  //     state.isLoggedIn = true;
  //     const userInfo = action.payload;
  //     localStorage.setItem("user", JSON.stringify(userInfo));
  //     state.users.push(userInfo);
  //   });
  //   builder.addCase(loginService.rejected, (state, action) => {
  //     // Handle the rejected case
  //   });
  //   builder.addCase(loginService.pending, (state, action) => {
  //     // Handle the pending case
  //   });
  // },