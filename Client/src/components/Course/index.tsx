import { type FC } from "react";
import CourseCard from "../CourseCard";
import { assets, dummyCourses } from "../../assets/assets";

const Course: FC = () => {
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
				{[...Array(4)].map((_, index) => (
					<CourseCard
						key={index}
						imageSrc={assets.course_1_thumbnail}
						courseTitle={"Dummy Course Title " + (index + 1)}
						authorName={"Saksham"}
						ratings={5}
						coursePrice={100}
					/>
				))}
			</div>
		</div>
	);
};

export default Course;
