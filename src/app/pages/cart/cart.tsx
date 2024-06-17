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
  Button,
  Dialog,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CSSGap, CSSMargin, CSSPadding } from "app/styles/constants";
import axios from "axios";
import { officesURI } from "app/constants/urls";
import { Office } from "app/types";
import { initiatePayment, printCheck } from "app/services/payment";
import { orderWSC } from "../orders/services/order-connection";
import { WSOrderEvents } from "../product/components/comment-block/services/types";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Close } from "@mui/icons-material";
import DialogSuccess from "app/components/utility/dialog-success";

const CartPage = () => {
  const [params] = useSearchParams();
  const products = useAppSelector((state) => state.cart);
  const userId = useAppSelector((state) => state.core.id);
  const [offices, setOffices] = useState<Office[]>([]);

  const [success, setSuccess] = useState(false);

  const [selectedOfficeId, setSelectedOfficeId] = useState<number | null>(null);

  const { t } = useTranslation();
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
  }, [userId]);

  useEffect(() => {
    setSuccess(params.get("success") === "true");

    if (success) {
      const order = JSON.parse(localStorage.getItem("temp-order")!);
      orderWSC.connect(process.env.REACT_APP_WS_SERVER!, "76");
      orderWSC.emit(WSOrderEvents.CreateOrder, order);
      dispatch(resetCart());
      localStorage.removeItem("temp-order");
    }
  }, [params, dispatch, success]);

  const paymentHandler = async () => {
    if (!userId) return;
    if (products.length === 0) return;

    // await printCheck(products);

    const arg = {
      products,
      office: { id: selectedOfficeId },
      user: { id: userId },
      status: { id: 1 },
    };

    localStorage.setItem("temp-order", JSON.stringify(arg));
    initiatePayment(getTotal());
  };

  if (!userId) {
    return (
      <PageWrapperComponent>
        <Box padding={CSSPadding.Large}>
          <Typography>{t("cart_unregistred")}</Typography>
        </Box>
      </PageWrapperComponent>
    );
  }

  return (
    <PageWrapperComponent>
      <DialogSuccess
        isOpen={success}
        close={() => navigate(`/users/${userId}`)}
        msg="success_new_order"
      />
      <Box padding={CSSPadding.Decent} height="100%">
        <Typography
          textAlign="left"
          variant="h5"
          marginBottom={CSSMargin.Average}
        >
          {t("cart_cart")}
        </Typography>

        <Typography textAlign="left" variant="h6" marginBottom={CSSMargin.Tiny}>
          {t("cart_goods")}
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
                onChange={(e, selected) => {
                  setSelectedOfficeId(selected?.value ?? null);
                }}
                renderInput={(params) => (
                  //@ts-ignore
                  <TextField {...params} label="Адрес доставки" />
                )}
              />
              <Stack direction="row" alignItems="center" gap={CSSGap.Small}>
                <Typography>
                  {t("cart_total")} {getTotal()}
                </Typography>
                <PaymentButton
                  disabled={!selectedOfficeId || products.length === 0}
                  onClick={() => paymentHandler()}
                >
                  {t("cart_payment_btn")}
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
