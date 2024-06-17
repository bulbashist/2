import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Rating,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CreateProductForm from "app/components/utility/create-product-form";
import { getSellerProductsURI } from "app/constants/urls";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
  FontWeight,
} from "app/styles/constants";
import { Product } from "app/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { sortVariants } from "../../types";
import { useAppSelector } from "app/hooks";
import defImg from "app/assets/default.webp";
import { useTranslation } from "react-i18next";

export const GoodsListComponent = () => {
  const { id } = useParams();
  const userId = useAppSelector((state) => state.core.id)!;

  const [products, setProducts] = useState<Product[]>([]);
  const [productDialog, setProductDialog] = useState(false);
  const [page, setPage] = useState(1);

  const [sortVal, setSortVal] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const URI = getSellerProductsURI(+id!, page, sortVal);

    axios
      .get(URI)
      .then((resp) => setProducts(resp.data))
      .catch(console.log);
  }, [page, id, sortVal]);

  return (
    <Box>
      <Box position="relative">
        <Stack direction="row" gap={CSSGap.Small}>
          <Typography
            variant="h4"
            fontWeight={FontWeight.Bold}
            marginBottom={CSSMargin.Small}
          >
            {t("profile_goods_title")}
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={sortVal}
              onChange={(e) => setSortVal(+e.target.value)}
            >
              {sortVariants.map((sv) => (
                <MenuItem key={sv.value} value={sv.value}>
                  {t(sv.label)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        {+id! === userId ? (
          <Box position="absolute" top={0} right={0}>
            <Button onClick={() => setProductDialog(true)}>
              {t("profile_add_product")}
            </Button>
          </Box>
        ) : (
          <></>
        )}
        <CreateProductForm
          open={productDialog}
          closeModal={() => {
            setProductDialog(false);
          }}
        />
      </Box>
      <Stack direction="column" gap={CSSGap.Small} width="100%">
        <Grid container gap={CSSGap.Small} columns={13}>
          {products.map((product) => (
            <Grid item xs={3} key={product.id}>
              <Card raised>
                <Box padding={CSSPadding.Small}>
                  <Grid container gap={CSSGap.Tiny}>
                    <Grid item xs={12}>
                      <Box height={200}>
                        <Link to={`/products/${product.id}`}>
                          <img
                            width="100%"
                            height="100%"
                            style={{ objectFit: "cover" }}
                            src={product.photos[0]?.url ?? defImg}
                            alt=""
                          />
                        </Link>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography textAlign="left">
                        {product.price} BYN
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography textAlign="left">
                        {product.manufacturer.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} height={45} overflow="hidden">
                      <Typography textAlign="left">
                        <Link to={`/products/${product.id}`}>
                          {product.name}
                        </Link>
                      </Typography>
                    </Grid>
                    <Rating value={product.avgRating} readOnly />
                  </Grid>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box alignSelf="end">
          <Pagination
            page={page}
            onChange={(_, value) => setPage(value)}
            count={10}
          />
        </Box>
      </Stack>
    </Box>
  );
};
