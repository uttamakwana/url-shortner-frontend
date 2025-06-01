import ReactDOM from "react-dom/client";
import { InitializeApp } from "./app";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./config";

const rootElement = document.querySelector("#root")!;



ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <InitializeApp />
            <Toaster />
        </QueryClientProvider>
    </BrowserRouter>
);