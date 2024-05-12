import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsURI } from "app/constants/urls";

const getProduct = createAsyncThunk("get-product", async (id: number) => {
  const response = await axios.get(productsURI + id, { withCredentials: true });
  return response.data;
});

// const changeReview = createAsyncThunk(
//   "change-review",
//   async ({ id, title, text, tags }: Partial<IReview>) => {
//     const response = await axios.patch(
//       reviewsURL + id,
//       {
//         title,
//         text,
//         tags,
//       },
//       { withCredentials: true }
//     );
//     return response.data;
//   }
// );

// const deleteReview = createAsyncThunk("delete-review", async (id: number) => {
//   await axios.delete(reviewsURL + id, { withCredentials: true });
//   return;
// });

// const changeRating = createAsyncThunk(
//   "change-review-rating",
//   async ({ id, userRating }: Pick<IReview, "id" | "userRating">) => {
//     await axios.patch(
//       reviewRatingsURL + id,
//       { score: userRating },
//       {
//         withCredentials: true,
//       }
//     );
//     return userRating;
//   }
// );

// const changeLike = createAsyncThunk(
//   "change-review-like",
//   async ({ id, isLiked }: Pick<IReview, "id" | "isLiked">) => {
//     await axios.patch(
//       reviewRatingsURL + id,
//       { isLiked },
//       {
//         withCredentials: true,
//       }
//     );
//     return isLiked;
//   }
// );

export { getProduct };
