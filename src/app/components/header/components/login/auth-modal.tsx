import { Box, Button, Dialog, Input, Stack, Typography } from "@mui/material";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "app/hooks";
import { getUserData } from "app/store/core-reducer";
import { CSSGap, CSSPadding } from "app/styles/constants";
import { googleUrl, logInURL } from "app/constants/urls";
import { SignModalComponent } from "./sign-modal";

type Props = {
  setModal: (e: JSX.Element | null) => any;
};

type FormData = {
  login: string;
  password: string;
};

export const AuthModalComponent = ({ setModal }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { handleSubmit, register } = useForm<FormData>();

  const [error, setError] = useState("");

  const authorize = async (data: FormData) => {
    const hash = await bcrypt.hash(
      data.password,
      "$2a$10$jbODcXj6GS/Bc5rtxKmqne"
    );
    axios
      .post(
        logInURL,
        {
          login: data.login,
          password: hash,
        },
        { withCredentials: true }
      )
      .then(() => dispatch(getUserData()))
      .catch((e) => setError(e.response.data.message));
  };

  return (
    <Dialog open onClick={() => setModal(null)}>
      <Box padding={CSSPadding.Average} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(authorize)}>
          <Stack direction="column" alignItems="center" gap={CSSGap.Small}>
            <Input
              type="text"
              placeholder={t("login_popup_email")}
              {...register("login", { required: true })}
            />
            <Input
              type="password"
              placeholder={t("login_popup_password")}
              {...register("password", { required: true })}
            />
            <Button type="submit">{t("login_button")}</Button>
          </Stack>
        </form>
        <Typography color="red" textAlign="center">
          {error}
        </Typography>
        <Box padding={CSSPadding.Small}>
          <Stack alignItems="center" spacing={1}>
            <Typography variant="subtitle2">
              {t("login_popup_socials")}
            </Typography>
            <Button
              variant="outlined"
              fullWidth={true}
              onClick={() => {
                window.location.href = googleUrl;
              }}
            >
              {t("login_popup_google")}
            </Button>
            <Button
              variant="outlined"
              fullWidth={true}
              onClick={() =>
                setModal(<SignModalComponent setModal={(e) => setModal(e)} />)
              }
            >
              {t("login_popup_signin")}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
};
