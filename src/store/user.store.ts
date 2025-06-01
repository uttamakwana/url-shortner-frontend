import { create } from 'zustand'

export type TUser = {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export type TUrl = {
    originalUrl: string;
    shortUrl: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    clicks: number;
}

export type TUserStore = {
    user: TUser;
    token: string | null;
    urls: Array<TUrl>;
    updateUser: (user: TUser) => void;
    updateUrl: (shortUrl: TUrl) => void;
    updateUrls: (urls: Array<TUrl>) => void;
    updateToken: (token: string) => void;
    clearStore: () => void;
}

const initialUser = {
    _id: "",
    name: "",
    email: "",
    createdAt: "",
    updatedAt: "",
}

const initialState = {
    user: initialUser,
    token: null,
    urls: []
}

export const useUserStore = create<TUserStore>((set) => ({
    ...initialState,
    updateUser: (user) => set((state) => ({ ...state, user: { ...state.user, ...user } })),
    updateUrl: (shortUrl) => set((state) => ({ ...state, urls: [...state.urls, shortUrl] })),
    updateUrls: (urls) => set((state) => ({ ...state, urls })),
    updateToken: (token) => set((state) => ({ ...state, token })),
    clearStore: () => set((state) => ({ ...state, initialState }))
}))
