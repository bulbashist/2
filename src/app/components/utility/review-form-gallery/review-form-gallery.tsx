import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CSSGap } from "../../../styles/constants";
import { useTranslation } from "react-i18next";

type Props = {
  images: string[];
};

export const GalleryComponent = ({ images }: Props) => {
  const { t } = useTranslation();

  return (
    <Stack direction="column" gap={CSSGap.Small}>
      <Typography variant="h5" textAlign="center">
        {t("review_form_gallery")}
      </Typography>
      {images.length === 0 ? (
        <Typography textAlign="center">{t("review_form_no_img")}</Typography>
      ) : null}
      {images.map((url, i) => (
        <Stack
          key={i}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <img style={{ width: "50%" }} src={url} alt="img" />
          <Typography
            flexGrow={1}
            textAlign="center"
          >{`![image](${url})`}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};
