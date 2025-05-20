import type { FC } from "react";
import { assets } from "../../assets/assets";
import Search from "../SearchBar";

const Hero: FC = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-purple-100/70 via-blue-100/70 to-transparent">
			<h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto">
				Learn what you love, grow your way, and {""}
				<span className="text-purple-800">Succeed on your terms.</span>
				<img
					src={assets.sketch}
					className="md:block hidden absolute -bottom-7 right-5"
				></img>
			</h1>
			<p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
				We bring together world-class instructors, interactive content, and a
				supportive community to help you achieve your personal and professional
				goals.
			</p>
			<p className="md:hidden text-gray-500 max-w-sm mx-auto">
				Master new skills, upgrade your knowledge, and build your future with
				courses that fit your life perfectly.
			</p>
			<Search />
		</div>
	);
};

export default Hero;
