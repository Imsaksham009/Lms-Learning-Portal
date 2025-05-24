import axios, { type AxiosResponse } from "axios";
import type { AppDispatch } from "../../store/store";
import {
	allCoursesError,
	allCoursesRequest,
	allCoursesSuccess,
	type Course,
} from "./coursesListReducer";

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
	} catch (error) {
		console.error("Error fetching courses list:", error);
		dispatch(allCoursesError(error));
	}
};
