import { Card, Grid, Stack, Typography } from "@mui/material";
import { CSSGap, CSSPadding } from "../../styles/constants";
import { useNavigate } from "react-router";
import { IReview } from "../../types";
import { Rating10 } from "../rating";
import TagButtonComponent from "../tag-button";

import defaultImg from "app/assets/default.webp";
import { useAppSelector } from "app/hooks";

type Props = {
  review: IReview;
};

export const ReviewImgCard = ({ review }: Props) => {
  const lang = useAppSelector((state) => state.core.lang);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        paddingX: CSSPadding.Large,
        paddingY: CSSPadding.Average,
        cursor: "pointer",
      }}
      raised
      onClick={() => navigate(`/reviews/${review.id}`)}
    >
      <Stack gap={CSSGap.Small}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="h4" align="left">
            {review.title}
          </Typography>
          <Rating10 value={review.avgRating} readOnly={true} />
        </Stack>
        <img src={review.previewImg ? review.previewImg : defaultImg} alt="" />
        <Grid container justifyContent="space-between">
          <p>{new Date(review.date).toLocaleString(lang)}</p>
          <Stack
            direction="row"
            sx={{ float: "right" }}
            gap={CSSGap.Tiny}
            flexWrap="wrap"
          >
            {review.tags.map((tag) => (
              <TagButtonComponent tag={tag} key={tag.id} />
            ))}
          </Stack>
        </Grid>
      </Stack>
    </Card>
  );
};
