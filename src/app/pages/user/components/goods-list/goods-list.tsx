import {
  Box,
  Card,
  Grid,
  Pagination,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { getSellerProductsURI } from "app/constants/urls2";
import { useAppSelector } from "app/hooks";
import { CSSGap, CSSMargin, CSSPadding } from "app/styles/constants";
import { Product } from "app/types2";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const GoodsListComponent = ({ userId }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const URI = getSellerProductsURI(userId, page);

    axios
      .get(URI)
      .then((resp) => setProducts(resp.data))
      .catch(console.log);
  }, [page, userId]);

  return (
    <Box>
      <Typography variant="h4" marginBottom={CSSMargin.Small}>
        Товары, предлагаемые пользователем:
      </Typography>
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
                            style={{ objectFit: "contain" }}
                            src={product.photos[0]?.url}
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
                    <Rating value={5} readOnly />
                  </Grid>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          sx={{ alignSelf: "end" }}
          page={page}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 0);
          }}
          count={10}
        />
      </Stack>
    </Box>
  );
};
