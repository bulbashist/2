import { Box, Card, Stack, Typography } from "@mui/material";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
  FontWeight,
} from "app/styles/constants";
import { useTranslation } from "react-i18next";
import { Order } from "app/pages/orders/types";
import { Product } from "app/types";
import defImg from "app/assets/default.webp";
import { Link } from "react-router-dom";

type Props = {
  order: Order;
};

export const OrderBlockComponent = ({ order }: Props) => {
  const { t } = useTranslation();

  const getTotal = () => {
    return order.products.reduce((acc, curr) => acc + +curr.sum, 0).toFixed(2);
  };

  return (
    <Box margin={CSSMargin.Decent}>
      <Typography variant="h4">Заказ №{order.id}</Typography>
      <Box padding={CSSPadding.Small}>
        <Stack direction="column" gap={CSSGap.Small}>
          {order.products.map((obj, i) => (
            <Card raised key={i}>
              <Link to={`/products/${obj.product.id}`}>
                <Box padding={CSSPadding.Small}>
                  <FullProductCardComponent2
                    product={obj.product}
                    count={obj.count}
                  />
                </Box>
              </Link>
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
  count: number;
};

export const FullProductCardComponent2 = ({ product, count }: Props2) => {
  return (
    <Stack direction="row">
      <Box>
        <img
          src={product.photos[0]?.url ?? defImg}
          width={150}
          height={170}
          alt=""
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Box paddingX={CSSPadding.Small} style={{ textAlign: "left" }}>
        <Stack direction="column" alignItems="left">
          <Typography
            variant="h6"
            paddingBottom={CSSPadding.Tiny}
            fontWeight={500}
          >
            {product.name}
          </Typography>
          <Typography
            variant="h6"
            color="GrayText"
            paddingBottom={CSSPadding.Small}
            fontWeight={500}
          >
            {product.material}
          </Typography>
          <Typography
            fontSize={14}
            fontWeight={FontWeight.Bold}
            paddingBottom={CSSPadding.Decent}
          >
            Количество: {count}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};
