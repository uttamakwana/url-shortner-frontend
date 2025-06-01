// components/Header.tsx
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { UserProfile } from "./user-profile";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
  };
}

export const Header = ({ user }: HeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
  >
    <h1 className="text-2xl lg:text-4xl font-bold text-neutral-900 flex items-center gap-2">
      <Sparkles className="text-purple-500 h-8 w-8" />
      Shortify
    </h1>
    {user && <UserProfile name={user.name} email={user.email} />}
  </motion.div>
);