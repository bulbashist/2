import Slider from "@mui/material/Slider";
import { useAppDispatch } from "../../../../hooks";
import { changeUser } from "../../store/slice";
import { User } from "app/types";
import { UserRoleEnum } from "../../types";

type Props = {
  user: User;
};

export const BlockCellComponent = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const isBlocked = user.role.rights & 0b100 ? true : false;

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
