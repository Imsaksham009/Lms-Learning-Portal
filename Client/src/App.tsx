import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	type DataRouter,
	type RouteObject,
} from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import CoursePage from "./components/CoursePage";
import Home from "./components/Home/Home";
import Layout from "./components/Layout";
import LoginSignupComponent from "./components/Login";

const routes: RouteObject[] = createRoutesFromElements(
	<Fragment>
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="home" element={<Home />} />
			<Route path="/course/:slug" element={<CoursePage />} />
			<Route path="/login" element={<LoginSignupComponent />} />
		</Route>
	</Fragment>
);

const App: DataRouter = createBrowserRouter(routes);

export default App;
