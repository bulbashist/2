import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import { CSSGap, CSSPadding } from "app/styles/constants";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  close: () => any;
  msg: string;
};

export const DialogFailure = ({ isOpen, close, msg }: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen}>
      <Box
        padding={CSSPadding.Average}
        sx={{ border: "1px solid red" }}
        borderRadius={1}
      >
        <Stack direction="column" gap={CSSGap.Decent}>
          <Typography>{t(msg)}</Typography>
          <Box alignSelf="end">
            <Button color="error" onClick={close}>
              OK
            </Button>
          </Box>
        </Stack>
      </Box>
    </Dialog>
  );
};
