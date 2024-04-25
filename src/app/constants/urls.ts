const server = process.env.REACT_APP_SERVER;

export const googleUrl = server + "/auth/login-google";
export const githubUrl = server + "/auth/login-github";
export const signUpURL = server + "/auth/signup";
export const logInURL = server + "/auth/login";
export const signOutURL = server + "/auth/signout";
export const usersURL = server + "/api/users/";

export const tagsURL = process.env.REACT_APP_SERVER + "/api/tags/";
export const reviewsURL = process.env.REACT_APP_SERVER + "/api/reviews/";
export const commentsURL = server + "/api/comments/";
export const imgUploadURL = process.env.REACT_APP_UPLOAD_IMAGE_URL!;
