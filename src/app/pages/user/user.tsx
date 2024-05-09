import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NoPage from "app/pages/404";
import PageWrapperComponent from "app/components/page-wrapper";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CSSGap, CSSMargin } from "app/styles/constants";
import OrderListComponent from "./components/order-list";
import { getUserData } from "./store/slice";
import styles from "app/styles/animations.module.css";
import PaycardFormComponent from "./components/paycard-form";
import GoodsListComponent from "./components/goods-list";
import { UserRights } from "app/types2";

export const UserPage = () => {
  const { data, loading } = useAppSelector((state) => state.user);
  const { id, rights } = useAppSelector((state) => state.core);
  const { id: userId } = useParams();
  const dispatch = useAppDispatch();

  const shouldBeVisible = () => id === data?.id || rights >= UserRights.ADMIN;

  useEffect(() => {
    dispatch(getUserData(+userId!));
  }, [userId, dispatch]);

  if (loading) return <div className={styles.loading} />;
  if (!data) return <NoPage />;

  return (
    <PageWrapperComponent>
      <Stack direction="column" gap={CSSGap.Average} margin={CSSMargin.Average}>
        <Stack direction="row-reverse">
          <Typography variant="h5" marginRight={CSSMargin.Average}>
            {data.name}
          </Typography>
        </Stack>
        {shouldBeVisible() ? (
          <>
            <PaycardFormComponent cards={data.cards} />
            <OrderListComponent />
          </>
        ) : (
          <></>
        )}
        <GoodsListComponent userId={data.id} />
      </Stack>
    </PageWrapperComponent>
  );
};
