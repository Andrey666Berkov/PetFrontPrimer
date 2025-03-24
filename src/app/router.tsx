import { createBrowserRouter } from "react-router-dom";
import { Issues } from "../Pages/Issues/Issue";

import { Upload } from "../Components/Upload";
import LoginPage from "../Pages/Login/LoginPage";
import Video from "../Pages/MultiPart/Video";
import ProfilePage from "../Pages/Profile/ProfilePage";
import RootLayout from "./RootLayout";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/issues",
				element: <Issues />,
			},
			{
				path: "/video",
				element: <Video />,
			},
			{
				path: "/upload",
				element: <Upload />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/profile",
				element: <ProfilePage />,
			},
		],
		errorElement: <div>404</div>,
	},
]);
