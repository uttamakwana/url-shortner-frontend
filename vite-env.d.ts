/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_URI: string;
    // ⬇️ add any other VITE_… variables you’re using here
    // readonly VITE_SOME_OTHER_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
