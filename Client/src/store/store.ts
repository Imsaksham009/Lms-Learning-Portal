import { configureStore } from "@reduxjs/toolkit";
import coursesListReducer from "../reducers/coursesList/coursesList.reducer";
import authReducer from "../reducers/user/auth.reducer";
import courseDetailReducer from "../reducers/CourseDetail/courseDetail.reducer";
export const store = configureStore({
	reducer: {
		coursesListReducer,
		authReducer,
		courseDetailReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
