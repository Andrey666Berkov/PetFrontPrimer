import { Error } from "./Error";

export type Envelope<T> = {
	result: T | null;
	errors: Error[];
	timeGenerated: Date;
};
