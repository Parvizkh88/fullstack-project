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
import { User} from "@types";
import { loginService } from "services/userService";

interface UserState {
  users: User[];
  isLoggedIn: boolean;
}

const initialState: UserState = {
  users: [],
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    checkUser: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (user) => user.email === email && user.password === password
      );
      state.isLoggedIn = !!user;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginService.fulfilled, (state, action) => {
     
    });
    builder.addCase(loginService.rejected, (state, action) => {
      // Handle the rejected case
    });
    builder.addCase(loginService.pending, (state, action) => {
      // Handle the pending case
    });
  },

});

export const { addUser, checkUser } = userSlice.actions;

export default userSlice.reducer;
