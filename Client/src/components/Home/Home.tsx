import { Fragment, type FC } from "react";
import Hero from "../Hero";

const Home: FC = () => {
	return (
		<Fragment>
			<div className="flex flex-col justify-center">
				<Hero />
			</div>
		</Fragment>
	);
};

export default Home;
