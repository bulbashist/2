import { createTheme } from "@mui/material/styles";
import { Theme } from "./types";

const lightTheme = createTheme({
  palette: {
    mode: Theme.Light,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: Theme.Dark,
  },
});

export const themes = {
  [Theme.Dark]: darkTheme,
  [Theme.Light]: lightTheme,
};
