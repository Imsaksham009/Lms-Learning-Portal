import { useEffect, type FC } from "react";
import CourseCard from "../CourseCard";
import { assets } from "../../assets/assets";
import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesList } from "../../reducers/coursesList/courseListActions";
import type {
	Course,
	CoursesListState,
} from "../../reducers/coursesList/coursesListReducer";

const Course: FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const courseList = useSelector(
		(state: RootState) => state.coursesListReducer
	);
	const { courses, loading, error }: CoursesListState = courseList;
	console.log("Courses List: ", courses);
	console.log("Loading: ", loading);
	console.log("Error: ", error);
	useEffect(() => {
		getAllCoursesList(dispatch);
	}, [dispatch]);

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
				{courses.map((course) => (
					<CourseCard
						key={course._id}
						imageSrc={assets.course_1_thumbnail}
						courseTitle={course.title}
						authorName={course.instructorId.name}
						ratings={5}
						coursePrice={course.price}
					/>
				))}
			</div>
		</div>
	);
};

export default Course;
