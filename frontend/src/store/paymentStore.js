import { create } from "zustand";
import axios from "axios";
import { url } from "../constants/contants";

const usePaymentStore = create((set, get) => ({
  value: "",
  description: "",
  setValue: (value) => set({ value }),
  setDescription: (description) => set({ description }),

  charitablePayment: async () => {
    const { value, description } = get();
    const formData = new FormData();
    formData.append("value", value);
    formData.append("description", description);
    try {
      const response = await axios.post(`${url}/api/v1/payment`, formData);

      console.log("Response:", response.data);
      return {
        result: response.data.result,
        error: null,
      };
    } catch (error) {
      console.error("Error submitting news:", error);
      return {
        result: null,
        error: error.message, // Return the error message
      };
    }
  },
}));
export default usePaymentStore;
