import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { changeFilter } from "../../store/slice";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { CSSGap } from "../../../../styles/constants";
import { useTranslation } from "react-i18next";

const items = [
  {
    name: "main_popular",
    filter: "popular",
  },
  {
    name: "main_newest",
    filter: "new",
  },
];

export const FilterPanelComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.main.filter);
  const { t } = useTranslation();

  return (
    <Stack gap={CSSGap.Small} sx={{ width: "100%" }}>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" maxWidth="md">
            {items.map((item, i) => (
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
                    item.filter === filter ? "#1199ff" : "transparent",
                }}
                onClick={() => dispatch(changeFilter(item.filter))}
              >
                <Typography
                  display="block"
                  margin="0 auto"
                  width="100%"
                  variant="subtitle1"
                  textTransform="none"
                  textAlign="center"
                >
                  {t(item.name)}
                </Typography>
              </Button>
            ))}
          </Stack>
          {isOpen ? (
            <ArrowDropUp onClick={() => setIsOpen(false)} />
          ) : (
            <ArrowDropDown onClick={() => setIsOpen(true)} />
          )}
        </Stack>
      </Box>
    </Stack>
  );
};
