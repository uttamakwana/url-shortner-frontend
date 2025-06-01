import { ServiceMaker, type TResponse } from "./service-maker";

type TCreateShortUrlResponse = {
    _id: string;
    originalUrl: string;
    shortUrl: string;
    createdAt: string;
    updatedAt: string;
    clicks: number;
};

type TGetAllShortUrlResponse = {
    urls: Array<TCreateShortUrlResponse>
};
export const createShortUrl = (originalUrl: string) => ServiceMaker<TResponse<TCreateShortUrlResponse>, { originalUrl: string }>({
    method: "post", url: "/urls", data: {
        originalUrl
    }
})

export const getAllUrls = () => ServiceMaker<TResponse<TGetAllShortUrlResponse>>({
    method: "get", url: "/urls"
})

export const redirectTooriginalUrl = (shortUrl: string) => ServiceMaker({ method: "get", url: `/urls/${shortUrl}` })