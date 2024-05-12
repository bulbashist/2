import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import { CSSGap, CSSMargin, CSSPadding } from "app/styles/constants";
import { Product } from "app/types";
import defImg from "app/assets/default.webp";
import { changeProductAmount } from "app/pages/cart/slice";
import { Add, Remove } from "@mui/icons-material";

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

  return (
    <Card raised>
      <Box padding={CSSPadding.Small}>
        <FullProductCardComponent2 product={obj.product} />
        <Typography variant="h6">Количество:</Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={CSSGap.Small}
        >
          <Button
            variant="outlined"
            onClick={() => changeAmount(obj.product.id, obj.count - 1)}
          >
            <Remove />
          </Button>
          <Typography variant="h6">{obj.count}</Typography>
          <Button
            variant="outlined"
            onClick={() => changeAmount(obj.product.id, obj.count + 1)}
          >
            <Add />
          </Button>
        </Stack>
      </Box>
    </Card>
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
          <img
            src={product.photos[0]?.url ?? defImg}
            width={200}
            height={200}
            alt=""
          />
        </Grid>
        <Grid item xs={5}>
          <Box padding={CSSPadding.Small} style={{ textAlign: "left" }}>
            <Stack direction="column">
              <Typography
                variant="h4"
                height={100}
                overflow="scroll"
                fontWeight={500}
              >
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
      </Grid>
    </Box>
  );
};
