import OrderListComponent from "./components/order-list";
import PageWrapperComponent from "../../components/page-wrapper";

export const OrdersPage = () => {
  return (
    <PageWrapperComponent>
      <OrderListComponent />
    </PageWrapperComponent>
  );
};
