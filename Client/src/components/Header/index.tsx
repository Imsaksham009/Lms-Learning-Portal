import { useEffect, useRef, useState, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { logOutUser } from "../../reducers/user/auth.action";
import type { userState } from "../../reducers/user/auth.reducer";
import type { AppDispatch, RootState } from "../../store/store";

interface HeaderProps {}

type HeaderComponent = FC<HeaderProps>;

const Header: HeaderComponent = () => {
	const navigate = useNavigate();
	const { isAuthenticated, user }: userState = useSelector(
		(state: RootState) => state.authReducer
	);
	const dispatch: AppDispatch = useDispatch();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="flex items-center justify-between py-4 px-4 sm:px-10 md:px-14 lg:px-36 border-b border-b-gray-500 bg-gradient-to-r from-purple-200/60 to-blue-100">
			<Link to="/home">
				<img
					src={assets.logo}
					alt="logo"
					className="w-28 lg:w-32 cursor-pointer"
				/>
			</Link>
			<div className="hidden md:flex items-center gap-5 text-gray-500">
				{isAuthenticated ? (
					<div className="flex items-center gap-5">
						<Link
							to="/become-educator"
							className="text-gray-500 hover:text-gray-700"
						>
							Become Educator
						</Link>

						<img
							src={user?.avatar?.url || assets.profile_img}
							alt="profile"
							className="w-9 cursor-pointer rounded-4xl"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						/>
						{isMenuOpen && (
							<div
								className="absolute top-11.5 right-4 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
								ref={menuRef}
							>
								<Link
									to="/profile"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
									onClick={() => setIsMenuOpen(false)}
								>
									Profile
								</Link>
								<Link
									to="/my-courses"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
									onClick={() => setIsMenuOpen(false)}
								>
									My Courses
								</Link>
								<hr className="my-1" />
								<button
									className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
									onClick={() => {
										logOutUser(dispatch);
										setIsMenuOpen(false);
									}}
								>
									Logout
								</button>
							</div>
						)}
					</div>
				) : (
					<button
						className="bg-purple-800 text-white px-5 py-2 rounded-full hover:bg-purple-900 transition duration-300 cursor-pointer"
						onClick={() => navigate("/login")}
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
