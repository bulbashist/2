import DarkMode from "@mui/icons-material/DarkMode";
import { useAppDispatch } from "../../../../hooks";
import { changeTheme } from "../../../../store/core-reducer";
import { Theme } from "../../../../themes/types";

type Props = {
  nextTheme: Theme;
};

export const DarkThemeIcon = ({ nextTheme }: Props) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(changeTheme(nextTheme));
  };

  return <DarkMode htmlColor="white" onClick={onClick} />;
};
