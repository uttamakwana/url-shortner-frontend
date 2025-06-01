import { useUserStore } from "@/store";
import axios from "axios";
import { refreshAccessToken } from "./users.api";
import { queryClient } from "@/config";
import { navigate } from "@/lib";

const BASE_URL = import.meta.env.VITE_API_URI;

const cookieOptions = {
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
};
export const api = axios.create(cookieOptions);
const authApi = axios.create(cookieOptions);

api.interceptors.request.use((config) => {
    const { token } = useUserStore.getState();

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use(response => response, async (error) => {
    const { config } = error;
    const { status, data } = error.response;

    if (status === 401 && data?.errorCode === "InvalidAccessToken") {
        try {
            const { updateToken } = useUserStore.getState();

            const response = await refreshAccessToken();
            const accessToken = response.data?.accessToken;

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
                updateToken(accessToken)
            }

            return authApi(config);
        } catch (err) {
            console.error("Error while getting new access token from backend!", err);
            queryClient.clear();
            navigate("/login", {
                state: {
                    redirectUrl: window.location.pathname
                }
            })
        }
    }

    if (status === 401 && data?.errorCode === "InvalidRefreshToken") {
        navigate("/", {
            state: {
                redirectUrl: window.location.pathname
            }
        })
    }

    return Promise.reject({ status, ...data })
})