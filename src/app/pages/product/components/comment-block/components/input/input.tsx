import Send from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { CSSMargin } from "app/styles/constants";
import { connection } from "../../services/ws-connection";
import { Box, Rating } from "@mui/material";

type Props = {
  userId: number;
  reviewId: number;
};

export const CommentInputComponent = ({ userId, reviewId }: Props) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const submitComment = () => {
    connection.addComment({
      product: reviewId,
      text,
      user: userId,
    });
  };

  return (
    <Box position="relative" marginTop={CSSMargin.Small}>
      <Box position="absolute" top={0} right={0}>
        <Rating value={rating} onChange={(_, v) => setRating(v ?? 0)} />
      </Box>

      <Stack direction="row">
        <ListItem sx={{ marginTop: CSSMargin.Small }}>
          <Avatar sx={{ marginRight: CSSMargin.Small }} />
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            onKeyDown={(e) => {
              if (e.key === "Enter") submitComment();
            }}
          />
          <Send onClick={submitComment} />
        </ListItem>
      </Stack>
    </Box>
  );
};
