import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Calendar, MousePointerClick } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import type { TUrl } from "@/store";

interface UrlCardProps {
  url: TUrl;
  onRedirect: (url: string) => void;
}

export const UrlCard = ({ url, onRedirect }: UrlCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clicks, setClicks] = useState(url.clicks || 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(url.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVisit = () => {
    setClicks(prev => prev + 1);
    onRedirect(url.shortUrl);
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="rounded-xl border border-border hover:border-accent shadow-sm hover:shadow-md transition-all duration-300 group">
        <CardContent className="p-4">
          {/* Original URL */}
          <p className="text-sm text-gray-600 truncate mb-2 font-medium">
            {url.originalUrl}
          </p>

          {/* Short URL with copy button */}
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              className={cn(
                "text-[var(--brand)] font-medium w-full text-left truncate",
                isHovered && "underline"
              )}
              animate={{
                x: isHovered ? 2 : 0,
              }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {url.shortUrl}
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-purple-50"
              onClick={handleCopy}
              aria-label="Copy to clipboard"
            >
              <motion.div
                animate={{
                  scale: copied ? [1, 1.2, 1] : 1,
                  rotate: copied ? [0, 10, -10, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <Copy
                  className={cn(
                    "h-4 w-4 text-muted-foreground",
                    copied && "text-[var(--brand)]"
                  )}
                />
              </motion.div>
            </Button>
          </div>

          {/* Stats and actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MousePointerClick className="h-3 w-3" />
                <span>{clicks || 0} clicks</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(url.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 text-xs"
              onClick={handleVisit}
            >
              <ExternalLink className="h-3 w-3" />
              Visit
            </Button>
          </div>
        </CardContent>

        {/* Copy feedback */}
        {copied && (
          <CardFooter className="p-0">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full bg-secondary text-[var(--brand)] text-xs p-2 text-center rounded-b-xl"
            >
              Copied to clipboard!
            </motion.div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};