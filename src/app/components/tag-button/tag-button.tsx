import Button from "@mui/material/Button";
import { ITag } from "../../types";
import { useAppDispatch } from "../../hooks";
import { addTag } from "../../store/core-reducer";
import { CSSPadding, FontSize } from "../../styles/constants";
import { useNavigate } from "react-router-dom";

type Props = {
  tag: ITag;
};

export const TagButtonComponent = ({ tag }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      color="warning"
      sx={{ padding: CSSPadding.Tiny, fontSize: FontSize.Small }}
      key={tag.id}
      onClick={(e) => {
        dispatch(addTag(tag));
        navigate("/");
        window.scroll(0, 0);
        e.stopPropagation();
      }}
    >
      {tag.name}
    </Button>
  );
};
