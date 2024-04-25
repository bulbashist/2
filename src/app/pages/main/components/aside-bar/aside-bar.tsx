import { Box, Button, Stack, Typography } from "@mui/material";
import { categoriesURI } from "app/constants/urls2";
import { useAppDispatch } from "app/hooks";
import { Category } from "app/types2";
import axios from "axios";
import { useEffect, useState } from "react";
import { changeCategory } from "../../store/slice";

export const AsideBarComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
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
        <Button onClick={() => btnHandler(null)}>
          <Typography textAlign="left">Все категории</Typography>
        </Button>
        {categories.map((cat) => (
          <Button key={cat.id} onClick={() => btnHandler(cat.name)}>
            <Typography textAlign="left">{cat.name}</Typography>
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
