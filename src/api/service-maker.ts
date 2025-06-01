import { AxiosError, type AxiosRequestHeaders } from "axios";
import { api } from "./axios";

type HTTPMethod = "get" | "post" | "put" | "delete" | "patch";

export interface RequestConfig<TRequest extends Record<string, unknown> | void = void> {
  method: HTTPMethod;
  url: string;
  data?: TRequest;
  params?: Record<string, unknown>;
  headers?: AxiosRequestHeaders;
}

interface APIErrorResponse {
  success: false;
  message: string;
  details?: unknown;
}

export async function ServiceMaker<
  TResponse,
  TRequest extends Record<string, unknown> | void = void
>({
  method,
  url,
  data,
  params,
  headers,
}: RequestConfig<TRequest>): Promise<TResponse> {
  try {
    const response = await api.request<TResponse>({
      method,
      url,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error: unknown) {
    // Safely narrow to AxiosError and handle response typing
    if (error && typeof error === "object" && "isAxiosError" in error) {
      const axiosError = error as AxiosError<APIErrorResponse>;
      const backendMessage = axiosError.response?.data?.message ?? "Unexpected error occurred.";
      const backendDetails = axiosError.response?.data?.details;

      console.error("API error:", backendMessage, backendDetails);
      throw new Error(backendMessage); // You can also throw custom error types if needed
    }

    // Fallback for unknown errors
    throw new Error("Something went wrong");
  }
}

export type TResponse<T = unknown> = {
    success: boolean;
    message: string;
    data?: T
}