import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FormDataForSignUp, LoginInBody } from "../../components/Login";

interface User {
	email: string;
	password: string;
	avatar?: {
		url: string;
		public_id?: string;
	};
}

interface userState {
	user: User | null;
	loading: boolean;
	isAuthenticated: boolean;
	error?: string | null;
}

const initialState: userState = {
	user: null,
	loading: false,
	isAuthenticated: false,
	error: null,
};

const authReducer = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginRequest: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action: PayloadAction<User>) => {
			state.loading = false;
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		loginError: (state, action: PayloadAction<any>) => {
			state.loading = false;
			state.user = null;
			state.error = action.payload;
		},
		loadUserRequest: (state) => {
			state.loading = true;
			state.isAuthenticated = false;
		},
		loadUserSuccess: (state, action: PayloadAction<LoginInBody>) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		loadUserFail: (state) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = null;
		},
		registerRequest: (state) => {
			state.loading = true;
		},
		registerSuccess: (state, action: PayloadAction<any>) => {
			state.loading = false;
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		registerFail: (state, action: PayloadAction<any>) => {
			state.loading = false;
			state.error = action.payload;
		},
		logOutUserRequest: (state) => {
			state.loading = true;
		},
		logOutUserSuccess: (state) => {
			state.loading = false;
			state.user = null;
			state.isAuthenticated = false;
		},
		logOutFail: (state, action: PayloadAction<any>) => {
			state.error = action.payload;
			state.loading = false;
		},
		clearUserErrors: (state) => {
			state.error = null;
		},
	},
});

export const {
	loginRequest,
	loginSuccess,
	loginError,
	loadUserRequest,
	loadUserSuccess,
	loadUserFail,
	logOutUserRequest,
	logOutUserSuccess,
	logOutFail,
	registerRequest,
	registerSuccess,
	registerFail,
	clearUserErrors,
} = authReducer.actions;

export default authReducer.reducer;

export type { User, userState };
