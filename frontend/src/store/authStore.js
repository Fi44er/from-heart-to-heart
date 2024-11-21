import { create } from "zustand";
import axios from "axios";
import { url } from "../constants/contants";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const checkUserAuth = () => {
  const isAuthenticated = Cookies.get("token");

  if (isAuthenticated) {
    window.location.href = "/Admin";
    return true;
  } else {
    window.location.href = "/auth";
    return false;
  }
};

const useAuthStore = create((set, get) => ({
  username: "",
  password: "",
  isAuthenticated: false,
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),

  AuthFunc: async () => {
    const { username, password } = useAuthStore.getState();

    try {
      const response = await axios.post(
        `${url}/api/v1/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Логируем весь ответ
      console.log("Response:", response);

      // Проверяем только статус ответа
      if (response.status === 200) {
        get().setAuthenticated(true); // Use the setter here
      } else {
        get().setAuthenticated(false);
        alert("Неправильный логин или пароль");
      }
      checkUserAuth();
    } catch (error) {
      get().setAuthenticated(false);
      alert(
        "Ошибка авторизации: не правильный логин или пороль  " + error.message
      );
      console.error("Error Auth:", error);
    }
  },
  Logout: () => {
    try {
      const response = axios.post(`${url}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      console.log("Response", response.data);
      Cookies.remove("token");
    } catch (error) {
      console.error("Ошибка при выходе:", error); // Рекомендуется обработать ошибку
    }
  },
}));
export default useAuthStore;
