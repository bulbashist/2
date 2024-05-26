import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { CartProduct } from "app/pages/cart/slice";
import { loadStripe } from "@stripe/stripe-js";
import { Stripe } from "stripe";

const initiatePayment = async (sum: string) => {
  const sStripe = new Stripe(
    "sk_test_51PICnDRrodiK0hZ42ViGQjGmxqNL725FKtkZPsBSuvmAKkRe2Jw27Sr0ZHAD2yGZACHl5VT9qnCXLUlctksmw8dr00hzKb6I5g"
  );
  const session = await sStripe.checkout.sessions.create({
    expand: ["line_items"],
    payment_method_types: ["card"],
    success_url: `http://localhost:4000/cart`,
    cancel_url: `http://localhost:4000/cart`,

    line_items: [
      {
        price_data: {
          currency: "byn",
          unit_amount: +sum * 100,
          product_data: {
            name: "sdf",
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });
  console.log(session);
  window.open(session.url!, "_blank");

  const stripe = await loadStripe(
    "pk_test_51PICnDRrodiK0hZ4kQvbYlizUgUkMNnGEhuLnlpvIHRzfyfz3ityjLIWk7LV1p1ljibx6ngyaGkew4LWKfEsc29C00MyZlFgwk"
  );
  stripe?.initEmbeddedCheckout({
    clientSecret: session.client_secret!,
  });
  return true;
};

const printCheck = async (objs: CartProduct[]) => {
  const docDefinition = {
    content: [
      `Номер заказа: ${1}`,
      "Товары:",
      {
        ol: objs.map((obj) => `${obj.product.name}: ${obj.count}`),
      },
      `Сумма: ${objs
        .reduce((sum, slice) => sum + slice.product.price * slice.count, 0)
        .toFixed(2)}`,
    ],
  };
  //@ts-ignore
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const newWindow = window.open("", "_blank");
  pdfMake.createPdf(docDefinition).open({}, newWindow);
};

export { initiatePayment, printCheck };
