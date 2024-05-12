import { Slider, Typography } from "@mui/material";
import { useAppDispatch } from "../../../../hooks";
import { changeUser } from "../../store/slice";
import { useTranslation } from "react-i18next";
import { User } from "app/types";
import { UserRoleEnum } from "../../types";

type Props = {
  user: User;
};

export const AdminCellComponent = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isAdmin = user.role.rights & 0b010 ? true : false;

  return !isAdmin ? (
    <Slider
      sx={{ width: "50px" }}
      min={0}
      max={1}
      value={Number(isAdmin)}
      onChange={(_, value) => {
        const roleId = value ? UserRoleEnum.ADMIN : UserRoleEnum.USER;
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
  ) : (
    <Typography>{t("admin_admin")}</Typography>
  );
};
