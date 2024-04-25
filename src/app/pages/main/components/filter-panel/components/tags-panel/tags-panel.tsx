import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { addTag, deleteTag } from "app/store/core-reducer";
import Cancel from "@mui/icons-material/Cancel";
import { ITag } from "app/types";
import { CSSMargin, FontSize } from "app/styles/constants";
import { TagCloud } from "react-tagcloud";
import { tagsURL } from "app/constants/urls";

export const TagsPanelComponent = () => {
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<ITag[]>([]);
  const currTag = useAppSelector((state) => state.core.tag);

  useEffect(() => {
    axios
      .get<ITag[]>(tagsURL)
      .then((resp) => setTags(resp.data))
      .catch(console.error);
  }, []);

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Box sx={{ cursor: "pointer" }}>
        <TagCloud
          tags={tags.map((tag) => ({ value: tag.name }))}
          minSize={14}
          maxSize={20}
          onClick={(selected: { value: string }) => {
            dispatch(addTag(tags.find((tag) => tag.name === selected.value)!));
          }}
        />
      </Box>
      {currTag ? (
        <Button
          variant="outlined"
          color="warning"
          sx={{ margin: CSSMargin.Tiny }}
        >
          <Stack direction="row" flexWrap="wrap">
            <Typography marginRight={CSSMargin.Tiny} fontSize={FontSize.Small}>
              {currTag.name}
            </Typography>
            <Cancel onClick={() => dispatch(deleteTag(currTag.id))} />
          </Stack>
        </Button>
      ) : null}
    </Box>
  );
};
