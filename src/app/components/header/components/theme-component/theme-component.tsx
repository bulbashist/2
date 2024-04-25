import { useAppSelector } from "../../../../hooks";
import { themes } from "./constants";

export const ThemeComponent = () => {
  const currTheme = useAppSelector((state) => state.core.theme);
  const result = themes.find((theme) => theme.value === currTheme)?.component;
  return result ?? null;
};
