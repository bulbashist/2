import { Box, Card, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { reviewsURL } from "../../../../constants/urls";
import axios from "axios";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
  FontWeight,
} from "../../../../styles/constants";
import ReviewRatingComponent from "../../../../components/review-rating";
import { Preview } from "../../types";
import TagButtonComponent from "../../../../components/tag-button";
import { useNavigate } from "react-router-dom";

export const ReviewsListComponent = () => {
  const [reviews, setReviews] = useState<Preview[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(reviewsURL + `previews?page=${page}`)
      .then((resp) => setReviews(resp.data))
      .catch(console.error);
  }, [page]);

  return (
    <Stack direction="column" gap={CSSGap.Average} margin={CSSMargin.Average}>
      <Grid container gap={CSSGap.Decent} columns={13}>
        {reviews.map((review) => (
          <Grid item key={review.id} xs={12} sm={6} lg={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "200px",
                padding: CSSPadding.Tiny,
                position: "relative",
              }}
              raised
              onClick={() => navigate(`/reviews/${review.id}`)}
            >
              <Typography
                variant="h6"
                fontWeight={FontWeight.Bold}
                marginBottom={CSSMargin.Small}
              >
                {review.title}
              </Typography>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" gap={CSSGap.Tiny / 2}>
                  <Typography textAlign="left">
                    {review.compositionName}
                  </Typography>
                  <Typography textAlign="left">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Stack>
                <Box sx={{ float: "right" }}>
                  <ReviewRatingComponent rating={review.avgRating} />
                </Box>
              </Stack>
              <Stack
                direction="column"
                justifyContent="end"
                alignItems="end"
                flexGrow={1}
              >
                <Stack direction="row" gap={CSSGap.Tiny} flexWrap="wrap">
                  {review.tags.map((tag) => (
                    <TagButtonComponent key={tag.id} tag={tag} />
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{ alignSelf: "end" }}
        page={page}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 0);
        }}
        count={10}
      />
    </Stack>
  );
};
