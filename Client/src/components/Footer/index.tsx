import React, { useState } from "react";
import {
	Mail,
	Send,
	BookOpen,
	Users,
	Phone,
	MapPin,
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube,
} from "lucide-react";
import { assets } from "../../assets/assets";

const Footer: React.FC = () => {
	const [email, setEmail] = useState("");
	const [isSubscribing, setIsSubscribing] = useState(false);

	const handleSubscribe = async () => {
		if (!email) return;

		setIsSubscribing(true);
		// Simulate API call
		setTimeout(() => {
			console.log("Subscribed:", email);
			setEmail("");
			setIsSubscribing(false);
		}, 1500);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSubscribe();
		}
	};

	return (
		<footer className="bg-slate-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-14">
					{/* Brand Section */}
					<div className="space-y-4 mr-10">
						<div className="flex items-center space-x-2">
							<div className=" flex items-center justify-center">
								<img src={assets.logo_dark} alt="logo" />
							</div>
						</div>
						<p className="text-slate-300 text-sm leading-relaxed">
							Empowering learners worldwide with cutting-edge online education.
							Join thousands of students in their journey to success through our
							comprehensive learning management system.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
							>
								<Facebook className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
							>
								<Twitter className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
							>
								<Instagram className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
							>
								<Linkedin className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
							>
								<Youtube className="w-5 h-5" />
							</a>
						</div>
					</div>

					{/* Newsletter */}
					<div className="space-y-4 ml-10">
						<h4 className="text-lg font-semibold">
							Subscribe to our newsletter
						</h4>
						<p className="text-slate-300 text-sm">
							The latest news, articles, and resources, sent to your inbox
							weekly.
						</p>
						<div className="space-y-3">
							<div className="flex">
								<div className="relative flex-1">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
									<input
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										onKeyPress={handleKeyPress}
										className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
									/>
								</div>
								<button
									onClick={handleSubscribe}
									disabled={isSubscribing || !email}
									className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg transition-colors duration-200 flex items-center justify-center min-w-[80px]"
								>
									{isSubscribing ? (
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									) : (
										<>
											<Send className="w-4 h-4 mr-1" />
											<span className="text-sm font-medium">Subscribe</span>
										</>
									)}
								</button>
							</div>
							<p className="text-xs text-slate-400">
								We care about your data. Read our privacy policy.
							</p>
						</div>
					</div>
				</div>

				{/* Contact Info */}
				<div className="mt-12 pt-8 border-t border-slate-800">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
								<Phone className="w-5 h-5 text-blue-400" />
							</div>
							<div>
								<p className="text-sm font-medium">Call us</p>
								<p className="text-slate-300 text-sm">+91-7428684010</p>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
								<Mail className="w-5 h-5 text-blue-400" />
							</div>
							<div>
								<p className="text-sm font-medium">Email us</p>
								<p className="text-slate-300 text-sm">
									guptasaksham82@icloud.com
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
								<MapPin className="w-5 h-5 text-blue-400" />
							</div>
							<div>
								<p className="text-sm font-medium">Visit us</p>
								<p className="text-slate-300 text-sm">New Delhi, India</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-slate-800">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<p className="text-slate-400 text-sm">
							Copyright {new Date(Date.now()).getFullYear()} © Tutorly. All
							Rights Reserved.
						</p>
						<div className="flex items-center space-x-6">
							<a
								href="#"
								className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
							>
								Accessibility
							</a>
							<a
								href="#"
								className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
							>
								Sitemap
							</a>
							<a
								href="#"
								className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
							>
								Legal
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
