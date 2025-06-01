import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Landing, Login, Register } from "./pages";
import { AuthProvider } from "./providers/auth-provider";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        element: <AuthProvider />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
    }
])