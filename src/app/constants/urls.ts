const baseURI = process.env.REACT_APP_SERVER;

export const commentsURL = baseURI + "/api/comments/";
export const imgUploadURL = process.env.REACT_APP_UPLOAD_IMAGE_URL!;
export const googleUrl = baseURI + "/auth/login-google";
export const signUpURL = baseURI + "/auth/signup";
export const logInURL = baseURI + "/auth/login";
export const signOutURL = baseURI + "/auth/signout";
export const usersURL = baseURI + "/api/users/";
export const productsURI = baseURI + "/products/";
export const ordersURI = baseURI + "/orders/";
export const officesURI = baseURI + "/offices/";
export const paycardsURI = baseURI + "/paycards/";
export const categoriesURI = baseURI + "/product-categories/";
export const manufacturersURI = baseURI + "/product-manufacturers/";

export const getSearchURI = (text: string) =>
  baseURI + `/products/search/?text=${text}`;

export const getSellerProductsURI = (sellerId: number, page = 1) =>
  `${productsURI}?seller=${sellerId}&page=${page}`;

export const getCategoryProductsURI = (
  category: string | null,
  page = 1
): string => {
  if (category) {
    return `${productsURI}?category=${category}&page=${page}`;
  } else {
    return `${productsURI}?page=${page}`;
  }
};
