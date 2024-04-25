import { Stack } from "@mui/material";
import PageWrapperComponent from "../../components/page-wrapper";
import ProductListComponent from "./components/reviews-list";
import { CSSGap, CSSPadding } from "app/styles/constants";

export const SearchPage = () => {
  return (
    <PageWrapperComponent>
      <Stack
        direction="column"
        alignItems="flex-start"
        padding={CSSPadding.Average}
        gap={CSSGap.Small}
      >
        <ProductListComponent />
      </Stack>
    </PageWrapperComponent>
  );
};
