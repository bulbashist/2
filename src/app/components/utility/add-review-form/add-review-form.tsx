import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Input,
  Stack,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CSSGap, CSSPadding } from "app/styles/constants";
import { ITag } from "app/types";
import { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TagsPanelComponent from "../tags-panel";
import { Theme } from "app/themes/types";
import GalleryComponent from "../review-form-gallery";
import { ImageServer } from "app/services/image-server";

type FormData = {
  title: string;
  text: string;
};

type Props = {
  composition: any;
  userId?: number;
  closeModal: () => void;
};

export const AddReviewForm = ({ composition, userId, closeModal }: Props) => {
  const theme = useAppSelector((state) => state.core.theme);

  const [previewImg, setPreviewImg] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const { handleSubmit, register } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const imgServer = useRef(new ImageServer());

  if (!composition) return null;

  const handleChange = async (f: File) => {
    const url = await imgServer.current.uploadImage(f);
    setPreviewImg(url);
    setImages((ps) => [...ps, url]);
  };

  const loadToGallery = async (f: File) => {
    const url = await imgServer.current.uploadImage(f);
    setImages((ps) => [...ps, url]);
  };

  const formHandler = (data: FormData) => {
    const review = {
      composition: { id: composition.id },
      ...data,
      previewImg,
      tags,
      ...(userId && { user: { id: userId } }),
    };

    closeModal();
  };

  return (
    <Dialog open fullWidth={true} maxWidth={false}>
      <Box position="absolute" top={8} right={8}>
        <Close onClick={closeModal} />
      </Box>
      <DialogTitle textAlign="center">
        {t("review_create_form_title")}
      </DialogTitle>
      <Stack direction="column" gap={CSSGap.Average} padding={CSSPadding.Small}>
        <form onSubmit={handleSubmit(formHandler)}>
          <Stack direction="column" gap={CSSGap.Small}>
            <Input
              placeholder={t("review_form_title_ph")}
              {...register("title")}
              sx={{ width: "300px", alignSelf: "center" }}
            />
            <Grid container gap={CSSGap.Small}>
              <Grid item xs={8} md={5}>
                <FileUploader
                  handleChange={handleChange}
                  label={t("review_form_img_preview_ph")}
                />
              </Grid>
              <Grid item xs={8} md={5}>
                <FileUploader
                  handleChange={loadToGallery}
                  label={t("review_form_img_markup_ph")}
                />
              </Grid>
            </Grid>
            <textarea
              rows={15}
              style={{
                backgroundColor: theme === Theme.Light ? "white" : "black",
                color: theme === Theme.Light ? "black" : "white",
              }}
              placeholder={t("review_form_text_ph")}
              {...register("text")}
            />
            <TagsPanelComponent
              tags={tags}
              setTags={setTags}
              compositionTag={composition.tag}
            />
            <Button type="submit" sx={{ alignSelf: "end" }}>
              {t("word_submit")}
            </Button>
          </Stack>
        </form>
        <GalleryComponent images={images} />
      </Stack>
    </Dialog>
  );
};
