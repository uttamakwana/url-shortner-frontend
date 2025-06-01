import { ServiceMaker, type TResponse } from "./service-maker";

type TRegisterUserRequest = {
    name: string;
    email: string;
    password: string;
}

type TUser = {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

type TAccessTokenResponse = { accessToken: string };
type TAuthResponse = { user: TUser }
type TRegisterResponse = TAccessTokenResponse & TAuthResponse;
type TLoginUserResponse = TRegisterResponse;
type TRefreshAccessTokenResponse = TAccessTokenResponse;

type TLoginUserRequest = Omit<TRegisterUserRequest, "name">;

export const registerUser = (data: TRegisterUserRequest) => ServiceMaker<TResponse<TRegisterResponse>, TRegisterUserRequest>({ method: "post", url: "/users/register", data })
export const loginUser = (data: TLoginUserRequest) => ServiceMaker<TResponse<TLoginUserResponse>, TLoginUserRequest>({ method: "post", url: "/users/login", data });

export const refreshAccessToken = () => ServiceMaker<TResponse<TRefreshAccessTokenResponse>>({ method: "get", url: "auth/refresh-access-token" });
export const getUser = () => ServiceMaker<TResponse<{ user: TUser }>>({ method: "get", url: "/users" })
export const logoutUser = () => ServiceMaker<TResponse>({ method: "get", url: "/users/logout" })