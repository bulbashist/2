const baseURI = process.env.REACT_APP_SERVER;

export const commentsURL = baseURI + "/api/comments/";
export const imgUploadURL = process.env.REACT_APP_UPLOAD_IMAGE_URL!;
export const googleUrl = baseURI + "/auth/login-google";
export const signUpURL = baseURI + "/auth/signup";
export const sellerSignUpURI = baseURI + "/auth/seller/signup";
export const scodeURI = baseURI + "/auth/send-vcode";
export const vcodeURI = baseURI + "/auth/check-vcode";
export const logInURL = baseURI + "/auth/login";
export const signOutURL = baseURI + "/auth/signout";
export const usersURL = baseURI + "/users/";
export const productsURI = baseURI + "/products/";
export const ordersURI = baseURI + "/orders/";
export const officesURI = baseURI + "/offices/";
export const paycardsURI = baseURI + "/paycards/";
export const categoriesURI = baseURI + "/product-categories/";
export const manufacturersURI = baseURI + "/product-manufacturers/";

export const getSearchURI = (text: string) =>
  baseURI + `/products/search/?text=${text}`;

export const getSellerProductsURI = (
  sellerId: number,
  page?: number,
  sort?: number
) => {
  const pageArg = page ? `&page=${page}` : "";
  const sortArg = sort ? `&sort=${sort}` : "";
  return `${productsURI}?seller=${sellerId}${pageArg}${sortArg}`;
};

export const getCategoryProductsURI = (
  category: string | null,
  filter: number,
  page = 1
): string => {
  const categoryArg = category ? `&category=${category}` : "";
  const sortArg = `&sort=${filter}`;
  return `${productsURI}?page=${page}${categoryArg}${sortArg}`;
};

export const getStatsURI = (productId: number, sellerId: number) => {
  return `${baseURI}/stats?product=${productId}&seller=${sellerId}`;
};
