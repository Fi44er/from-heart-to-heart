import { create } from "zustand";
import axios from "axios";
import { url } from "../constants/contants";
import { useNavigate } from "react-router-dom";

const Authenticated = (isAuthenticated) => {
  if (isAuthenticated) {
    // Если аутентификация успешна, сохраняем информацию в localStorage
    localStorage.setItem("isAuthenticated", "true");
    // Здесь можно сохранить дополнительную информацию, например, роль пользователя
    // localStorage.setItem("userRole", "Administrator"); // если роль доступна в ответе
  } else {
    // Если аутентификация не удалась, очищаем localStorage
    localStorage.removeItem("isAuthenticated");
    // localStorage.removeItem("userRole"); // очищаем роль, если она была сохранена
  }
};

export const checkUserAuth = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

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
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),

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
        Authenticated(true); // Успешная аутентификация
      } else {
        Authenticated(false); // Неуспешная аутентификация (возможно, это не понадобится)
        alert("Неправильный логин или пароль");
      }
      checkUserAuth();
    } catch (error) {
      // Если произошла ошибка, очищаем статус аутентификации
      Authenticated(false);
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
      localStorage.removeItem("isAuthenticated"); // Удаляем isAuthenticated из локального хранилища
    } catch (error) {
      console.error("Ошибка при выходе:", error); // Рекомендуется обработать ошибку
    }
  },
}));
export default useAuthStore;
