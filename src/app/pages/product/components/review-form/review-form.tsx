import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Close from "@mui/icons-material/Close";

import { FileUploader } from "react-drag-drop-files";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import GalleryComponent from "app/components/utility/review-form-gallery";
import TagsPanelComponent from "app/components/utility/tags-panel";
import { CSSGap, CSSPadding } from "app/styles/constants";
import { ITag } from "app/types";
import { Theme } from "app/themes/types";
import { useAppDispatch, useAppSelector } from "app/hooks";

import { ImageServer } from "app/services/image-server";
import { setEditingState } from "../../store/slice";

type FormData = {
  title: string;
  text: string;
};

type Props = {
  isOpen: boolean;
  close: () => void;
};

export const ReviewFormComponent = ({ isOpen, close }: Props) => {
  const theme = useAppSelector((state) => state.core.theme);
  const review = useAppSelector((state) => state.review.review);

  const [tags, setTags] = useState<ITag[]>(review?.tags ?? []);
  const [images, setImages] = useState<string[]>([]);

  const { handleSubmit, register } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const imgServer = useRef(new ImageServer());

  if (!review) return null;

  const loadToGallery = async (f: File) => {
    const url = await imgServer.current.uploadImage(f);
    setImages((ps) => [...ps, url]);
  };

  const formHandler = (data: FormData) => {
    // dispatch(changeReview({ id: review.id, ...data, tags }));
    close();
  };

  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth={false}>
      <Box position="absolute" top={8} right={8}>
        <Close onClick={() => dispatch(setEditingState(false))} />
      </Box>
      <DialogTitle textAlign="center">
        {t("review_update_form_title")}
      </DialogTitle>
      <Stack direction="column" gap={CSSGap.Average} padding={CSSPadding.Small}>
        <form onSubmit={handleSubmit(formHandler)}>
          <Stack direction="column" gap={CSSGap.Small}>
            <Input
              defaultValue={review.title}
              placeholder={t("review_form_title_ph")}
              {...register("title")}
              sx={{ width: "300px", alignSelf: "center" }}
            />

            <FileUploader
              handleChange={loadToGallery}
              label={t("review_form_img_markup_ph")}
            />
            <textarea
              rows={15}
              defaultValue={review.text}
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
              compositionTag={review.composition.tag}
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
