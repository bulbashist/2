import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { reviewsURL } from "../../../../constants/urls";
import { IReview } from "../../types";

const getReview = createAsyncThunk("get-review", async (id: number) => {
  const response = await axios.get(reviewsURL + id, { withCredentials: true });
  return response.data;
});

const changeReview = createAsyncThunk(
  "change-review",
  async ({ id, title, text, tags }: Partial<IReview>) => {
    const response = await axios.patch(
      reviewsURL + id,
      {
        title,
        text,
        tags,
      },
      { withCredentials: true }
    );
    return response.data;
  }
);

const deleteReview = createAsyncThunk("delete-review", async (id: number) => {
  await axios.delete(reviewsURL + id, { withCredentials: true });
  return;
});

const changeRating = createAsyncThunk(
  "change-review-rating",
  async ({ id, userRating }: Pick<IReview, "id" | "userRating">) => {
    await axios.patch(
      "" + id,
      { score: userRating },
      {
        withCredentials: true,
      }
    );
    return userRating;
  }
);

const changeLike = createAsyncThunk(
  "change-review-like",
  async ({ id, isLiked }: Pick<IReview, "id" | "isLiked">) => {
    await axios.patch(
      "" + id,
      { isLiked },
      {
        withCredentials: true,
      }
    );
    return isLiked;
  }
);

export { getReview, changeReview, deleteReview, changeRating, changeLike };
