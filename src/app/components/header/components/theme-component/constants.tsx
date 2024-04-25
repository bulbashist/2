import { Theme } from "../../../../themes/types";
import { LightThemeIcon } from "./light-theme-icon";
import { DarkThemeIcon } from "./dark-theme-icon";

export const themes = [
  { value: Theme.Light, component: <LightThemeIcon nextTheme={Theme.Dark} /> },
  { value: Theme.Dark, component: <DarkThemeIcon nextTheme={Theme.Light} /> },
];
