import axios, { AxiosError } from "axios";
import store from "@/store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ errorMessage: string }>) => {
    store.commit("notification/addNotification", {
      text: error.response.data.errorMessage,
      type: "error",
    });
    return Promise.reject(error);
  }
);
