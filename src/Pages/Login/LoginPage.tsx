import { Button, TextField } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/useAuth";

type LoginFields = {
	email: string;
	password: string;
};
export default function LoginPage() {
	//npm i react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFields>();

	const { login, accessToken, isLoading, isError, user } = useAuth();

	const navigate = useNavigate();

	const onSubmit = async (data: LoginFields) => {
		await login(data.email, data.password);

		navigate("/profile");
	};

	return (
		<div className="container flex flex-col h-full w-full py-6 px-10 justify-center items-start gap-4">
			<NavLink to="/" className=" text-lg">
				← Обратно на главную
			</NavLink>
			<div>
				<p>{accessToken}</p>
			</div>

			<div className="flex flex-col flex-1 min-w-80 mx-auto items-center justify-center gap-9">
				{!isLoading ? (
					<form
						className=" flex flex-col w-full items-center gap-7"
						onSubmit={handleSubmit(onSubmit)}
					>
						<TextField
							variant="standard"
							label="Email"
							error={!!errors.email}
							helperText={errors.email?.message}
							fullWidth
							{...register("email", {
								required: "Это поле обязательно для заполнения",
							})}
						/>
						<TextField
							variant="standard"
							//	value={password}
							//error={!!passwordError}
							//onChange={(e) => setPassword(e.target.value)}
							label="Password"
							fullWidth
							{...register("password")}
						/>
						<Button type="submit" disabled={isLoading}>
							Войти
						</Button>
					</form>
				) : (
					<div className="w-full">
						<Skeleton animation="wave" width="100%" />
						<Skeleton animation="wave" width="100%" />
						<Skeleton animation="wave" width="100%" />
					</div>
				)}
			</div>
		</div>
	);
}
