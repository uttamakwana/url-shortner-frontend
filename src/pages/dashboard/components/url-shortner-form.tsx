// components/UrlShortenerForm.tsx
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { useState } from "react";

interface UrlShortenerFormProps {
    isPending: boolean;
    onSubmit: (e: React.FormEvent, url: string) => boolean;
}

export const UrlShortenerForm = ({
    isPending,
    onSubmit,
}: UrlShortenerFormProps) => {
    const [url, setUrl] = useState("");

    return <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
    >
        <form
            className="bg-white p-4 rounded-2xl shadow-normal"
            onSubmit={(e) => {
                const isSuccessfullSubmission = onSubmit(e, url);
                if (isSuccessfullSubmission) {
                    setUrl("");
                }
            }}
        >
            <h3 className="text-lg font-semibold mb-4">Create a New Short URL</h3>
            <div className="flex flex-col sm:flex-row gap-2">
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="url"
                    placeholder="Enter long URL..."
                    required
                />
                <Button
                    type="submit"
                    disabled={isPending}
                    className="flex gap-2 items-center"
                >
                    <Link2 size={18} />
                    {isPending ? "Shortening..." : "Shorten"}
                </Button>
            </div>
        </form>
    </motion.div>
};