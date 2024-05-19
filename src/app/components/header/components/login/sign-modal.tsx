import { Box, Button, Dialog, Input, Stack, Typography } from "@mui/material";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "app/hooks";
import { signUpURL } from "app/constants/urls";
import { getUserData } from "app/store/core-reducer";
import { CSSGap, CSSPadding } from "app/styles/constants";

type Props = {
  setModal: (e: JSX.Element | null) => any;
};

type FormData = {
  login: string;
  password: string;
  name: string;
  phone: string;
};

export const SignModalComponent = ({ setModal }: Props) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, register } = useForm<FormData>();
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const registerUser = async (data: FormData) => {
    const hash = await bcrypt.hash(
      data.password,
      "$2a$10$jbODcXj6GS/Bc5rtxKmqne"
    );
    axios
      .post(
        signUpURL,
        {
          login: data.login,
          password: hash,
          ...(data.name && { name: data.name }),
          ...(data.phone && { phone: data.phone }),
        },
        { withCredentials: true }
      )
      .then(() => dispatch(getUserData()))
      .then(() => setModal(null))
      .catch((e) => setError(e.response.data.message));
  };

  return (
    <Dialog open onClick={() => setModal(null)}>
      <Box padding={CSSPadding.Average} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(registerUser)}>
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
            <Input
              type="text"
              placeholder={t("login_popup_name")}
              {...register("name")}
            />
            <Button type="submit">{t("login_popup_signin")}</Button>
          </Stack>
        </form>
        <Typography color="red" textAlign="center">
          {error}
        </Typography>
      </Box>
    </Dialog>
  );
};
