// components/UserProfile.tsx
import { logoutUser } from "@/api";
import { ModeToggle } from "@/components/theme-toggle";
import { getInitials } from "@/lib/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
    name: string;
    email: string;
}

export const UserProfile = ({ name, email }: UserProfileProps) => {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const response = await logoutUser();
            if(response.message) {
                toast.success(response.message);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to logout");
        }
    }

    return (
        <div className="flex items-start gap-4">
            <div className="rounded-full bg-[var(--brand)] text-white w-12 h-12 flex items-center justify-center text-xl font-semibold shadow-sm">
                {getInitials(name)}
            </div>
            <div>
                <h2 className="text-xl font-bold text-foreground">{name}</h2>
                <p className="text-sm text-secondary-foreground">{email}</p>
                <button
                    className="cursor-pointer flex ai-center gap-2 text-sm text-muted-foreground hover:underline"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <ModeToggle />
        </div>
    )
};