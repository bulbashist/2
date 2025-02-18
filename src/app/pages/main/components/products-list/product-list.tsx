import axios from "axios";
import { useEffect, useState } from "react";
import { getCategoryProductsURI } from "app/constants/urls";
import { Product } from "app/types";
import {
  Box,
  Card,
  Grid,
  Pagination,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import defImg from "app/assets/default.webp";
import { CSSGap, CSSPadding, FontWeight } from "app/styles/constants";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import ReviewsOutlined from "@mui/icons-material/ReviewsOutlined";
import styles from "app/styles/animations.module.css";
import { useTranslation } from "react-i18next";

export const CatalogComponent = () => {
  const { category, filter } = useAppSelector((state) => state.main);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setError(false);
    setLoading(true);
    const URI = getCategoryProductsURI(category, filter, page);

    axios
      .get(URI)
      .then((resp) => setProducts(resp.data))
      .catch(() => setError(true))
      .finally(() => setTimeout(() => setLoading(false), 500));
  }, [category, page, filter]);

  const getTotal = (product: Product) => {
    return (product.price * (1 - product.discount / 100)).toFixed(2);
  };

  if (loading) {
    return (
      <Box position="relative" flexGrow={1} height="100%">
        <div className={styles.loading} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box position="relative" flexGrow={1} height="100%">
        <Stack direction="column" justifyContent="center" height="100%">
          <Typography variant="h4">{t("err_try_later")}</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack
      position="relative"
      direction="column"
      gap={CSSGap.Small}
      width="100%"
      height="100%"
    >
      <Grid container gap={CSSGap.Small} columns={13} height="100%">
        {products.length === 0 ? (
          <Box position="relative" flexGrow={1} height="100%">
            <Stack direction="column" justifyContent="center" height="100%">
              <Typography variant="h4">{t("err_goods_not_found")}</Typography>
            </Stack>
          </Box>
        ) : null}
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} height={350}>
            <Card raised>
              <Box padding={CSSPadding.Small}>
                <Grid container gap={CSSGap.Tiny}>
                  <Grid item xs={12}>
                    <Box height={170}>
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
                    <Typography
                      textAlign="left"
                      fontWeight={FontWeight.Bold}
                      fontSize="18px"
                    >
                      {getTotal(product)} BYN
                    </Typography>
                  </Grid>
                  <Grid item xs={12} height={45} overflow="hidden">
                    <Typography textAlign="left" fontWeight={FontWeight.Bold}>
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" gap={CSSGap.Tiny}>
                      <Rating value={product.avgRating} readOnly />
                      <Typography color="GrayText">
                        {product.avgRating}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" gap={CSSGap.Tiny}>
                      <ReviewsOutlined />
                      <Typography>
                        {product.totalComms} {t("product_list_reviews")}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box alignSelf="end">
        <Pagination
          page={page}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 0);
          }}
          count={10}
        />
      </Box>
    </Stack>
  );
};
