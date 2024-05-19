import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { CartProduct } from "app/pages/cart/slice";
import { loadStripe } from "@stripe/stripe-js";

const initiatePayment = async () => {
  const stripe = await loadStripe(
    "pk_test_51PICnDRrodiK0hZ4kQvbYlizUgUkMNnGEhuLnlpvIHRzfyfz3ityjLIWk7LV1p1ljibx6ngyaGkew4LWKfEsc29C00MyZlFgwk"
  );
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
