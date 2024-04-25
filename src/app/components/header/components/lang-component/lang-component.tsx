import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { changeLang } from "../../../../store/core-reducer";
import { langs } from "./constants";

export const LangComponent = () => {
  const currLang = useAppSelector((state) => state.core.lang);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Select
      sx={{ width: 150, height: "36.5px" }}
      value={currLang}
      onChange={(e) => dispatch(changeLang(e.target.value))}
    >
      {langs.map((lang, i) => (
        <MenuItem key={i} value={lang.value}>
          {t(lang.text)}
        </MenuItem>
      ))}
    </Select>
  );
};
