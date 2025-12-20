import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
  role: string;
  token?: string;
}

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: { name: "", email: "", role: "admin", token: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearAuth: (state) => {
      state.user = { name: "", email: "", role: "", token: "" };
    },
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;

// // services/authApi.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setInfo } from "../slices/authSlice";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   tagTypes: ["Auth"],

//   endpoints: (builder) => ({
//     getUser: builder.query<{ name: string; email: string; role: string }, void>({
//       query: () => "/me",
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           // ✅ When query succeeds, update the auth info in your slice
//           dispatch(
//             setInfo({
//               email: data.email,
//               otp: "",
//             })
//           );
//           // You could also dispatch another reducer to store name/role if needed
//         } catch {
//           // handle error
//         }
//       },
//     }),
//   }),
// });

// export const { useGetUserQuery } = authApi;
