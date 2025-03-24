import { useState } from "react";
import { O, X } from "./Constans";
import Square from "./Square";

export default function Board(): any {
	//	const [squares, setSquares] = useState(Array(9).fill(null));
	const [general, setGeneral] = useState("");

	function boolNumber(state: string) {
		console.log(state);

		state === X ? setGeneral(O) : setGeneral(X);
	}

	return (
		<>
			<div className="board-row">
				<Square boolNumber={boolNumber} state={general} />
				<Square boolNumber={boolNumber} state={general} />
				<Square boolNumber={boolNumber} state={general} />
			</div>
			<div className="board-row">
				<Square boolNumber={boolNumber} state={general} />
				<Square boolNumber={boolNumber} state={general} />
				<Square boolNumber={boolNumber} state={general} />
			</div>
			<div className="board-row">
				<Square boolNumber={boolNumber} state={general} />
				<Square boolNumber={boolNumber} state={general} />
				<Square boolNumber={boolNumber} state={general} />
			</div>
		</>
	);
}
