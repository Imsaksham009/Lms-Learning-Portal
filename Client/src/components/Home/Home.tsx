import { Fragment, type FC } from "react";
import Hero from "../Hero";
import Companies from "../Companies";
import Course from "../Course";

const Home: FC = () => {
	return (
		<Fragment>
			<div className="flex flex-col justify-center">
				<Hero />
				<Companies />
				<Course />
			</div>
		</Fragment>
	);
};

export default Home;
