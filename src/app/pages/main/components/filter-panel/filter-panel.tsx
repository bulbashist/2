import { Box, Button, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { changeFilter } from "../../store/slice";
import { CSSGap } from "../../../../styles/constants";
import { useTranslation } from "react-i18next";
import { sortVariants } from "app/pages/user/types";

export const FilterPanelComponent = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.main.filter);
  const { t } = useTranslation();

  return (
    <Stack gap={CSSGap.Small}>
      <Box>
        <Stack direction="row" maxWidth="md">
          {sortVariants.map((item, i) => (
            <Button
              variant="text"
              key={i}
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                borderBottom: "3px solid transparent",
                borderRadius: 0,
                borderBottomColor:
                  item.value === filter ? "#1199ff" : "transparent",
              }}
              onClick={() => dispatch(changeFilter(item.value))}
            >
              <Typography
                display="block"
                margin="0 auto"
                width="100%"
                variant="subtitle1"
                textTransform="none"
                textAlign="center"
              >
                {t(item.label)}
              </Typography>
            </Button>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
