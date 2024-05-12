import { useEffect } from "react";
import { useParams } from "react-router";
import PageWrapperComponent from "app/components/page-wrapper";
import NoPage from "app/pages/404";
import { useAppDispatch, useAppSelector } from "app/hooks";
import OrderBlockComponent from "./components/order-block";
import styles from "app/styles/animations.module.css";
import { orderWSC } from "../orders/services/order-connection";
import { WSOrderEvents } from "../product/components/comment-block/services/types";

export const OrderPage = () => {
  const { data, loading } = useAppSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      orderWSC.connect(process.env.REACT_APP_WS_SERVER!, "78");
      orderWSC.emit(WSOrderEvents.FindOneOrder);
      return () => orderWSC.close();
    }
  }, [id, dispatch]);

  if (loading) return <div className={styles.loading} />;
  if (!data) return <NoPage />;

  return (
    <PageWrapperComponent>
      <OrderBlockComponent order={data} />
    </PageWrapperComponent>
  );
};
