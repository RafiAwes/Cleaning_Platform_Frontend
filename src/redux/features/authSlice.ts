import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  token?: string;
  email_verified_at?: string | null;
}

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: { name: "", email: "", role: "", token: "", email_verified_at: null },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = { name: "", email: "", role: "", token: "", email_verified_at: null };
      state.isAuthenticated = false;
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
