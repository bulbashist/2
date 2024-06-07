import Slider from "@mui/material/Slider";
import { useAppDispatch } from "../../../../hooks";
import { changeUser } from "../../store/slice";
import { User } from "app/types";
import { UserRoleEnum } from "../../types";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type Props = {
  user: User;
};

export const BlockCellComponent = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [val, setVal] = useState(+user.isBlocked);
  const isAdmin = user.role.id === UserRoleEnum.ADMIN;

  if (isAdmin) {
    return <Typography>{t("admin_admin")}</Typography>;
  }

  return (
    <Slider
      sx={{ width: "50px" }}
      min={0}
      max={1}
      value={val}
      onChange={(_, value) => {
        setVal(+value);
        dispatch(
          changeUser({
            id: user.id,
            dto: {
              isBlocked: Boolean(val),
            },
          })
        );
      }}
    />
  );
};
