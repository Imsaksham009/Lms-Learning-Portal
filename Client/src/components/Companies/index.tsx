import type { FC } from "react";
import { assets } from "../../assets/assets";

const Companies: FC = () => {
	return (
		<div className="pt-16 flex flex-col items-center mx-auto">
			<p className="text-gray-500/80 text-base ">Trusted by learners from</p>
			<div className="flex flex-wrap gap-6 md:gap-16 md:mt-10 mt-5 justify-center">
				<img
					className="md:w-28 w-20"
					src={assets.accenture_logo}
					alt="accenture"
				/>
				<img className="md:w-28 w-20" src={assets.walmart_logo} alt="walmart" />
				<img
					className="md:w-28 w-20"
					src={assets.microsoft_logo}
					alt="microsoft"
				/>
				<img className="md:w-28 w-20" src={assets.adobe_logo} alt="adobe" />
				<img className="md:w-28 w-20" src={assets.paypal_logo} alt="paypal" />
			</div>
		</div>
	);
};

export default Companies;
