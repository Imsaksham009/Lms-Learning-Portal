import type { AxiosResponse } from "axios";
import axios from "axios";
import type { LoginInBody } from "../../components/Login";
import type { AppDispatch } from "../../store/store";
import {
	clearUserErrors,
	loadUserFail,
	loadUserRequest,
	loadUserSuccess,
	loginError,
	loginRequest,
	loginSuccess,
	logOutFail,
	logOutUserRequest,
	logOutUserSuccess,
	registerFail,
	registerRequest,
	registerSuccess,
} from "./auth.reducer";

export const userLogin = async (
	dispatch: AppDispatch,
	credentials: LoginInBody
) => {
	try {
		dispatch(loginRequest());
		const res: AxiosResponse = await axios.post(
			"/api/v1/user/login",
			credentials
		);
		dispatch(loginSuccess(res.data.user));
	} catch (error: any) {
		console.error("login error: ", error);
		dispatch(loginError(error.response.data.message));
	}
};

export const loadUser = async (dispatch: AppDispatch) => {
	try {
		dispatch(loadUserRequest());
		const res: AxiosResponse = await axios.get("/api/v1/user/me");
		dispatch(loadUserSuccess(res.data.user));
	} catch (error) {
		console.error("login error: ", error);
		dispatch(loadUserFail());
	}
};

export const logOutUser = async (dispatch: AppDispatch) => {
	try {
		dispatch(logOutUserRequest());
		await axios.post("/api/v1/user/logout");
		dispatch(logOutUserSuccess());
	} catch (error: any) {
		console.error("login error: ", error);
		dispatch(logOutFail(error.response.data.message));
	}
};

export const registerUser = async (
	dispatch: AppDispatch,
	signUpData: FormData
) => {
	try {
		dispatch(registerRequest());
		const res = await axios.post("/api/v1/user/register", signUpData);
		dispatch(registerSuccess(signUpData));
	} catch (error: any) {
		console.error("login error: ", error);
		dispatch(registerFail(error.response.data.message));
	}
};

export const clearAuthError = (dispatch: AppDispatch) => {
	dispatch(clearUserErrors());
};
