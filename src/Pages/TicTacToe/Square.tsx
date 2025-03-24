import { useState } from "react";
import { X } from "./Constans.tsx";
import IStateGeneral from "./IStateGeneral.tsx";

export default function Square({ state, boolNumber }: IStateGeneral): any {
	const [value, setValue] = useState<string | null>(state);
	console.log(state);

	function handleClick() {
		if (!value) {
			setValue(X);
		}
		boolNumber(value);
	}

	return (
		<>
			<button className="square" onClick={() => handleClick()}>
				{value}
			</button>
		</>
	);
}
