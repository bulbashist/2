import { Box, Dialog } from "@mui/material";
import Typography from "@mui/material/Typography";
import PageWrapperComponent from "app/components/page-wrapper";
import { Button, Input, Stack } from "@mui/material";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "app/hooks";
import { scodeURI, sellerSignUpURI } from "app/constants/urls";
import { getUserData } from "app/store/core-reducer";
import { CSSGap, CSSPadding } from "app/styles/constants";
import { Check } from "@mui/icons-material";
import { useNavigate } from "react-router";
import Close from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

type FormData = {
  password: string;
  name: string;
  phone: string;
  vcode: string;
};

export const SellerSignPage = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, register } = useForm<FormData>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mailInput = useRef<HTMLInputElement>(null);

  const sendMail = () => {
    const email = mailInput.current?.value;
    axios
      .post(scodeURI, { email })
      .then(() => setSuccess(true))
      .catch(console.log);
  };

  const registerUser = async (data: FormData) => {
    const hash = await bcrypt.hash(
      data.password,
      "$2a$10$jbODcXj6GS/Bc5rtxKmqne"
    );
    axios
      .post(
        sellerSignUpURI,
        {
          login: mailInput.current?.value,
          password: hash,
          ...(data.name && { name: data.name }),
          ...(data.phone && { phone: data.phone }),
          vcode: data.vcode,
        },
        { withCredentials: true }
      )
      .then(() => {
        dispatch(getUserData());
        navigate("/");
      })
      .catch((e) => setError(e.response.data.message));
  };

  return (
    <PageWrapperComponent>
      <Dialog open>
        <Box position="absolute" top={16} right={16}>
          <Link to="/">
            <Close />
          </Link>
        </Box>
        <Box padding={CSSPadding.Decent} onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit(registerUser)}>
            <Box minWidth="250px">
              <Stack direction="column" alignItems="center" gap={CSSGap.Small}>
                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Input
                    type="email"
                    placeholder={t("seller_email")}
                    required
                    inputRef={mailInput}
                  />
                  {success ? (
                    <Check color="success" />
                  ) : (
                    <Button onClick={sendMail}>{t("seller_code_btn")}</Button>
                  )}
                </Stack>
                <Input
                  type="text"
                  placeholder={t("seller_code")}
                  fullWidth
                  {...register("vcode", { required: true })}
                />
                <Input
                  type="password"
                  placeholder={t("seller_password")}
                  fullWidth
                  {...register("password", { required: true })}
                />
                <Input
                  type="text"
                  fullWidth
                  placeholder={t("seller_name")}
                  {...register("name", { required: true })}
                />
                <Input
                  type="text"
                  fullWidth
                  placeholder={t("seller_phone")}
                  {...register("phone", { required: true })}
                />
                <Button type="submit">{t("seller_register_btn")}</Button>
              </Stack>
            </Box>
          </form>
          <Typography color="red" textAlign="center">
            {error}
          </Typography>
        </Box>
      </Dialog>
    </PageWrapperComponent>
  );
};
