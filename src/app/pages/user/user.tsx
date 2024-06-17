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
import GoodsListComponent from "./components/goods-list";
import { UserRights } from "app/types";
import { Box, Button, Dialog, Input, List } from "@mui/material";
import DialogFailure from "app/components/utility/dialog-failure";
import axios from "axios";
import { usersURL } from "app/constants/urls";
import { useTranslation } from "react-i18next";

export const UserPage = () => {
  const { data, loading } = useAppSelector((state) => state.user);
  const { id, rights } = useAppSelector((state) => state.core);
  const { id: userId } = useParams();
  const dispatch = useAppDispatch();
  const [nameDialog, setNameDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const { t } = useTranslation();

  const shouldBeVisible = () => id === data?.id || rights >= UserRights.ADMIN;

  const changeName = () => {
    axios
      .patch(usersURL + userId, { name: newName }, { withCredentials: true })
      .then(
        () => {
          dispatch(changeUserName(newName));
          setNameDialog(false);
        },
        () => setNameErr(true)
      );
  };

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
          <DialogFailure
            isOpen={nameErr}
            close={() => setNameErr(false)}
            msg="err_name_change"
          />
          <Stack direction="column" gap={CSSGap.Small}>
            <Typography variant="h5">{t("profile_new_name")}</Typography>
            <Input
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Button onClick={changeName}>{t("profile_name_confirm")}</Button>
          </Stack>
        </Box>
      </Dialog>
      <Stack direction="column" gap={CSSGap.Average} margin={CSSMargin.Average}>
        <Stack
          direction="row"
          justifyContent="space-between"
          paddingX={CSSPadding.Average}
        >
          {data.id === id ? (
            <Button>
              <Link to="/stats">
                <Typography>{t("profile_to_stats")}</Typography>
              </Link>
            </Button>
          ) : null}
          <List>
            <Typography variant="h5" marginRight={CSSMargin.Average}>
              {data.name}
            </Typography>
            {data.id === id ? (
              <Button onClick={() => setNameDialog(true)}>
                <Typography textTransform="none">
                  {t("profile_change_name")}
                </Typography>
              </Button>
            ) : (
              <></>
            )}
          </List>
        </Stack>
        {shouldBeVisible() ? (
          <>
            <></>
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
