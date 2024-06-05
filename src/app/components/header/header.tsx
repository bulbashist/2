import { AppBar, Box, List, Stack, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import LoginComponent from "./components/login";
import ThemeComponent from "./components/theme-component";
import SearchComponent from "./components/search-component";
import NavListComponent from "./components/nav-list";
import LangComponent from "./components/lang-component";
import { Link } from "react-router-dom";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
  FontWeight,
} from "../../styles/constants";
import { HeaderWrapper } from "./styles";
import { ShoppingCart } from "@mui/icons-material";

export const HeaderComponent = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="sticky" color="default" sx={{ marginBottom: 3 }}>
      <Box
        marginTop={CSSMargin.Tiny}
        paddingX={CSSPadding.Large + CSSMargin.Average}
      >
        <Stack direction="row" gap={CSSGap.Small} justifyContent="end">
          <Link to="/seller">
            <Typography textAlign="end">{t("header_seller_btn")}</Typography>
          </Link>
          <Link to="/offices">
            <Typography textAlign="end">{t("header_offices_btn")}</Typography>
          </Link>
        </Stack>
      </Box>
      <Toolbar>
        <HeaderWrapper>
          <Link to="/">
            <Typography variant="h5" fontWeight={FontWeight.Bold}>
              {t("header_project_name")}
            </Typography>
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
