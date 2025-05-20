import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	type DataRouter,
	type RouteObject,
} from "react-router-dom";
import Layout from "./components/Layout";
import { Fragment } from "react/jsx-runtime";
import Home from "./components/Home/Home";

const routes: RouteObject[] = createRoutesFromElements(
	<Fragment>
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="home" element={<Home />} />
		</Route>
	</Fragment>
);

const App: DataRouter = createBrowserRouter(routes);

export default App;
