// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface User {
//   email: string;
//   password: string;
// }

// interface UserState {
//   users: User[];
// }

// const initialState: UserState = {
//   users: [],
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     addUser: (state, action: PayloadAction<User>) => {
//       state.users.push(action.payload);
//     },
//   },
// });

// export const { addUser } = userSlice.actions;

// export default userSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@types";


interface UserState {
  users: User[];
  isLoggedIn: boolean;
}

const initialState: UserState = {
  users: [],
  isLoggedIn: localStorage.getItem("user") ? true : false,
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
      localStorage.removeItem("user");
    },
  },
});

export const { addUser, loginUser } = userSlice.actions;

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