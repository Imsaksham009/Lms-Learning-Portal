import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the course interface
interface Course {
	_id: string;
	title: string;
	description: string;
	price: number;
	slug: string;
	instructorId: Record<string, any>;
}

// Define the state interface
interface CoursesListState {
	courses: Course[];
	loading: boolean;
	error?: string | null;
}

const initialState: CoursesListState = {
	courses: [],
	loading: false,
};

const coursesListReducer = createSlice({
	name: "coursesList",
	initialState,
	reducers: {
		allCoursesRequest: (state) => {
			state.loading = true;
			state.courses = [];
		},
		allCoursesSuccess: (state, action: PayloadAction<Course[]>) => {
			state.loading = false;
			state.courses = action.payload;
		},
		allCoursesError: (state, action: PayloadAction<any>) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearState: (state) => {
			state.loading = false;
			state.error = null;
		},
	},
});

export const {
	allCoursesRequest,
	allCoursesSuccess,
	allCoursesError,
	clearState,
} = coursesListReducer.actions;
export default coursesListReducer.reducer;

// Export type for use in components and other parts of the app
export type { CoursesListState, Course };
