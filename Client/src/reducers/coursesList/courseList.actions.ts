import axios, { type AxiosResponse } from "axios";
import type { AppDispatch } from "../../store/store";
import {
	allCoursesError,
	allCoursesRequest,
	allCoursesSuccess,
	clearState,
	type Course,
} from "./coursesList.reducer";

interface CoursesApiResponse {
	success: boolean;
	courses: Course[];
}
export const getAllCoursesList = async (dispatch: AppDispatch) => {
	try {
		dispatch(allCoursesRequest());
		const response: AxiosResponse<CoursesApiResponse> = await axios.get(
			"/api/v1/course/list"
		);
		dispatch(allCoursesSuccess(response.data.courses));
	} catch (error: any) {
		console.error("Error fetching courses list:", error);
		dispatch(allCoursesError(error.response.data.message));
	}
};

export const clearCourseStateAfterErrors = (dispatch: AppDispatch) => {
	dispatch(clearState());
};
