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
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CSSGap, CSSMargin, CSSPadding } from "app/styles/constants";

import { useTranslation } from "react-i18next";
import { Order } from "app/pages/orders/types";
import FullProductCardComponent from "app/components/full-product-card";
import { Product } from "app/types2";
import defImg from "app/assets/default.webp";

type Props = {
  order: Order;
};

export const OrderBlockComponent = ({ order }: Props) => {
  const userId = useAppSelector((state) => state.core.id);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const getTotal = () => {
    return order.products.reduce(
      (acc, curr) => acc + curr.product.price * curr.count,
      0
    );
  };

  return (
    <Box margin={CSSMargin.Decent}>
      <Typography variant="h4">Заказ №{order.id}</Typography>
      <Box padding={CSSPadding.Small}>
        <Stack direction="column" gap={CSSGap.Small}>
          {order.products.map((obj, i) => (
            <Card raised key={i}>
              <Box padding={CSSPadding.Small}>
                <FullProductCardComponent2 product={obj.product} />
                <Typography variant="h4" textAlign="right">
                  Количество: {obj.count}
                </Typography>
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>
      <Typography variant="h4" textAlign="right">
        Итого: {getTotal()} BYN
      </Typography>
    </Box>
  );
};

type Props2 = {
  product: Product;
};

export const FullProductCardComponent2 = ({ product }: Props2) => {
  return (
    <Box margin={CSSMargin.Tiny}>
      <Grid container gap={CSSGap.Tiny}>
        <Grid item xs={6}>
          <img src={product.photos[0]?.url ?? defImg} width={200} alt="" />
        </Grid>
        <Grid item xs={5}>
          <Box padding={CSSPadding.Small} style={{ textAlign: "left" }}>
            <Stack direction="column">
              <Typography variant="h3" fontWeight={500}>
                {product.name}
              </Typography>
              <Typography variant="h6" fontWeight={500}>
                ID продукта: {product.id}
              </Typography>
              <Typography variant="h6" fontWeight={500}>
                Стоимость: {product.price} BYN
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <List>
            {product.photos.map((photo) => (
              <img src={photo.url} alt="" />
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};
