const baseURI = process.env.REACT_APP_SERVER;

export const productsURI = baseURI + "/products/";
export const ordersURI = baseURI + "/orders/";
export const officesURI = baseURI + "/offices/";
export const paycardsURI = baseURI + "/paycards/";
export const categoriesURI = baseURI + "/product-categories";

export const getSearchURI = (text: string) =>
  baseURI + `/products/search/?text=${text}`;

export const getSellerProductsURI = (sellerId: number, page = 1) =>
  baseURI + `/products?seller=${sellerId}&page=${page}`;

export const productsOfCategoryURI = (
  category: string | null,
  page = 1
): string => {
  if (category) {
    return baseURI + "/product-categories/" + category + `?page=${page}`;
  } else {
    return productsURI + `?page=${page}`;
  }
};
