import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { AccoutnServices } from "../api/accaunts";
import { api } from "../api/api";
import { User } from "../models/User";

export type AuthContextType = {
	accessToken: string | undefined;
	user: User | undefined;
	isLoading: boolean;
	isError: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextTRype | undefined>();

type Props = { children: React.ReactNode };

export const AuthProvider = ({ children }: Props) => {
	const [accessToken, setAccessToken] = useState<string | undefined>("");
	const [refreshToken, setRefreshToken] = useState<string | undefined>("");
	const [user, setUser] = useState<User | undefined>();

	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const accessTokenInterseptor = api.interceptors.response.use((config) => {
			config.headers.Authorization = accessToken
				? `Bearer ${accessToken}`
				: config.headers.Authorization;
			console.log(config.headers.Authorization);
			return config;
		});
		return () => api.interceptors.response.eject(accessTokenInterseptor);
	}, [accessToken]);

	useLayoutEffect(() => {
		const refreshInterseptor = api.interceptors.response.use(
			(config) => config,
			async (error) => {
				if (error.response.status === 401) {
					const originalRequest = error.config;
					try {
						const response = await AccoutnServices.refresh();
						setAccessToken(response.data.result!.accessToken);
						setUser({
							email: response.data.result!.email,
							id: response.data.result!.id,
						} as User);

						originalRequest.headers.Authorization = `Bearer ${
							response.data.result!.accessToken
						}`;

						return api(error.config);
					} catch (error) {
						setAccessToken(undefined);
						console.log(error);
					}
				} else {
					return Promise.reject(error);
				}
			}
		);
		return () => {
			api.interceptors.response.eject(refreshInterseptor);
		};
	}, []);

	const login = async (email: string, password: string) => {
		try {
			setIsLoading(true);
			const response = await AccoutnServices.login(email, password);
			setAccessToken(response.data.result!.accessToken);
			setRefreshToken(response.data.result!.refreshToken);
			setUser({
				email: response.data.result?.email,
				id: response.data.result?.id,
				userName: "Admin",
			} as User);
			//перехватываем ответ для установки в header accessToken

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			await AccoutnServices.logout();
			setAccessToken(undefined);
			setUser(undefined);
		} catch (error) {
			console.log(error);
			setIsError(true);
		}
	};

	return (
		<AuthContext.Provider
			value={{ accessToken, user, isLoading, isError, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
