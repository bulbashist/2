import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Download from "@mui/icons-material/Download";
import EditNote from "@mui/icons-material/EditNote";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ReactMarkdown from "react-markdown";
import pdf from "jspdf";
import htc from "html2canvas";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CSSGap, CSSMargin, CSSPadding } from "app/styles/constants";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Rating10 } from "app/components/rating";
import { deleteReview, setEditingState } from "../../store/slice";
import { IReview } from "../../types";
import { changeLike, changeRating } from "../../store/reviews/thunks";

type Props = {
  review: IReview;
};

export const ReviewCardComponent = ({ review }: Props) => {
  const { id: userId, rights } = useAppSelector((state) => state.core);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAdmin = rights & 0b0010;

  const download = () => {
    if (ref.current) {
      const file = new pdf({ format: "a0" });
      htc(ref.current, { allowTaint: true, useCORS: true }).then((data) => {
        const pages = Math.ceil(
          data.height / file.internal.pageSize.getHeight()
        );

        const width = data.width;
        const height = data.height / pages;

        for (let i = 1; i <= pages; i++) {
          if (i !== 1) file.addPage();
          const onePageCanvas = document.createElement("canvas");
          onePageCanvas.setAttribute("width", data.width.toString());
          onePageCanvas.setAttribute("height", height.toString());
          var ctx = onePageCanvas.getContext("2d")!;
          ctx.drawImage(
            data,
            0,
            height * (i - 1),
            width,
            height,
            0,
            0,
            width,
            height
          );

          const url = onePageCanvas.toDataURL("image/jpeg", 1);
          file.addImage(
            url,
            "JPG",
            0,
            0,
            file.internal.pageSize.getWidth(),
            file.internal.pageSize.getHeight()
          );
        }

        file.save();
      });
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <Card sx={{ padding: CSSPadding.Decent, position: "relative" }}>
        <Box position="absolute" top={8} right={8}>
          <Stack direction="row">
            {userId === review.author.id || isAdmin ? (
              <>
                <EditNote onClick={() => dispatch(setEditingState(true))} />
                <DeleteForever
                  onClick={() => {
                    dispatch(deleteReview(review.id));
                    navigate("/");
                  }}
                />
              </>
            ) : null}
            <Download onClick={download} />
          </Stack>
        </Box>
        <Typography variant="h4">{review.title}</Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ListItem>
            <Avatar sx={{ marginRight: CSSMargin.Small }} />
            <List>
              <Typography variant="subtitle2">{review.author.name}</Typography>
              <Typography variant="subtitle2">
                {new Date(review.date).toDateString()}
              </Typography>
            </List>
          </ListItem>
          {userId ? (
            <Box>
              <ThumbUp
                fontSize="large"
                color={review.isLiked ? "success" : "disabled"}
                onClick={() =>
                  dispatch(
                    changeLike({ id: review.id, isLiked: !review.isLiked })
                  )
                }
              />
            </Box>
          ) : null}
        </Stack>
        <Box style={{ overflowX: "scroll" }}>
          <ReactMarkdown>{review.text}</ReactMarkdown>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Stack direction="row" gap={CSSGap.Tiny / 2}>
              <Typography color="GrayText">{t("review_card_text")}:</Typography>
              <Typography>{review.author.name}</Typography>
            </Stack>
            <Stack direction="row" gap={CSSGap.Tiny / 2}>
              <Typography color="GrayText" textAlign="left">
                {t("review_card_composition")}:
              </Typography>
              <Typography textAlign="left">
                {review.composition.name}
              </Typography>
            </Stack>
          </Box>
          <Stack direction="column" gap={CSSGap.Tiny / 2} alignItems="end">
            <Typography>{t("word_rating")}:</Typography>
            <Rating10 value={review.avgRating} readOnly={true} />
          </Stack>
        </Stack>
        {userId ? (
          <List sx={{ marginTop: CSSMargin.Small }}>
            <Typography variant="h5">{t("mark_review")}:</Typography>
            <Rating10
              value={review.userRating}
              onChange={(_, value) => {
                if (value) {
                  dispatch(
                    changeRating({ id: review.id, userRating: value * 2 })
                  );
                }
              }}
            />
          </List>
        ) : null}
      </Card>
    </div>
  );
};
