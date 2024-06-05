import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

type FormData = {
  text: string;
};

export const SearchComponent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { t } = useTranslation();

  const search = ({ text }: FormData) => {
    if (!text) return;
    navigate(`/search?search=${text}`);
  };

  return (
    <Box position="relative">
      <form onSubmit={handleSubmit(search)}>
        <Stack direction="row" width={250}>
          <Input
            placeholder={t("header_search_placeholder")}
            fullWidth={true}
            error={errors.text !== undefined}
            {...register("text", {
              minLength: {
                value: 4,
                message: "Поиск - минимум 4 символа",
              },
            })}
          />
          <Button
            type="submit"
            sx={{ borderBottom: "solid 1px grey", borderRadius: 0 }}
            variant="text"
          >
            <Typography>🔍</Typography>
          </Button>
        </Stack>
      </form>
      <Typography width={250} position="absolute" bottom={35} color="red">
        {errors.text?.message}
      </Typography>
    </Box>
  );
};
