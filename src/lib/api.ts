export const fetchData = async (skip: string, limit: string) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  const data = await response.json();

  return data;
};
