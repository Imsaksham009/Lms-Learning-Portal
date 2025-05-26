import React, {
	useEffect,
	useState,
	type ChangeEvent,
	type FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {
	clearAuthError,
	registerUser,
	userLogin,
} from "../../reducers/user/auth.action";
import type { userState } from "../../reducers/user/auth.reducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface FormDataForSignUp {
	email: string;
	password: string;
	name: string;
	avatar: File | null;
}

export interface LoginInBody {
	email: string;
	password: string;
}

const LoginSignupComponent: React.FC = () => {
	const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
	const [formDataForSignUp, setFormDataForSignUp] = useState<FormDataForSignUp>(
		{
			email: "",
			password: "",
			name: "",
			avatar: null,
		}
	);

	const [loginData, setLoginData] = useState<LoginInBody>({
		email: "",
		password: "",
	});

	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (activeTab === "login") {
			setLoginData((prev) => ({
				...prev,
				[name]: value,
			}));
		} else {
			if (name === "avatar" && e.target.files) {
				const file = e.target.files[0];
				if (file) {
					const reader = new FileReader();
					reader.onload = () => {
						if (reader.readyState === 2) {
							setAvatarPreview(reader.result as string);
							setFormDataForSignUp((prev) => ({
								...prev,
								avatar: file as any, // Store the file object
							}));
						}
					};
					reader.readAsDataURL(file);
				}
			} else {
				setFormDataForSignUp((prev) => ({
					...prev,
					[name]: value,
				}));
			}
		}
	};

	const dispatch: AppDispatch = useDispatch();
	const userState: userState = useSelector(
		(state: RootState) => state.authReducer
	);
	const navigate = useNavigate();
	let redirect = "/home";
	const { loading, error, isAuthenticated } = userState;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (activeTab === "login") {
			userLogin(dispatch, loginData);
		} else {
			const signupData = new FormData();
			signupData.append("name", formDataForSignUp.name);
			signupData.append("email", formDataForSignUp.email);
			signupData.append("password", formDataForSignUp.password);
			signupData.append("avatar", formDataForSignUp.avatar as File);
			registerUser(dispatch, signupData);
		}
	};

	const switchTab = (tab: "login" | "signup") => {
		setActiveTab(tab);
		setFormDataForSignUp({
			email: "",
			password: "",
			name: "",
			avatar: null,
		});
		setAvatarPreview(null);
		setLoginData({
			email: "",
			password: "",
		});
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearAuthError(dispatch);
		}
		if (isAuthenticated) {
			if (isAuthenticated) {
				navigate(redirect);
			}
		}
	}, [error, dispatch, isAuthenticated]);

	return (
		<div className="min-h-screen bg-white flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Welcome to Tutorly
					</h1>
					<p className="text-gray-600">
						Please sign in to your account or create a new one
					</p>
				</div>

				{/* Card Container */}
				<div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
					{/* Tab Navigation */}
					<div className="flex relative bg-gray-50">
						<button
							onClick={() => switchTab("login")}
							className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-300 relative ${
								activeTab === "login"
									? "text-purple-800 bg-white"
									: "text-gray-500 hover:text-gray-700"
							}`}
						>
							Login
						</button>
						<button
							onClick={() => switchTab("signup")}
							className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-300 relative ${
								activeTab === "signup"
									? "text-purple-800 bg-white"
									: "text-gray-500 hover:text-gray-700"
							}`}
						>
							Sign Up
						</button>
						{/* Active tab indicator */}
						<div
							className={`absolute bottom-0 h-0.5 bg-purple-800 transition-all duration-300 ease-out ${
								activeTab === "login" ? "left-0 w-1/2" : "left-1/2 w-1/2"
							}`}
						/>
					</div>

					{/* Form Container */}
					<div className="p-8">
						<form onSubmit={handleSubmit}>
							<div className="space-y-6">
								{/* Animated Form Content */}
								<div
									key={activeTab}
									className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
								>
									{/* Name field for signup */}
									{activeTab === "signup" && (
										<div className="transform transition-all duration-300">
											<label
												htmlFor="name"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Full Name
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formDataForSignUp.name || ""}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent transition-all duration-200 outline-none"
												placeholder="Enter your full name"
											/>
										</div>
									)}

									{/* Email field */}
									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Email Address
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={
												activeTab === "signup"
													? formDataForSignUp.email
													: loginData.email
											}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent transition-all duration-200 outline-none"
											placeholder="Enter your email"
										/>
									</div>

									{/* Password field */}
									<div>
										<label
											htmlFor="password"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Password
										</label>
										<input
											type="password"
											id="password"
											name="password"
											value={
												activeTab === "signup"
													? formDataForSignUp.password
													: loginData.password
											}
											onChange={handleInputChange}
											required
											minLength={activeTab === "signup" ? 9 : undefined}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent transition-all duration-200 outline-none"
											placeholder="Enter your password"
										/>
									</div>

									{activeTab === "signup" && (
										<div className="transform transition-all duration-300">
											<label
												htmlFor="avatar"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Profile Picture
											</label>
											<div className="flex items-center space-x-4">
												{/* Preview Container */}
												<div className="flex-shrink-0">
													{avatarPreview ? (
														<img
															src={avatarPreview}
															alt="Preview"
															className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
														/>
													) : (
														<div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
															<svg
																className="w-8 h-8 text-gray-400"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
																/>
															</svg>
														</div>
													)}
												</div>

												{/* File Input */}
												<div className="flex-1">
													<input
														type="file"
														id="avatar"
														name="avatar"
														accept="image/*"
														onChange={handleInputChange}
														className="hidden"
													/>
													<label
														htmlFor="avatar"
														className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
													>
														<svg
															className="w-4 h-4 mr-2"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M12 6v6m0 0v6m0-6h6m-6 0H6"
															/>
														</svg>
														{avatarPreview ? "Change Photo" : "Upload Photo"}
													</label>
													<p className="mt-1 text-xs text-gray-500">
														PNG, JPG, GIF up to 10MB
													</p>
												</div>
											</div>
										</div>
									)}

									{/* Forgot Password for login */}
									{activeTab === "login" && (
										<div className="text-right">
											<button
												type="button"
												className="text-sm text-purple-800 hover:text-purple-900 transition-colors duration-200"
											>
												Forgot Password?
											</button>
										</div>
									)}

									{/* Submit Button */}
									<button
										type="submit"
										disabled={loading}
										className="w-full bg-purple-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-900 focus:ring-4 focus:ring-purple-300 transition-all duration-200 transform cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
									>
										{loading ? (
											<div className="flex items-center justify-center">
												<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
												{activeTab === "login"
													? "Signing In..."
													: "Creating Account..."}
											</div>
										) : activeTab === "login" ? (
											"Sign In"
										) : (
											"Create Account"
										)}
									</button>
								</div>
							</div>
						</form>

						{/* Additional Options */}
						<div className="mt-8 pt-6 border-t border-gray-200">
							<div className="text-center">
								<p className="text-gray-600 text-sm">
									{activeTab === "login"
										? "Don't have an account? "
										: "Already have an account? "}
									<button
										onClick={() =>
											switchTab(activeTab === "login" ? "signup" : "login")
										}
										className="text-purple-800 hover:text-purple-900 font-medium transition-colors duration-200"
									>
										{activeTab === "login" ? "Sign up here" : "Sign in here"}
									</button>
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center mt-8">
					<p className="text-gray-500 text-sm">
						By continuing, you agree to our Terms of Service and Privacy Policy
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginSignupComponent;
