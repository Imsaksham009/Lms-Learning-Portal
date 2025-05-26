import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CourseDetail {
	ratings: {
		average: number;
		count: number;
	};
	_id: string;
	title: string;
	description: string;
	thumbnail: string;
	level: string;
	instructorId: {
		name: string;
	};
	price: number;
	duration: number;
	tags: string[];
	category: string;
	sections: any[];
	enrolledStudents: number;
}

interface CourseState {
	loading: boolean;
	courseDetail: CourseDetail | null;
	error?: string | null;
}
const initialState: CourseState = {
	loading: false,
	courseDetail: null,
	error: null,
};

const courseDetailReducer = createSlice({
	name: "courseDetail",
	initialState,
	reducers: {
		courseDetailRequest: (state) => {
			state.loading = true;
		},
		courseDetailSuccess: (state, action: PayloadAction<CourseDetail>) => {
			state.loading = false;
			state.courseDetail = action.payload;
		},
		courseDetailFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearCourseDetailError: (state) => {
			state.loading = false;
			state.error = null;
		},
	},
});

export const {
	courseDetailRequest,
	courseDetailSuccess,
	courseDetailFail,
	clearCourseDetailError,
} = courseDetailReducer.actions;

export default courseDetailReducer.reducer;

export type { CourseDetail, CourseState };
