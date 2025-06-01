import { getUser } from "@/api";
import { AUTH_QUERY_KEY } from "@/constants/global.constant";
import { useQuery, type QueryOptions } from "@tanstack/react-query"

export const useAuth = (options: QueryOptions = {}) => {
    const { ...rest } = useQuery(
        {
            queryKey: [AUTH_QUERY_KEY],
            queryFn: getUser,
            staleTime: Infinity,
            ...options
        }
    );

    return { ...rest }
}