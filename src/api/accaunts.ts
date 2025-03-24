import axios, { AxiosResponse } from "axios";
import { Envelope } from "../models/Envelope";
import { LoginResponse } from "../models/LoginResponse";
import { api, API_URL } from "./api";

export class AccoutnServices {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<Envelope<LoginResponse>>> {
		const response = await api.post<Envelope<LoginResponse>>(
			"/Accaunt/loginnnn",
			{
				email,
				password,
			}
		);
		return response;
	}

	static async refresh() {
		const response = axios.post<Promise<Envelope<LoginResponse>>>(
			API_URL + "/Accaunt/refresh",
			{},
			{ withCredentials: true }
		);

		return response;
	}

	static async logout() {
		axios.post(API_URL + "/Accaunt/logout");
	}
}
