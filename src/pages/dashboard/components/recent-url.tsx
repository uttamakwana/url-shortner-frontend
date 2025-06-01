// components/RecentUrls.tsx
import { motion } from "motion/react";
import { UrlCard } from "./url-card";
import type { TUrl } from "@/store";

interface RecentUrlsProps {
  urls: Array<TUrl>;
  onRedirect: (url: string) => void;
}

export const RecentUrls = ({ urls, onRedirect }: RecentUrlsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.4 }}
    className="flex flex-col mt-4 px-2"
  >
    <h3 className="text-lg font-semibold mb-4">Recent URLs</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
      {urls.map((url) => (
        <UrlCard key={url._id} url={url} onRedirect={onRedirect} />
      ))}
    </div>
  </motion.div>
);