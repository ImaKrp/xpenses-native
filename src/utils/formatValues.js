export const formatMoneyValue = (value) => {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
};
