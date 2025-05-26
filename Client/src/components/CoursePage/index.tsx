import { useEffect, useState, type FC } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { getCourseDetails } from "../../reducers/CourseDetail/courseDetail.action";

const CoursePage: FC = () => {
	const { slug } = useParams();
	console.log(slug);
	const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState<boolean>(false);
	const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>(
		{}
	);
	const [playerData, setPlayerData] = useState<{ videoId: string } | null>(
		null
	);

	// Dummy static data
	const courseData = {
		title: "Complete Web Development Bootcamp 2024",
		description:
			"Master modern web development with React, Node.js, MongoDB, and more. Build real-world projects and launch your career as a full-stack developer.",
		courseThumbnail:
			"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
		coursePrice: 199.99,
		discount: 70,
		rating: 4.8,
		enrolledStudents: 12543,
		educatorName: "John Smith",
		courseContent: [
			{
				chapterTitle: "Getting Started with Web Development",
				chapterContent: [
					{
						lectureTitle: "Introduction to Web Development",
						lectureUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
						lectureDuration: 15, // minutes
						isPreviewFree: true,
					},
					{
						lectureTitle: "Setting Up Development Environment",
						lectureUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
						lectureDuration: 25,
						isPreviewFree: false,
					},
					{
						lectureTitle: "HTML Fundamentals",
						lectureUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
						lectureDuration: 45,
						isPreviewFree: true,
					},
				],
			},
			{
				chapterTitle: "CSS and Responsive Design",
				chapterContent: [
					{
						lectureTitle: "CSS Basics and Selectors",
						lectureUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
						lectureDuration: 35,
						isPreviewFree: false,
					},
					{
						lectureTitle: "Flexbox and Grid Layout",
						lectureUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
						lectureDuration: 50,
						isPreviewFree: false,
					},
					{
						lectureTitle: "Responsive Design Principles",
						lectureUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
						lectureDuration: 40,
						isPreviewFree: true,
					},
				],
			},
			{
				chapterTitle: "JavaScript Programming",
				chapterContent: [
					{
						lectureTitle: "JavaScript Variables and Data Types",
						lectureUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
						lectureDuration: 30,
						isPreviewFree: false,
					},
					{
						lectureTitle: "Functions and Scope",
						lectureUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
						lectureDuration: 45,
						isPreviewFree: false,
					},
					{
						lectureTitle: "DOM Manipulation",
						lectureUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
						lectureDuration: 55,
						isPreviewFree: false,
					},
				],
			},
		],
		courseDescription: `
      <p>This comprehensive course covers everything you need to know to become a successful web developer.</p>
      <ul>
        <li>Learn HTML, CSS, and JavaScript from scratch</li>
        <li>Master React.js for building modern user interfaces</li>
        <li>Build backend APIs with Node.js and Express</li>
        <li>Work with databases using MongoDB</li>
        <li>Deploy your applications to the cloud</li>
      </ul>
    `,
	};
	const dispatch: AppDispatch = useDispatch();
	useEffect(() => {
		if (slug) getCourseDetails(dispatch, slug);
	}, [dispatch]);

	const currency = "$";

	// Helper functions with dummy implementations
	const toggleSection = (index: number) => {
		setOpenSections((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	const calculateChapterTime = (chapter: any) => {
		const totalMinutes = chapter.chapterContent.reduce(
			(sum: number, lecture: any) => sum + lecture.lectureDuration,
			0
		);
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
	};

	const calculateRating = () => courseData.rating;

	const calculateCourseDuration = () => {
		const totalMinutes = courseData.courseContent.reduce(
			(sum, chapter) =>
				sum +
				chapter.chapterContent.reduce(
					(chapterSum: number, lecture: any) =>
						chapterSum + lecture.lectureDuration,
					0
				),
			0
		);
		const hours = Math.floor(totalMinutes / 60);
		return `${hours}h ${totalMinutes % 60}m`;
	};

	const calculateNoOfLectures = () => {
		return courseData.courseContent.reduce(
			(sum, chapter) => sum + chapter.chapterContent.length,
			0
		);
	};

	const humanizeDuration = (ms: number, options: any) => {
		const minutes = Math.floor(ms / (1000 * 60));
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return hours > 0
			? `${hours}h ${remainingMinutes}m`
			: `${remainingMinutes}m`;
	};

	const enrollCourse = () => {
		setIsAlreadyEnrolled(true);
	};

	return (
		<>
			<div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left">
				<div className="absolute top-0 left-0 w-full h-96 -z-10 bg-gradient-to-b from-purple-200/70 via-blue-100/70 to-transparent"></div>

				<div className="max-w-xl z-10 text-gray-500">
					<h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
						{courseData.title}
					</h1>
					<p
						className="pt-4 md:text-base text-sm"
						dangerouslySetInnerHTML={{ __html: courseData.description }}
					></p>

					<div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
						<p>{courseData.rating}</p>
						<div className="flex">
							<span className="text-yellow-400">★★★★★</span>
						</div>
						<p className="text-blue-600">
							({courseData.enrolledStudents} ratings)
						</p>
						<p>{courseData.enrolledStudents} students</p>
					</div>

					<p className="text-sm">
						Course by{" "}
						<span className="text-blue-600 underline">
							{courseData.educatorName}
						</span>
					</p>

					<div className="pt-8 text-gray-800">
						<h2 className="text-xl font-semibold">Course Structure</h2>
						<div className="pt-5">
							{courseData.courseContent.map((chapter, index) => (
								<div
									key={index}
									className="border border-gray-300 bg-white mb-2 rounded"
								>
									<div
										className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
										onClick={() => toggleSection(index)}
									>
										<div className="flex items-center gap-2">
											<span
												className={`transform transition-transform ${
													openSections[index] ? "rotate-180" : ""
												}`}
											>
												▼
											</span>
											<p className="font-medium md:text-base text-sm">
												{chapter.chapterTitle}
											</p>
										</div>
										<p className="text-sm md:text-base">
											{chapter.chapterContent.length} lectures -{" "}
											{calculateChapterTime(chapter)}
										</p>
									</div>

									<div
										className={`overflow-hidden transition-all duration-300 ${
											openSections[index] ? "max-h-96" : "max-h-0"
										}`}
									>
										<ul className="list-none md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
											{chapter.chapterContent.map((lecture, i) => (
												<li key={i} className="flex items-start gap-2 py-1">
													<span className="text-blue-500 mt-1">▶</span>
													<div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-base">
														<p>{lecture.lectureTitle}</p>
														<div className="flex gap-2">
															{lecture.isPreviewFree && (
																<p
																	onClick={() =>
																		setPlayerData({
																			videoId:
																				lecture.lectureUrl.split("/").pop() ||
																				"dQw4w9WgXcQ",
																		})
																	}
																	className="text-blue-500 cursor-pointer"
																>
																	Preview
																</p>
															)}
															<p>
																{humanizeDuration(
																	lecture.lectureDuration * 60 * 1000,
																	{ units: ["h", "m"] }
																)}
															</p>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="py-20 text-sm md:text-base">
						<h3 className="text-xl font-semibold text-gray-800">
							Course Description
						</h3>
						<div
							className="rich-text pt-3"
							dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
						></div>
					</div>
				</div>

				<div className="max-w-md z-10 shadow-lg rounded-t md:rounded-lg overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
					{playerData ? (
						<div className="w-full aspect-video bg-black flex items-center justify-center text-white">
							Video Player: {playerData.videoId}
						</div>
					) : (
						<img
							src={courseData.courseThumbnail}
							alt="Course thumbnail"
							className="w-full aspect-video object-cover"
						/>
					)}
					<div className="p-5">
						<div className="flex items-center gap-2">
							<span className="text-red-500">⏰</span>
							<p className="text-red-500">
								<span className="font-medium">5 days</span> left at this price!
							</p>
						</div>
						<div className="flex gap-3 items-center pt-2">
							<p className="text-gray-800 md:text-4xl text-2xl font-semibold">
								{currency}
								{(
									courseData.coursePrice -
									(courseData.discount * courseData.coursePrice) / 100
								).toFixed(2)}
							</p>
							<p className="md:text-lg text-gray-500 line-through">
								{currency}
								{courseData.coursePrice}
							</p>
							<p className="md:text-lg text-gray-500">
								{courseData.discount}% off
							</p>
						</div>
						<div className="flex items-center text-sm md:text-base gap-4 pt-2 md:pt-4 text-gray-500">
							<div className="flex items-center gap-1">
								<span className="text-yellow-400">★</span>
								<p>{calculateRating()}</p>
							</div>
							<div className="h-4 w-px bg-gray-500/40"></div>
							<div className="flex items-center gap-1">
								<span>⏱</span>
								<p>{calculateCourseDuration()}</p>
							</div>
							<div className="h-4 w-px bg-gray-500/40"></div>
							<div className="flex items-center gap-1">
								<span>📚</span>
								<p>{calculateNoOfLectures()} lessons</p>
							</div>
						</div>
						<button
							onClick={enrollCourse}
							className={`md:mt-6 mt-4 w-full py-3 rounded font-medium ${
								isAlreadyEnrolled
									? "bg-green-600 text-white"
									: "bg-blue-600 text-white hover:bg-blue-700"
							}`}
						>
							{isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
						</button>
						<div className="pt-6">
							<p className="md:text-xl text-lg font-medium text-gray-800">
								What's in the course?
							</p>
							<ul className="ml-4 pt-2 text-sm md:text-base list-disc text-gray-500">
								<li>Lifetime access with free updates.</li>
								<li>Step-by-step, hands-on project guidance.</li>
								<li>Downloadable resources and source code.</li>
								<li>Quizzes to test your knowledge.</li>
								<li>Certificate of completion.</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CoursePage;
