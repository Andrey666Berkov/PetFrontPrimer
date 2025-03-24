import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navigation } from "../Components/Navigation";
import { ContentBlock } from "./ContentBlock";
import { useState } from "react";

export type Props = { children: React.ReactNode };

export default function RootLayout() {
	const [accessToken,  setAccessToken]=useState("");
	return (
		<div>
			<div className="h-screen flex flex-col">
				<Navigation />
				<main className="flex flex-col h-full px-2 sm:px-8 py-2 sm:py-5">
					<ContentBlock>
						<Outlet />
					</ContentBlock>
				</main>
				<ToastContainer />
			</div>
		</div>
	);
}
