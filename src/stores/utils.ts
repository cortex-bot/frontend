

export const getStockMarketOpenTime = () => {
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  yesterday.setHours(9, 15);
  return yesterday.toLocaleString("sv");
};

export const getStockMarketEndTime = () => {
  const currentDate = new Date();
  currentDate.setHours(15, 30);
  return currentDate.toLocaleString("sv");
};