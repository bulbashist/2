import Stack from "@mui/material/Stack";
import PageWrapperComponent from "app/components/page-wrapper";
import { CSSGap, CSSPadding } from "app/styles/constants";
// import FilterPanelComponent from "./components/filter-panel";
import CatalogComponent from "./components/products-list";
import AsideBarComponent from "./components/aside-bar";
import { Grid } from "@mui/material";

export const MainPage = () => {
  return (
    <PageWrapperComponent>
      <Stack
        direction="column"
        alignItems="flex-start"
        padding={CSSPadding.Average}
        gap={CSSGap.Small}
      >
        {/* <FilterPanelComponent /> */}
        <Grid container>
          <Grid item xs={3}>
            <AsideBarComponent />
          </Grid>
          <Grid item xs={9}>
            <CatalogComponent />
          </Grid>
        </Grid>
      </Stack>
    </PageWrapperComponent>
  );
};
