import { create } from "zustand";

const dateToFilter = (date) => {
  const inicialDate = new Date(date);
  inicialDate.setDate(1);
  inicialDate.setHours(0, 0, 0, 0);
  const finalDate = new Date(date);
  finalDate.setMonth(finalDate.getMonth() + 1);
  finalDate.setDate(0);
  finalDate.setHours(0, 0, 0, 0);

  return [inicialDate.getTime(), finalDate.getTime()];
};

const getStartOfCurrMonth = () => {
  const inicialDate = new Date();
  inicialDate.setDate(1);
  inicialDate.setHours(0, 0, 0, 0);
  return inicialDate;
};

const useListStore = create((set) => ({
  filter_date: dateToFilter(new Date()),
  date: getStartOfCurrMonth(),
  visibility: false,

  data: [],
  prev_data: [],
  next_data: [],

  toggleVisibility: (visibility) => set({ visibility: !visibility }),
  setFilter: (filter) => set({ filter }),
  setDate: (date) => set({ date, filter_date: dateToFilter(date) }),

  setData: (data) => set({ data }),
  setPrevData: (prev_data) => set({ prev_data }),
  setNextData: (next_data) => set({ next_data }),
}));

export default useListStore;
