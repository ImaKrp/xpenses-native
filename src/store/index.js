import { create } from "zustand";

const useTransactionFormStore = create((set) => ({
  value: 0,
  type: "",
  data: {},

  resetForm: () => set({ value: 0, type: "", data: {} }),
  setValue: (value) => set({ value }),
  setType: (type) => set({ type }),
  setData: (data) => set({ data }),
}));

export default useTransactionFormStore;
