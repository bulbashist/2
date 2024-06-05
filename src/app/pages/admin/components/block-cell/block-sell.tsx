import Slider from "@mui/material/Slider";
import { useAppDispatch } from "../../../../hooks";
import { changeUser } from "../../store/slice";
import { User } from "app/types";
import { UserRoleEnum } from "../../types";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  user: User;
};

export const BlockCellComponent = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isBlocked = user.role.id === UserRoleEnum.BLOCKED;
  const isAdmin = user.role.id === UserRoleEnum.ADMIN;

  if (isAdmin) {
    return <Typography>{t("admin_admin")}</Typography>;
  }

  return (
    <Slider
      sx={{ width: "50px" }}
      min={0}
      max={1}
      value={Number(isBlocked)}
      onChange={(_, value) => {
        const roleId = value ? UserRoleEnum.BLOCKED : UserRoleEnum.USER;

        dispatch(
          changeUser({
            id: user.id,
            dto: {
              role: { id: roleId },
            },
          })
        );
      }}
    />
  );
};
