import axios from "axios";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

const useRedirect = (path) => {
  const router = useRouter();
  return (path) => {
    router.push(path);
  };
};

export const Server = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

Server.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Server.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      toast.error("Session has expired. Please login again.");
      // useRedirect("/login");
      // window.location.href = "/login";
      // setTimeout(() => {
      // }, 1000);
    }
    return Promise.reject(error);
  }
);
