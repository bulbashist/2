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
import DialogFailure from "../dialog-failure";

type FormData = Partial<Product>;

type Props = {
  open: boolean;
  closeModal: () => void;
};

export const CreateProductForm = ({ open, closeModal }: Props) => {
  const theme = useAppSelector((state) => state.core.theme);
  const [images, setImages] = useState<string[]>([]);
  const [err, setErr] = useState(false);

  const { control, handleSubmit, register } = useForm<FormData>();
  const { t } = useTranslation();

  const imgServer = useRef(new ImageServer());

  const handleChange = async (f: File) => {
    const url = await imgServer.current.uploadImage(f);
    setImages((ps) => [url, ...ps]);
  };

  const loadToGallery = async (f: File) => {
    const url = await imgServer.current.uploadImage(f);
    setImages((ps) => [...ps, url]);
  };

  const formHandler = (data: FormData) => {
    const body = {
      ...data,
      photos: images.map((img) => ({ url: img })),
    };
    axios.post(productsURI, body, { withCredentials: true }).then(
      () => closeModal(),
      () => setErr(true)
    );
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
    <Dialog open={open} maxWidth="xl">
      <DialogFailure
        isOpen={err}
        close={() => setErr(false)}
        msg="err_add_product"
      />
      <Box position="absolute" top={8} right={8}>
        <Close onClick={closeModal} />
      </Box>
      <DialogTitle textAlign="center">
        {t("create_product_form_title")}
      </DialogTitle>
      <Stack
        direction="column"
        gap={CSSGap.Average}
        padding={CSSPadding.Small}
        width={900}
      >
        <form
          onSubmit={handleSubmit(formHandler)}
          onKeyDown={(e) => {
            if (e.key === "Enter") return false;
          }}
        >
          <Stack direction="column" gap={CSSGap.Small}>
            <Input
              placeholder={t("form_product_title")}
              {...register("name")}
              sx={{ width: "300px", alignSelf: "center" }}
            />
            <Grid container gap={CSSGap.Small}>
              <Grid item xs={8} md={5}>
                <FileUploader
                  handleChange={handleChange}
                  label={t("form_img_preview")}
                />
              </Grid>
              <Grid item xs={8} md={5}>
                <FileUploader
                  handleChange={loadToGallery}
                  label={t("form_img_markup")}
                />
              </Grid>
            </Grid>
            <Stack direction="row" gap={CSSGap.Small}>
              <Input
                placeholder={t("product_width")}
                type="number"
                required
                {...register("width", { valueAsNumber: true })}
                fullWidth
              />
              <Input
                placeholder={t("product_breadth")}
                type="number"
                required
                {...register("breadth", { valueAsNumber: true })}
                fullWidth
              />
              <Input
                placeholder={t("product_height")}
                type="number"
                required
                {...register("height", { valueAsNumber: true })}
                fullWidth
              />
            </Stack>
            <Stack direction="row" gap={CSSGap.Small}>
              <Input
                placeholder={t("form_product_price")}
                type="number"
                required
                {...register("price", { valueAsNumber: true })}
                fullWidth
              />
              <Input
                placeholder={t("form_product_material")}
                fullWidth
                {...register("material")}
              />
            </Stack>
            <textarea
              rows={15}
              style={{
                backgroundColor: theme === Theme.Light ? "white" : "black",
                color: theme === Theme.Light ? "black" : "white",
              }}
              placeholder={t("form_product_description")}
              {...register("description")}
            />
            <Stack direction="row" gap={CSSGap.Average}>
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
                    renderInput={(params) => (
                      //@ts-ignore
                      <TextField
                        {...params}
                        label={t("form_product_category")}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="manufacturer"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    onChange={(e, selected) => onChange(selected)}
                    sx={{ width: 300 }}
                    options={manufacturers}
                    getOptionLabel={(value) => value.name}
                    renderInput={(params) => (
                      //@ts-ignore
                      <TextField
                        {...params}
                        label={t("form_product_manufacturer")}
                      />
                    )}
                  />
                )}
              />
            </Stack>
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
