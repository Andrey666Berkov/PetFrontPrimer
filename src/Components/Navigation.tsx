import { AppBar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth/useAuth";

export function Navigation() {
	const { accessToken, logout } = useAuth();
	return (
		<div>
			<AppBar position="static">
				<div className="flex flex-row items-center justify-between py-2 px-3">
					<div className="flex flex-row gap-4 items-center justify-center">
						<NavLink to="/">
							<span className=" text-2xl pr-5">Pets</span>
						</NavLink>
						<NavLink to="issues">Задачи</NavLink>
						<NavLink to="lessons">Занятия</NavLink>
						<NavLink to="video">Видео</NavLink>
						<NavLink to="upload">загрузка видео</NavLink>
					</div>
					<div className="flex gap-3">
						{accessToken ? (
							<div className="flex gap-3">
								<NavLink to={"/profile"}>Profile</NavLink>
								<button
									onClick={() => {
										logout();
									}}
								>
									logout
								</button>
							</div>
						) : (
							<NavLink to={"/login"}>Login</NavLink>
						)}
					</div>
				</div>
			</AppBar>
		</div>
	);
}
