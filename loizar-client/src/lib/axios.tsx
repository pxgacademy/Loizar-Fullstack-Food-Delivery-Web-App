import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
// import { signOutUser } from "../utils/auth-utils";

const BASE_URL = import.meta.env.VITE_API_LINK;

// Public Axios instance (no credentials)
export const publicAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// Private Axios instance (with credentials)
const privateAxiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Custom hook to get authenticated Axios instance with 401/403 interceptor.
export const usePrivateAxios = (): AxiosInstance => {
  const { logout } = useAuthStore();

  useEffect(() => {
    const responseInterceptor = privateAxiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const status = error?.status;
        if (status === 401 || status === 403) logout();
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor when component unmounts
    return () => {
      privateAxiosInstance.interceptors.response.eject(responseInterceptor);
    };

    // eslint-disable-next-line
  }, []);

  return privateAxiosInstance;
};
