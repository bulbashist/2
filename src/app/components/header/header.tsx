import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import LoginComponent from "./components/login";
import ThemeComponent from "./components/theme-component";
import SearchComponent from "./components/search-component";
import NavListComponent from "./components/nav-list";
import LangComponent from "./components/lang-component";
import { Link } from "react-router-dom";
import { CSSGap } from "../../styles/constants";
import { HeaderWrapper } from "./styles";
import { ShoppingCart } from "@mui/icons-material";

export const HeaderComponent = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="sticky" color="default" sx={{ marginBottom: 3 }}>
      <Toolbar>
        <HeaderWrapper>
          <Link to="/">
            <Typography>{t("header_project_name")}</Typography>
          </Link>
          <NavListComponent />
          <SearchComponent />
          <Stack direction="row" gap={CSSGap.Large} alignItems="center">
            <Link to="/cart">
              <ShoppingCart />
            </Link>
            <ThemeComponent />
            <LangComponent />
            <LoginComponent />
          </Stack>
        </HeaderWrapper>
      </Toolbar>
    </AppBar>
  );
};
