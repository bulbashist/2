import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Rating, Stack, Typography } from "@mui/material";
import { CSSGap, CSSMargin } from "../../styles/constants";
import { useTranslation } from "react-i18next";

type Props = {
  rating: number;
};

export const ReviewRatingComponent = ({ rating }: Props) => {
  const { t } = useTranslation();
  return (
    <Stack direction="column" gap={CSSGap.Tiny / 2} alignItems="end">
      <Typography>{t("reviews_rating")}:</Typography>
      <Rating value={rating} readOnly={true} />
    </Stack>
  );
};
