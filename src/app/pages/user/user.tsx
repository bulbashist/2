import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NoPage from "app/pages/404";
import PageWrapperComponent from "app/components/page-wrapper";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CSSGap, CSSMargin, CSSPadding } from "app/styles/constants";
import OrderListComponent from "./components/order-list";
import { changeUserName, getUserData } from "./store/slice";
import styles from "app/styles/animations.module.css";
import PaycardFormComponent from "./components/paycard-form";
import GoodsListComponent from "./components/goods-list";
import { UserRights } from "app/types";
import { Box, Button, Dialog, Input, List } from "@mui/material";

export const UserPage = () => {
  const { data, loading } = useAppSelector((state) => state.user);
  const { id, rights } = useAppSelector((state) => state.core);
  const { id: userId } = useParams();
  const dispatch = useAppDispatch();
  const [nameDialog, setNameDialog] = useState(false);
  const [newName, setNewName] = useState("");

  const shouldBeVisible = () => id === data?.id || rights >= UserRights.ADMIN;

  useEffect(() => {
    dispatch(getUserData(+userId!));
  }, [userId, dispatch]);

  if (loading) return <div className={styles.loading} />;
  if (!data) return <NoPage />;

  return (
    <PageWrapperComponent>
      <Dialog open={nameDialog} onClick={() => setNameDialog(false)}>
        <Box
          textAlign="center"
          margin={CSSMargin.Average}
          onClick={(e) => e.stopPropagation()}
        >
          <Stack direction="column" gap={CSSGap.Small}>
            <Typography variant="h5">Введите новое имя</Typography>
            <Input
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Button
              onClick={() => {
                dispatch(changeUserName({ id: data.id, name: newName }));
                setNameDialog(false);
              }}
            >
              Подтвердить
            </Button>
          </Stack>
        </Box>
      </Dialog>
      <Stack direction="column" gap={CSSGap.Average} margin={CSSMargin.Average}>
        <Stack
          direction="row"
          justifyContent="space-between"
          paddingX={CSSPadding.Average}
        >
          <Button>
            <Link to="/stats">
              <Typography>Просмотреть статистику</Typography>
            </Link>
          </Button>
          <List>
            <Typography variant="h5" marginRight={CSSMargin.Average}>
              {data.name}
            </Typography>
            {id === data?.id ? (
              <Button onClick={() => setNameDialog(true)}>
                <Typography textTransform="none">Сменить имя</Typography>
              </Button>
            ) : (
              <></>
            )}
          </List>
        </Stack>
        {shouldBeVisible() ? (
          <>
            <PaycardFormComponent cards={data.cards} />
            <OrderListComponent />
          </>
        ) : (
          <></>
        )}
        <GoodsListComponent />
      </Stack>
    </PageWrapperComponent>
  );
};
