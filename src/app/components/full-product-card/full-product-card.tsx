import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Product, UserRights } from "app/types";
import defImg from "app/assets/default.webp";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
  FontWeight,
} from "app/styles/constants";
import { useDispatch } from "react-redux";
import { addToCart, changeProductAmount } from "app/pages/cart/slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  AddOutlined,
  DeleteForever,
  EditNote,
  RemoveOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { productsURI } from "app/constants/urls";
import { removeProduct, setEditingState } from "app/pages/product/store/slice";

type Props = {
  product: Product;
};

export const FullProductCardComponent = ({ product }: Props) => {
  const { id: userId, rights } = useAppSelector((state) => state.core);
  const cartProduct = useAppSelector((state) => state.cart).find(
    (p) => p.product.id === product.id
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addOne = () => {
    dispatch(
      changeProductAmount({
        id: product.id,
        amount: cartProduct!.count + 1,
      })
    );
  };

  const removeOne = () => {
    dispatch(
      changeProductAmount({
        id: product.id,
        amount: cartProduct!.count - 1,
      })
    );
  };

  return (
    <Card raised>
      <Box position="relative" padding={CSSPadding.Decent}>
        <Box position="absolute" top={16} right={16}>
          <Stack direction="row">
            {userId === product.seller.id || rights >= UserRights.ADMIN ? (
              <>
                <EditNote onClick={() => dispatch(setEditingState(true))} />
                <DeleteForever
                  onClick={() => {
                    dispatch(removeProduct(product.id)).then(() =>
                      navigate("/")
                    );
                  }}
                />
              </>
            ) : null}
          </Stack>
        </Box>
        <Grid
          container
          padding={CSSPadding.Small}
          justifyContent="space-around"
        >
          <Grid item xs={5}>
            <img
              src={product.photos[0]?.url ?? defImg}
              width="100%"
              height="100%"
              style={{ objectFit: "contain" }}
              alt=""
            />
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="left">
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column">
                  <Typography variant="h3" fontWeight={FontWeight.Normal}>
                    {product.name}
                  </Typography>
                  <List>
                    <p>Длина, см: {product.width}</p>
                    <p>Ширина, см: {product.breadth}</p>
                    <p>Высота, см: {product.height}</p>
                    <p>Тип: {product.category.name}</p>
                    <p>Производитель: {product.manufacturer.name}</p>
                  </List>
                  <Card variant="outlined">
                    <Box padding={CSSPadding.Small}>
                      <Box marginBottom={CSSMargin.Tiny}>
                        <Stack direction="row" gap={CSSGap.Decent}>
                          <Typography color="GrayText">
                            {product.price * (1 - product.discount / 100)} BYN{" "}
                          </Typography>
                          <Typography
                            color="GrayText"
                            sx={{ textDecoration: "line-through" }}
                          >
                            {product.price} BYN{" "}
                          </Typography>
                        </Stack>
                      </Box>

                      {cartProduct ? (
                        <Stack direction="row" alignItems="center">
                          <Button variant="contained" color="success">
                            <Link to="/cart">В корзине</Link>
                          </Button>
                          <Button onClick={removeOne}>
                            <RemoveOutlined />
                          </Button>
                          <Typography>{cartProduct.count}</Typography>
                          <Button onClick={addOne}>
                            <AddOutlined />
                          </Button>
                        </Stack>
                      ) : (
                        <Button
                          variant="contained"
                          fullWidth
                          disabled={!userId}
                          onClick={() =>
                            dispatch(addToCart({ product, count: 1 }))
                          }
                        >
                          Добавить в корзину
                        </Button>
                      )}
                    </Box>
                  </Card>
                </Stack>
                <Box>
                  <ListItem>
                    <Avatar sx={{ marginRight: CSSMargin.Small }} />
                    <List>
                      <Typography variant="subtitle2">
                        {product.seller.name}
                      </Typography>
                      <Typography variant="subtitle2">
                        <Link to={`/users/${product.seller.id}`}>
                          Перейти к продавцу
                        </Link>
                      </Typography>
                    </List>
                  </ListItem>
                </Box>
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
      </Box>
    </Card>
  );
};
