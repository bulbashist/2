import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Close from "@mui/icons-material/Close";

import { FileUploader } from "react-drag-drop-files";
import { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import GalleryComponent from "app/components/utility/review-form-gallery";
import { CSSGap, CSSPadding } from "app/styles/constants";
import { Theme } from "app/themes/types";
import { useAppDispatch, useAppSelector } from "app/hooks";

import { ImageServer } from "app/services/image-server";
import { setEditingState } from "../../store/slice";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { Category, Manufacturer, Product } from "app/types";
import axios from "axios";
import { categoriesURI, manufacturersURI } from "app/constants/urls";

type FormData = Partial<Product>;

type Props = {
  isOpen: boolean;
  close: () => void;
};

export const UpdateProductForm = ({ isOpen, close }: Props) => {
  const theme = useAppSelector((state) => state.core.theme);
  const product = useAppSelector((state) => state.product.data);
  const [images, setImages] = useState<string[]>([]);

  const { control, handleSubmit, register } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const imgServer = useRef(new ImageServer());

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

  if (!product) return null;

  const loadToGallery = async (f: File) => {
    const url = await imgServer.current.uploadImage(f);
    setImages((ps) => [...ps, url]);
  };

  const formHandler = (data: FormData) => {
    // dispatch(changeReview({ id: review.id, ...data, tags }));
    close();
  };

  return (
    <Dialog open={isOpen} maxWidth={false}>
      <Box position="absolute" top={8} right={8}>
        <Close onClick={close} />
      </Box>
      <DialogTitle textAlign="center">
        {t("create_product_form_title")}
      </DialogTitle>
      <Stack direction="column" gap={CSSGap.Average} padding={CSSPadding.Small}>
        <form onSubmit={handleSubmit(formHandler)}>
          <Stack direction="column" gap={CSSGap.Small}>
            <Input
              defaultValue={product.name}
              placeholder={t("review_form_title_ph")}
              {...register("name")}
              sx={{ width: "300px", alignSelf: "center" }}
            />
            <Grid container gap={CSSGap.Small}>
              <Grid item xs={8} md={5}>
                <FileUploader
                  // handleChange={handleChange}
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
                defaultValue={product.width}
                {...register("width", { valueAsNumber: true })}
                sx={{ width: "300px", alignSelf: "center" }}
              />
              <Input
                defaultValue={product.breadth}
                placeholder={t("breadth")}
                required
                {...register("breadth", { valueAsNumber: true })}
                sx={{ width: "300px", alignSelf: "center" }}
              />
              <Input
                defaultValue={product.height}
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
              defaultValue={product.description}
              placeholder={t("review_form_text_ph")}
              {...register("description")}
            />
            <Input
              defaultValue={product.price}
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
                    defaultValue={product.category}
                    onChange={(e, selected) => {
                      onChange(selected);
                    }}
                    sx={{ width: 300 }}
                    options={categories}
                    getOptionLabel={(value) => value.name}
                    // placeholder="Категория"
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
                    // placeholder="Производитель"
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

/*

*/

/*
<Dialog open={isOpen} maxWidth={false}>
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
              defaultValue={product.name}
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
              defaultValue={product.description}
              style={{
                backgroundColor: theme === Theme.Light ? "white" : "black",
                color: theme === Theme.Light ? "black" : "white",
              }}
              placeholder={t("review_form_text_ph")}
              {...register("text")}
            />
            <Button type="submit" sx={{ alignSelf: "end" }}>
              {t("word_submit")}
            </Button>
          </Stack>
        </form>
        <GalleryComponent images={images} />
      </Stack>
    </Dialog>
*/
