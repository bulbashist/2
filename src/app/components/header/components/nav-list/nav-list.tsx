import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { paths, protectedPaths } from "./paths";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../hooks";

export const NavListComponent = () => {
  const rights = useAppSelector((state) => state.core.rights);
  const { t } = useTranslation();

  const isEligible = rights & 0b0010 ? true : false;

  return (
    <Stack direction="row">
      {paths.map((path, i) => (
        <Button key={i}>
          <Link to={path.url}>
            <Typography>{t(path.title)}</Typography>
          </Link>
        </Button>
      ))}
      {isEligible
        ? protectedPaths.map((path, i) => (
            <Button key={i}>
              <Link to={path.url}>
                <Typography>{t(path.title)}</Typography>
              </Link>
            </Button>
          ))
        : null}
    </Stack>
  );
};
