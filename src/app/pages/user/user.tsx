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

export const UserPage = () => {
  const { data, loading } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData(+id!));
  }, [id, dispatch]);

  if (loading) return <div className={styles.loading} />;
  if (!data) return <NoPage />;

  return (
    <PageWrapperComponent>
      <Stack direction="column" gap={CSSGap.Average} margin={CSSMargin.Average}>
        <PaycardFormComponent cards={data.cards} />
        {/* <Stack direction="row">
            <Typography variant="h5" marginRight={CSSMargin.Average}>
              {data.name}
            </Typography>
          </Stack> */}
        <OrderListComponent />
      </Stack>
    </PageWrapperComponent>
  );
};
