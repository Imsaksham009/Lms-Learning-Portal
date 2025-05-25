import { type FC } from "react";
import { Link } from "react-router-dom";
interface CourseCardProps {
	// Define the props for the CourseCard component here
	imageSrc: string;
	courseTitle: string;
	authorName: string;
	ratings?: number;
	coursePrice: number;
	linkToCourse: string;
}
const CourseCard: FC<CourseCardProps> = ({
	imageSrc,
	courseTitle,
	authorName,
	ratings,
	coursePrice,
	linkToCourse,
}) => {
	return (
		<Link
			to={`/course/${linkToCourse}`}
			className="border border-gray-500/40 shadow-md pb-6 overflow-hidden rounded-lg hover:shadow-lg duration-300 ease-in-out hover:scale-105 transition-transform hover:cursor-pointer hover:border-purple-500"
		>
			<img className="w-full rounded-lg" src={imageSrc} alt="course" />
			<div className="text-left p-3">
				<h3 className="text-base font-semibold">{courseTitle}</h3>
				<p className="text-gray-500">{authorName}</p>
				<p>{ratings}</p>
				<p className="text-base font-semibold text-gray-800">₹ {coursePrice}</p>
			</div>
		</Link>
	);
};

export default CourseCard;
