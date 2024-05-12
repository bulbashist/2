import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Input,
  Stack,
  TextField,
} from "@mui/material";
import { useAppSelector } from "app/hooks";
import { CSSGap, CSSPadding } from "app/styles/constants";
import { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Theme } from "app/themes/types";
import GalleryComponent from "../review-form-gallery";
import { ImageServer } from "app/services/image-server";
import { Category, Manufacturer, Product } from "app/types";
import axios from "axios";
import {
  categoriesURI,
  manufacturersURI,
  productsURI,
} from "app/constants/urls";

type FormData = Partial<Product>;

type Props = {
  open: boolean;
  closeModal: () => void;
};

export const CreateProductForm = ({ open, closeModal }: Props) => {
  const theme = useAppSelector((state) => state.core.theme);

  const [previewImg, setPreviewImg] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const { control, handleSubmit, register } = useForm<FormData>();
  const { t } = useTranslation();

  const imgServer = useRef(new ImageServer());

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
    axios.post(productsURI, data, { withCredentials: true }).catch(console.log);
    closeModal();
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  useEffect(() => {
    axios
      .get(categoriesURI)
      .then((res) => setCategories(res.data))
      .catch(console.log);

    axios
      .get(manufacturersURI)
      .then((res) => setManufacturers(res.data))
      .catch(console.log);
  }, []);

  return (
    <Dialog open={open} maxWidth={false}>
      <Box position="absolute" top={8} right={8}>
        <Close onClick={closeModal} />
      </Box>
      <DialogTitle textAlign="center">
        {t("create_product_form_title")}
      </DialogTitle>
      <Stack direction="column" gap={CSSGap.Average} padding={CSSPadding.Small}>
        <form onSubmit={handleSubmit(formHandler)}>
          <Stack direction="column" gap={CSSGap.Small}>
            <Input
              placeholder={t("review_form_title_ph")}
              {...register("name")}
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
            <Stack direction="row" gap={CSSGap.Small}>
              <Input
                placeholder={t("width")}
                type="number"
                required
                {...register("width", { valueAsNumber: true })}
                sx={{ width: "300px", alignSelf: "center" }}
              />
              <Input
                placeholder={t("breadth")}
                required
                {...register("breadth", { valueAsNumber: true })}
                sx={{ width: "300px", alignSelf: "center" }}
              />
              <Input
                placeholder={t("height")}
                required
                {...register("height", { valueAsNumber: true })}
                sx={{ width: "300px", alignSelf: "center" }}
              />
            </Stack>
            <textarea
              rows={15}
              style={{
                backgroundColor: theme === Theme.Light ? "white" : "black",
                color: theme === Theme.Light ? "black" : "white",
              }}
              placeholder={t("review_form_text_ph")}
              {...register("description")}
            />
            <Input
              placeholder={t("price")}
              required
              {...register("price", { valueAsNumber: true })}
              sx={{ width: "300px", alignSelf: "center" }}
            />
            <Button type="submit" sx={{ alignSelf: "end" }}>
              {t("word_submit")}
            </Button>
            <Stack direction="row">
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    onChange={(e, selected) => {
                      onChange(selected);
                    }}
                    sx={{ width: 300 }}
                    options={categories}
                    getOptionLabel={(value) => value.name}
                    placeholder="Категория"
                    //@ts-ignore
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
              <Controller
                name="manufacturer"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    onChange={(e, selected) => {
                      onChange(selected);
                    }}
                    sx={{ width: 300 }}
                    options={manufacturers}
                    getOptionLabel={(value) => value.name}
                    placeholder="Производитель"
                    //@ts-ignore
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
            </Stack>
          </Stack>
        </form>
        <GalleryComponent images={images} />
      </Stack>
    </Dialog>
  );
};
