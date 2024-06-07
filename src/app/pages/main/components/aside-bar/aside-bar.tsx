import { Box, Button, Stack, Typography } from "@mui/material";
import { categoriesURI } from "app/constants/urls";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Category } from "app/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { changeCategory } from "../../store/slice";
import { useTranslation } from "react-i18next";

export const AsideBarComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const category = useAppSelector((state) => state.main.category);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get(categoriesURI)
      .then((resp) => setCategories(resp.data))
      .catch(console.log);
  }, []);

  const btnHandler = (cName: string | null) => {
    dispatch(changeCategory(cName));
  };

  return (
    <Box>
      <Stack direction="column" alignItems="flex-start">
        <Button color="inherit" onClick={() => btnHandler(null)}>
          <Typography textAlign="left" textTransform="none">
            {t("Все категории")}
          </Typography>
        </Button>
        {categories.map((cat) => (
          <Button
            variant="text"
            color={category === cat.name ? "info" : "inherit"}
            key={cat.id}
            onClick={() => btnHandler(cat.name)}
          >
            <Typography textAlign="left" textTransform="none">
              {t(cat.name)}
            </Typography>
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
