import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import PageWrapperComponent from "app/components/page-wrapper";
import { getSellerProductsURI, getStatsURI } from "app/constants/urls";
import { useAppSelector } from "app/hooks";
import { Product } from "app/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { CSSMargin, CSSPadding } from "app/styles/constants";
import SalesChart from "./components/sales-chart";
import { StatsData } from "./types";
import RevenueChart from "./components/revenue-chart";

export const StatsPage = () => {
  const [data, setData] = useState<StatsData[]>([]);
  const userId = useAppSelector((state) => state.core.id);
  const [productId, setProductId] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!userId) return;

    const url = getSellerProductsURI(userId);
    axios
      .get<Product[]>(url)
      .then((res) => setProducts(res.data))
      .catch(console.log);
  }, [userId]);

  const requestData = () => {
    if (!productId || !userId) return;

    const url = getStatsURI(productId, userId);
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch(console.log);
  };

  return (
    <PageWrapperComponent>
      <Box padding={CSSPadding.Average}>
        <Box width="400px">
          <Stack direction="row" marginBottom={CSSMargin.Small}>
            <Box width="100%">
              <Select
                value={productId}
                fullWidth
                displayEmpty
                labelId="12"
                onChange={(e) => setProductId(+e.target.value!)}
              >
                <MenuItem value={0}>
                  <InputLabel>Выберите продукт</InputLabel>
                </MenuItem>
                {products.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Button onClick={requestData}>Просмотреть статистику</Button>
          </Stack>
        </Box>

        <SalesChart data={data} />
        <RevenueChart data={data} />
      </Box>
    </PageWrapperComponent>
  );
};
