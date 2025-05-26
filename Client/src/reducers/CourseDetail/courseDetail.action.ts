import axios, { type AxiosResponse } from "axios";
import type { AppDispatch } from "../../store/store";
import {
	courseDetailFail,
	courseDetailRequest,
	courseDetailSuccess,
} from "./courseDetail.reducer";

export const getCourseDetails = async (dispatch: AppDispatch, slug: string) => {
	try {
		dispatch(courseDetailRequest());
		const res: AxiosResponse = await axios.get(
			`/api/v1/course/details/slug/${slug}`
		);
		dispatch(courseDetailSuccess(res.data.course));
	} catch (error: any) {
		console.error("Course Detail error: ", error);
		dispatch(courseDetailFail(error.response.data.message));
	}
};
