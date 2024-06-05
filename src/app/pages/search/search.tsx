import { Stack } from "@mui/material";
import PageWrapperComponent from "../../components/page-wrapper";
import ProductListComponent from "./components/product-list";
import { CSSGap, CSSPadding } from "app/styles/constants";

export const SearchPage = () => {
  return (
    <PageWrapperComponent>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        padding={CSSPadding.Average}
        gap={CSSGap.Small}
        minHeight={500}
        height="100%"
        position="relative"
      >
        <ProductListComponent />
      </Stack>
    </PageWrapperComponent>
  );
};
