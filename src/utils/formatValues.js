export const formatMoneyValue = (value) => {
  if (!value) return "0,00";
  return value?.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
};
