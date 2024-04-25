import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Theme } from "../themes/types";
import { Language } from "../translations/types";
import i18next from "i18next";
import { ITag } from "../types";
import { signOutURL } from "../constants/urls";

type State = {
  id: number | null;
  name: string | null;
  rights: number;
  theme: Theme;
  lang: Language;
  tag: ITag | null;
};

const initialState: State = {
  id: null,
  name: null,
  rights: 0,
  theme: Theme.Dark,
  lang: Language.English,
  tag: null,
};

const getUserData = createAsyncThunk("get-user-data", async () => {
  const url = process.env.REACT_APP_SERVER + "/auth/user";
  const response = await axios.get(url, { withCredentials: true });

  return response.data;
});

const signOut = createAsyncThunk("sign-out", async () => {
  axios.get(signOutURL, { withCredentials: true });
});

const slice = createSlice({
  name: "core",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeLang: (state, action) => {
      state.lang = action.payload;
      i18next.changeLanguage(action.payload);
    },
    addTag: (state, action: PayloadAction<ITag>) => {
      state.tag = action.payload;
    },
    deleteTag: (state, action: PayloadAction<number>) => {
      state.tag = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<State>) => {
        state.id = action.payload.id;
        state.rights = action.payload.rights;
        state.name = action.payload.name;
      })
      .addCase(signOut.fulfilled, (state, _) => {
        state.id = null;
        state.rights = 0;
        state.name = null;
      }),
});

export { getUserData, signOut };
export const { changeLang, changeTheme, addTag, deleteTag } = slice.actions;
export default slice.reducer;
