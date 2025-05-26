import { useEffect, type FC } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import {
	clearCourseStateAfterErrors,
	getAllCoursesList,
} from "../../reducers/coursesList/courseList.actions";
import type {
	Course,
	CoursesListState,
} from "../../reducers/coursesList/coursesList.reducer";
import type { AppDispatch, RootState } from "../../store/store";
import CourseCard from "../CourseCard";

const Course: FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const courseList = useSelector(
		(state: RootState) => state.coursesListReducer
	);
	const { courses, loading, error }: CoursesListState = courseList;

	useEffect(() => {
		getAllCoursesList(dispatch);
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			clearCourseStateAfterErrors(dispatch);
		}
	}, [error, dispatch]);

	return (
		<div className="flex flex-col items-center justify-center text-center p-8 mt-20 mx-auto">
			<h1 className="text-4xl">Learn from the best</h1>
			<p className="text-gray-500/80 text-base mt-4">
				Discover our top-rated courses across various categories. From coding to
				design to business and wellness,
				<br /> our courses are drafted to deliver results.
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-0 md:py-16 gap-8 md:gap-4 mx-4 md:mx-10 lg:mx-20 mt-10 sm:mt-0">
				{/* CourseCard component should be imported and used here */}
				{loading ? (
					<div className="col-span-4 text-center">
						<img src={assets.loader} className="w-30" alt="loader" />{" "}
						{/* Loader while fetching courses https://tensor-svg-loaders.vercel.app/ */}
					</div>
				) : (
					<>
						{courses.map((course) => (
							<CourseCard
								key={course._id}
								imageSrc={course.thumbnail}
								courseTitle={course.title}
								authorName={course.instructorId?.name || "Unkown"}
								ratings={5}
								coursePrice={course.price}
								linkToCourse={course.slug}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default Course;
