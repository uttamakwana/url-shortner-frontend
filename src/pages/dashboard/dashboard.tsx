// pages/Dashboard.tsx
import { type FormEvent, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUserStore } from "@/store";
import { createShortUrl, getAllUrls } from "@/api";
import { Header, UrlShortenerForm, RecentUrls } from "./components";

export const Dashboard = () => {
    const { user, token, urls, updateUrls } = useUserStore();
    console.log({ user, token })

    // Fetch short URLs
    const { data: apiUrls } = useQuery({
        queryKey: ["urls"],
        queryFn: getAllUrls,
        staleTime: 1000 * 60 * 5,
    });

    // Combine URLs
    const allUrls = [...new Set([...urls, ...(apiUrls?.data?.urls || [])])];

    // Create short URL mutation
    const { isPending, mutate } = useMutation({
        mutationFn: createShortUrl,

        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (response) => {
            if (response.data) {
                const findUrl = urls.findIndex(url => url._id.toString() === response.data?._id.toString()) !== -1;
                console.log({ findUrl })

                if (findUrl) {
                    return toast.error("Already in your list!");
                } else {
                    updateUrls([
                        ...urls, response.data,
                    ]);
                }
                toast.success(response.message);
            }
        },
    });

    const handleSubmit = useCallback(
        (e: FormEvent, url: string) => {
            e.preventDefault();
            if (!url) {
                toast.error("Please enter a URL")
                return false;
            };
            mutate(url);
            return true;
        },
        [mutate]
    );

    const handleRedirect = useCallback((shortUrl: string) => {
        window.open(shortUrl, "_blank", "noopener,noreferrer");
    }, []);

    return (
        <div className="bg-neutral-50">
            <div className="min-h-screen bg-white px-4 md:px-10 max-w-6xl mx-auto flex flex-col gap-6">
                <div className="flex flex-col gap-6 sticky top-0 py-4 md:py-10 bg-white z-10">
                    <Header user={user} />
                    <UrlShortenerForm
                        isPending={isPending}
                        onSubmit={handleSubmit}
                    />
                </div>
                {allUrls.length > 0 && (
                    <RecentUrls urls={allUrls} onRedirect={handleRedirect} />
                )}
            </div>
        </div>
    );
};