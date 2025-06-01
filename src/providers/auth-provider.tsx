import { getUser } from "@/api";
import { AUTH_QUERY_KEY } from "@/constants/global.constant";
import { useUserStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthProvider = () => {
    const { updateUser } = useUserStore();
    const { data, isLoading } = useQuery(
        {
            queryKey: [AUTH_QUERY_KEY],
            queryFn: getUser,
            staleTime: Infinity,
        }
    );

    useEffect(() => {
        if (data?.data) {
            const user = data.data.user;
            updateUser(user);
        }
    }, [data, updateUser]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <h1>Loading...</h1>
        </div>
    }

    if (data == undefined) {
        return <Navigate to={"/login"} replace state={{
            rediretUrl: window.location.pathname
        }} />
    } else {
        return <Outlet />
    }
}
