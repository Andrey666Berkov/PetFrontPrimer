import axios from "axios";
import { useEffect, useState } from "react";

export function Issues() {
	const [state, setState] = useState(null);
	useEffect(() => {
		axios
			.get("http://localhost/api/pet/GetTest")
			.then((data) => console.log(data));
	}, []);
	return (
		<div className="container flex flex-col h-full w-full py-6 px-10 justify-center items-start gap-4"></div>
	);
}
