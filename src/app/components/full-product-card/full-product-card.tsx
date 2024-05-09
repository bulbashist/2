import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Product } from "app/types2";
import defImg from "app/assets/default.webp";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
  FontWeight,
} from "app/styles/constants";
import { useDispatch } from "react-redux";
import { addToCart } from "app/pages/cart/slice";
import { useAppSelector } from "app/hooks";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

export const FullProductCardComponent = ({ product }: Props) => {
  const userId = useAppSelector((state) => state.core.id);
  const dispatch = useDispatch();

  return (
    <Card raised>
      <Grid container gap={CSSGap.Tiny} padding={CSSPadding.Small}>
        <Grid item xs={6}>
          <img
            src={product.photos[0]?.url ?? defImg}
            width="100%"
            height="100%"
            style={{ objectFit: "contain" }}
            alt=""
          />
        </Grid>
        <Grid item xs={5}>
          <Box padding={CSSPadding.Small} style={{ textAlign: "left" }}>
            <Stack direction="column">
              <Typography variant="h3" fontWeight={FontWeight.Normal}>
                {product.name}
              </Typography>
              <List>
                <Typography variant="h5">
                  <Link to={`/users/${product.seller.id}`}>
                    Продавец: {product.seller.name}
                  </Link>
                </Typography>
                <p>Длина: {product.width}</p>
                <p>Ширина: {product.breadth}</p>
                <p>Высота: {product.height}</p>
                <p>Тип: {product.category.name}</p>
                <p>Производитель: {product.manufacturer.name}</p>
              </List>
              <Card variant="outlined">
                <Box padding={CSSPadding.Small}>
                  <Box marginBottom={CSSMargin.Tiny}>
                    <Stack direction="row" gap={CSSGap.Decent}>
                      <Typography color="GrayText">
                        {product.price} BYN{" "}
                      </Typography>
                      <Typography
                        color="GrayText"
                        sx={{ textDecoration: "line-through" }}
                      >
                        {+product.price + 4} BYN{" "}
                      </Typography>
                    </Stack>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!userId}
                    onClick={() => dispatch(addToCart({ product, count: 1 }))}
                  >
                    Добавить в корзину
                  </Button>
                </Box>
              </Card>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} marginTop={CSSMargin.Decent}>
          <Typography textAlign="left">Галерея:</Typography>
          {product.photos.length !== 0 ? (
            <List>
              {product.photos.map((photo) => (
                <ListItem key={photo.id}>
                  <Box width={100}>
                    <img
                      width="100%"
                      height="100%"
                      style={{ objectFit: "contain" }}
                      src={photo.url}
                      alt=""
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography textAlign="left" marginTop={CSSMargin.Small}>
              У товара пока нету фотографий
            </Typography>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};
