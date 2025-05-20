import type { FC } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

interface HeaderProps {}

type HeaderComponent = FC<HeaderProps>;

type AuthState = boolean;
const Header: HeaderComponent = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<AuthState>(false);
	return (
		<div className="flex items-center justify-between py-4 px-4 sm:px-10 md:px-14 lg:px-36 border-b border-b-gray-500 bg-gradient-to-r from-purple-300/60 to-blue-100">
			<Link to="/home">
				<img
					src={assets.logo}
					alt="logo"
					className="w-28 lg:w-32 cursor-pointer"
				/>
			</Link>
			<div className="hidden md:flex items-center gap-5 text-gray-500">
				{isLoggedIn ? (
					<div className="flex items-center gap-5">
						<Link
							to="/become-educator"
							className="text-gray-500 hover:text-gray-700"
						>
							Become Educator
						</Link>
						|
						<Link
							to="/my-enrollments"
							className="text-gray-500 hover:text-gray-700"
						>
							My Enrollments
						</Link>
					</div>
				) : (
					<button
						className="bg-purple-800 text-white px-5 py-2 rounded-full hover:bg-purple-900 transition duration-300 cursor-pointer"
						onClick={() => setIsLoggedIn(true)}
					>
						Login / Sign-Up
					</button>
				)}
			</div>
			{/* <div className="md:hidden sm:gap-2 flex items-center text-gray-500">
				{isLoggedIn ? (
					<div className="hidden items-center gap-5">
						<Link to="/become-educator">Become Educator</Link> |
						<Link to="/my-enrollments" className="ml-1">
							My Enrollments
						</Link>
					</div>
				) : (
					<button
						className="cursor-pointer"
						onClick={() => setIsLoggedIn(!isLoggedIn)}
					>
						<img src={assets.user_icon} alt="user" />
					</button>
				)}
			</div> */}
		</div>
	);
};

export default Header;
