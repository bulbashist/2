import { useAppDispatch, useAppSelector } from "../../hooks";
// import { initiatePayment, printCheck } from "../../services/payment";
import { CartGrid, ControlsBlock, PaymentButton } from "./styles";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { resetCart } from "./slice";
import CartProductCardComponent from "app/components/cart-product-card";
import PageWrapperComponent from "app/components/page-wrapper";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { CSSGap, CSSPadding } from "app/styles/constants";
import axios from "axios";
import { officesURI, paycardsURI } from "app/constants/urls";
import { Office, Paycard } from "app/types";
import { initiatePayment, printCheck } from "app/services/payment";
import { createOrder } from "../order/store/slice";

const CartPage = () => {
  const products = useAppSelector((state) => state.cart);
  const userId = useAppSelector((state) => state.core.id);
  const [offices, setOffices] = useState<Office[]>([]);
  const [paycards, setPaycards] = useState<Paycard[]>([]);

  const [selectedOfficeId, setSelectedOfficeId] = useState<number | null>(null);
  const [selectedPaycardId, setSelectedPaycardId] = useState<number | null>(
    null
  );

  // const clientId = useAppSelector((state) => state.auth.id);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

        dispatch(createOrder(arg));
        dispatch(resetCart());
      }
      navigate("/");
    }
  };

  return (
    <PageWrapperComponent>
      <Box padding={CSSPadding.Small}>
        <CartGrid>
          <Grid container gap={CSSGap.Small} justifyContent="center">
            {products.map((obj, i) => (
              <Grid item xs={5.5} key={i}>
                <CartProductCardComponent key={obj.product.id} obj={obj} />
              </Grid>
            ))}
          </Grid>
          <ControlsBlock>
            <Autocomplete
              sx={{ width: 300 }}
              options={offices.map((office) => ({
                label: office.location,
                value: office.id,
              }))}
              placeholder="Адрес доставки"
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
              placeholder="Карта"
              onChange={(e, selected) => {
                setSelectedPaycardId(selected?.value ?? null);
              }}
              //@ts-ignore
              renderInput={(params) => <TextField {...params} />}
            />
            <p>
              Всего :{" "}
              {products
                .reduce(
                  (sum, slice) => sum + slice.product.price * slice.count,
                  0
                )
                .toFixed(2)}
            </p>
            <PaymentButton
              disabled={
                !selectedOfficeId || !selectedPaycardId || products.length === 0
              }
              onClick={() => paymentHandler()}
            >
              Оплатить
            </PaymentButton>
          </ControlsBlock>
        </CartGrid>
      </Box>
    </PageWrapperComponent>
  );
};

//TODO
export default CartPage;
