import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "./providers/auth-provider";
import { Dashboard, Landing, Login, Register } from "./pages";
import { setNavigate } from "./lib";
import { ThemeProvider } from "./providers/theme-provider";

const App = () => {
    const navigate = useNavigate();
    setNavigate(navigate);

    return <Routes>
        <Route element={<AuthProvider />}>
            <Route index element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>;
}

export const InitializeApp = () => {
    return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
    </ThemeProvider>
}