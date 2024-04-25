import { Box, Card, Grid, Rating, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { CSSGap, CSSPadding } from "../../../../styles/constants";
import { getSearchURI } from "app/constants/urls2";
import { Product } from "app/types2";
import defImg from "app/assets/default.webp";

export const ProductListComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const searchText = useSearchParams()[0].get("search");

  useEffect(() => {
    if (searchText) {
      const url = getSearchURI(searchText);
      axios
        .get(url)
        .then((resp) => setProducts(resp.data))
        .catch(console.error);
    }
  }, [searchText]);

  return (
    <Stack direction="column" gap={CSSGap.Small} width="100%">
      <Grid container gap={CSSGap.Small} columns={13}>
        {products.map((product) => (
          <Grid item xs={3} key={product.id}>
            <Card raised>
              <Box padding={CSSPadding.Small}>
                <Grid container gap={CSSGap.Tiny}>
                  <Grid item xs={8}>
                    <Box>
                      <Link to={`/products/${product.id}`}>
                        <img
                          width={200}
                          height={200}
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
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </Typography>
                  </Grid>
                  <Rating value={5} readOnly />
                </Grid>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
