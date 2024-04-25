import Rating from "@mui/material/Rating";

type Props = {
  value: number | null;
  readOnly?: boolean;
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => void;
};

export const Rating5 = ({ value, readOnly = false, onChange }: Props) => {
  return <Rating value={value ?? 0} readOnly={readOnly} onChange={onChange} />;
};
