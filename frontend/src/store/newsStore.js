import { create } from "zustand";
import axios from "axios";
import { url } from "../constants/contants";

const useNewsStore = create((set, get) => ({
  news: [],
  fetchNews: async () => {
    try {
      const response = await axios.get(`${url}/api/v1/news`);
      set({ news: response.data });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  },

  fetchNewsItem: async (id) => {
    // Новая функция для получения конкретного элемента новостей
    try {
      const response = await axios.get(`${url}/api/v1/news/${id}`);
      set({ newsItem: response.data });
    } catch (error) {
      console.error("Error fetching news item:", error);
    }
  },

  title: "",
  description: "",
  photo: null,
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setPhoto: (photo) => set({ photo }),
  postNews: async () => {
    const { title, description, photo } = get();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await axios.post(`${url}/api/v1/news`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting news:", error);
      // Здесь можно добавить обработку ошибки
    }
  },
  putNews: async (id) => {
    const { title, description, photo } = get();
    function updateFields(newData) {
      const formData = getExistingData(); // Получаем существующие данные

      // Проверяем каждое поле и обновляем только если новое значение не пустое
      if (newData.title) {
        formData.title = newData.title;
      }
      if (newData.description) {
        formData.description = newData.description;
      }
      if (newData.photo) {
        formData.photo = newData.photo;
      }

      // Сохраняем обновленные данные
      saveData(formData);
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await axios.put(`${url}/api/v1/news/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting news:", error);
      // Здесь можно добавить обработку ошибки
    }
  },
  deleteNews: async (id) => {
    try {
      const response = await axios.delete(`${url}/api/v1/news/${id}`, {
        withCredentials: true,
      });
      console.log("Response", response.data);
      const newsResponse = await axios.get(`${url}/api/v1/news`);
      set((state) => {
        return { news: newsResponse.data }; // Обновляем состояние с новыми данными
      });
    } catch (error) {
      console.error("Error submitting news:", error);
    }
  },
}));

export default useNewsStore;
