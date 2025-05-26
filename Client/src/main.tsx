import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoadUserWrapper from "./components/LoadUser/index.tsx";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<LoadUserWrapper />
		<RouterProvider router={App} />
		<Toaster />
	</Provider>
);
