import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import type { FC } from "react";

const Layout: FC = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
