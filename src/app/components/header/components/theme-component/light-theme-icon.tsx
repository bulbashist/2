import LightMode from "@mui/icons-material/LightMode";
import { useAppDispatch } from "../../../../hooks";
import { changeTheme } from "../../../../store/core-reducer";
import { Theme } from "../../../../themes/types";

type Props = {
  nextTheme: Theme;
};

export const LightThemeIcon = ({ nextTheme }: Props) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(changeTheme(nextTheme));
  };

  return <LightMode htmlColor="black" onClick={onClick} />;
};
