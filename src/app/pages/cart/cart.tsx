import { useAppDispatch, useAppSelector } from "../../hooks";
// import { initiatePayment, printCheck } from "../../services/payment";
import { CartGrid, PaymentButton } from "./styles";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { resetCart } from "./slice";
import CartProductCardComponent from "app/components/cart-product-card";
import PageWrapperComponent from "app/components/page-wrapper";
import {
  Autocomplete,
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CSSGap, CSSMargin, CSSPadding } from "app/styles/constants";
import axios from "axios";
import { officesURI, paycardsURI } from "app/constants/urls";
import { Office, Paycard } from "app/types";
import { initiatePayment, printCheck } from "app/services/payment";
import { orderWSC } from "../orders/services/order-connection";
import { WSOrderEvents } from "../product/components/comment-block/services/types";

const CartPage = () => {
  const products = useAppSelector((state) => state.cart);
  const userId = useAppSelector((state) => state.core.id);
  const [offices, setOffices] = useState<Office[]>([]);
  const [paycards, setPaycards] = useState<Paycard[]>([]);

  const [selectedOfficeId, setSelectedOfficeId] = useState<number | null>(null);
  const [selectedPaycardId, setSelectedPaycardId] = useState<number | null>(
    null
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getTotal = () => {
    return products
      .reduce(
        (sum, slice) =>
          sum +
          slice.product.price *
            (1 - slice.product.discount / 100) *
            slice.count,
        0
      )
      .toFixed(2);
  };

  useEffect(() => {
    axios
      .get(officesURI)
      .then((resp) => setOffices(resp.data))
      .catch(console.log);

    if (userId) {
      axios
        .get(paycardsURI + userId)
        .then((resp) => setPaycards(resp.data))
        .catch(console.log);
    }
  }, [userId]);

  const paymentHandler = async () => {
    if (!userId) return;

    const response = await initiatePayment();
    if (response && products.length !== 0) {
      await printCheck(products);

      if (selectedOfficeId) {
        const arg = {
          products,
          office: { id: selectedOfficeId },
          user: { id: userId },
          status: { id: 1 },
        };

        orderWSC.connect(process.env.REACT_APP_WS_SERVER!, "76");
        orderWSC.emit(WSOrderEvents.CreateOrder, arg);
        dispatch(resetCart());
      }
      navigate("/");
    }
  };

  if (!userId) {
    return (
      <PageWrapperComponent>
        <Box padding={CSSPadding.Large}>
          <Typography>Зарегистрируйтесь, чтобы начать покупки</Typography>
        </Box>
      </PageWrapperComponent>
    );
  }

  return (
    <PageWrapperComponent>
      <Box padding={CSSPadding.Decent} height="100%">
        <Typography
          textAlign="left"
          variant="h5"
          marginBottom={CSSMargin.Average}
        >
          Корзина
        </Typography>

        <Typography textAlign="left" variant="h6" marginBottom={CSSMargin.Tiny}>
          Товары:
        </Typography>
        <Grid container>
          <Grid item xs={7}>
            <Grid container gap={CSSGap.Small} justifyContent="center">
              {products.map((obj, i) => (
                <Grid item xs={12} key={i}>
                  <CartProductCardComponent key={obj.product.id} obj={obj} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Stack direction="column" gap={CSSGap.Average} alignItems="end">
              <Autocomplete
                sx={{ width: 300 }}
                options={offices.map((office) => ({
                  label: office.location,
                  value: office.id,
                }))}
                // placeholder="Адрес доставки"
                onChange={(e, selected) => {
                  setSelectedOfficeId(selected?.value ?? null);
                }}
                //@ts-ignore
                renderInput={(params) => <TextField {...params} />}
              />
              <Autocomplete
                sx={{ width: 300 }}
                options={paycards.map((paycard) => ({
                  label: paycard.cardNumber,
                  value: paycard.id,
                }))}
                // placeholder="Карта"
                onChange={(e, selected) => {
                  setSelectedPaycardId(selected?.value ?? null);
                }}
                //@ts-ignore
                renderInput={(params) => <TextField {...params} />}
              />
              <Stack direction="row" alignItems="center" gap={CSSGap.Small}>
                <Typography>Всего: {getTotal()}</Typography>
                <PaymentButton
                  disabled={
                    !selectedOfficeId ||
                    !selectedPaycardId ||
                    products.length === 0
                  }
                  onClick={() => paymentHandler()}
                >
                  Оплатить
                </PaymentButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </PageWrapperComponent>
  );
};

//TODO
export default CartPage;
