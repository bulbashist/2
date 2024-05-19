import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
  FontWeight,
} from "app/styles/constants";
import { Product } from "app/types";
import defImg from "app/assets/default.webp";
import { changeProductAmount, deleteFromCart } from "app/pages/cart/slice";
import { Add, Delete, Remove } from "@mui/icons-material";

type Props = {
  obj: {
    product: Product;
    count: number;
  };
};

export const CartProductCardComponent = ({ obj }: Props) => {
  const dispatch = useAppDispatch();

  const changeAmount = (id: number, amount: number) => {
    dispatch(
      changeProductAmount({
        id,
        amount,
      })
    );
  };

  const totalPerProduct = (obj: any) => {
    return (
      obj.product.price *
      obj.count *
      (1 - obj.product.discount / 100)
    ).toFixed(2);
  };

  return (
    <Card raised>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        padding={CSSPadding.Small}
      >
        <FullProductCardComponent2 product={obj.product} />
        <Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={CSSGap.Tiny}
          >
            <Button
              variant="text"
              onClick={() => changeAmount(obj.product.id, obj.count - 1)}
            >
              <Remove />
            </Button>
            <Typography variant="h6">{obj.count}</Typography>
            <Button
              variant="text"
              onClick={() => changeAmount(obj.product.id, obj.count + 1)}
            >
              <Add />
            </Button>
          </Stack>
          <Stack direction="column">
            {obj.product.discount ? (
              <Typography
                fontSize={14}
                textAlign="right"
                color="pink"
                marginRight={CSSMargin.Average}
              >
                <s color="pink">{obj.product.price * obj.count} BYN</s>
              </Typography>
            ) : (
              <></>
            )}
            <Typography
              variant="h6"
              textAlign="right"
              marginRight={CSSMargin.Average}
            >
              {totalPerProduct(obj)} BYN
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

type Props2 = {
  product: Product;
};

export const FullProductCardComponent2 = ({ product }: Props2) => {
  const dispatch = useAppDispatch();

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
            {product.price * (1 - product.discount / 100)} BYN
          </Typography>
          <Delete
            color="info"
            onClick={() => dispatch(deleteFromCart(product.id))}
          />
        </Stack>
      </Box>
    </Stack>
  );
};
