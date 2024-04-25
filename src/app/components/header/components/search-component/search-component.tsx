import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const SearchComponent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const search = (data: any) => {
    navigate(`/search?search=${data.text}`);
  };

  return (
    <form
      onSubmit={handleSubmit(search)}
      style={{
        display: "flex",
        width: 250,
        justifyContent: "right",
        gap: 0,
      }}
    >
      <Input
        placeholder={t("header_search_placeholder")}
        fullWidth={true}
        error={errors.text !== undefined}
        {...register("text", { minLength: 4 })}
      />
      <Button
        type="submit"
        sx={{ borderBottom: "solid 1px grey", borderRadius: 0 }}
        variant="text"
      >
        <Typography>🔍</Typography>
      </Button>
    </form>
  );
};
