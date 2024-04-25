import Rating from "@mui/material/Rating";

type Props = {
  value: number | null;
  readOnly?: boolean;
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => void;
};

export const Rating10 = ({ value, readOnly = false, onChange }: Props) => {
  return (
    <Rating
      precision={0.5}
      value={value ? value / 2 : 0}
      readOnly={readOnly}
      onChange={onChange}
    />
  );
};
