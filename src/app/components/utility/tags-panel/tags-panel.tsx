import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Cancel from "@mui/icons-material/Cancel";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CSSGap, CSSMargin } from "app/styles/constants";
import { ITag } from "app/types";
import axios from "axios";
import { tagsURL } from "app/constants/urls";

type Props = {
  tags: ITag[];
  setTags: Dispatch<SetStateAction<ITag[]>>;
  compositionTag: ITag;
};

export const TagsPanelComponent = ({
  tags,
  setTags,
  compositionTag,
}: Props) => {
  const [hints, setHints] = useState<ITag[]>([]);

  useEffect(() => {
    axios
      .get(tagsURL)
      .then((resp) => setHints(resp.data))
      .catch(console.error);
  }, []);

  const tagSelectionHandler = (_: any, value: string | null) => {
    if (value) {
      const hint = hints.find((hint) => hint.name === value)!;
      if (
        hint.id !== compositionTag.id &&
        !tags.find((tag) => tag.id === hint.id)
      ) {
        setTags((ps) => [...ps, hint]);
      }
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="right"
      gap={CSSGap.Small}
      alignItems="center"
    >
      <Stack direction="row" gap={CSSGap.Small} flexWrap="wrap">
        <Button variant="outlined" color="warning" key={compositionTag.id}>
          <Typography marginRight={CSSMargin.Tiny}>
            {compositionTag.name}
          </Typography>
        </Button>
        {tags.map((tag) => (
          <Button variant="outlined" color="warning" key={tag.id}>
            <Typography marginRight={CSSMargin.Tiny}>{tag.name}</Typography>
            <Cancel
              onClick={() =>
                setTags((ps) => ps.filter((dTag) => dTag.id !== tag.id))
              }
            />
          </Button>
        ))}
      </Stack>
      <Autocomplete
        options={hints.map((hint) => hint.name)}
        sx={{ width: "400px" }}
        //@ts-ignore
        renderInput={(params) => <TextField {...params}></TextField>}
        autoComplete={true}
        onChange={tagSelectionHandler}
      />
    </Stack>
  );
};
