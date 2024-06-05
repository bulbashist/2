import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsURI } from "app/constants/urls";

const getProduct = createAsyncThunk("get-product", async (id: number) => {
  return axios
    .get(productsURI + id, { withCredentials: true })
    .then((res) => res.data);
});

export { getProduct };
