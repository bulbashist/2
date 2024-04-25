import axios from "axios";
import { useEffect, useState } from "react";
import { productsOfCategoryURI, productsURI } from "app/constants/urls2";
import { Product } from "app/types2";
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
import { CSSGap, CSSPadding } from "app/styles/constants";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/hooks";

export const CatalogComponent = () => {
  const category = useAppSelector((state) => state.main.category);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const URI = productsOfCategoryURI(category, page);

    axios
      .get(URI)
      .then((resp) => setProducts(resp.data))
      .catch(console.log);
  }, [category, page]);

  return (
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
  );
};
