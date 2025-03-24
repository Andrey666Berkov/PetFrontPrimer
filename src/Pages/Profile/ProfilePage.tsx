import { Button } from "@mui/material";
import { useAuth } from "../../context/Auth/useAuth";

function ProfilePage() {
	const { id, email } = useAuth();

	const testUser = {
		fullName: "Быков Андрей Викторович",
		nickName: "",
		gitHub: "",
		level: 3,
		expirience: 80,
		avatar:
			"https://cs14.pikabu.ru/post_img/2023/12/18/8/og_og_1702902591268068509.jpg",
		roles: ["admin", "user"],
	};

	return (
		<section className="flex flex-row gap-10 py-8">
			<div className="px-4 py-5 bg-neutral-600 rounded-xl w-1/4 flex flex-col items-center">
				<img
					src={testUser.avatar}
					alt="avatar"
					className="w-36 h-36 rounded-full object-cover mb-5"
				/>

				<span className="text-xl mb-1">{testUser.nickName}</span>
				<span className="bg-neutral-400 mb-5">{testUser.fullName}</span>
				<Button variant="outlined">Редактировать профиль</Button>
			</div>

			<div className="px-4 py-5 bg-neutral-600 rounded-xl flex-1 flex flex-col gap5">
				<div className="flex flex-col gap-1">
					<span className="text-xl uppercase font-light">
						{testUser.level} уровень
					</span>

					<div className="w-1/3 flex flex-row items-center gap-2">
					<BorderLinearProgress variant="determinate" value={testUser.expirience} /></div>
				</div>
			</div>
		</section>
	);
}

export default ProfilePage;
