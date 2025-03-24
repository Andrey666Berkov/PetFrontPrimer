import { ThemeProvider } from "@emotion/react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./index.css";
import { darkMode } from "./theme.ts";

createRoot(document.getElementById("root")!).render(
	<ThemeProvider theme={darkMode}>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</ThemeProvider>
);
