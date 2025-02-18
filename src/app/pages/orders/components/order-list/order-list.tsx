import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CSSGap, CSSMargin, CSSPadding } from "app/styles/constants";
import { Link } from "react-router-dom";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { orderWSC } from "../../services/order-connection";
import { WSOrderEvents } from "app/pages/product/components/comment-block/services/types";
import { Order } from "../../types";
import { useTranslation } from "react-i18next";

const options = ["Принят", "Обрабатывается", "В пути", "Доставлен", "Получен"];

export const OrderListComponent = () => {
  const { data } = useAppSelector((state) => state.orders);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    orderWSC.connect(process.env.REACT_APP_WS_SERVER!, "78");
    orderWSC.emit(WSOrderEvents.FindAllOrders, page);
    return () => orderWSC.close();
  }, [page, dispatch]);

  if (!data) return null;

  const changeStatusHandler = (id: number, statusId: number) => {
    orderWSC.emit(WSOrderEvents.UpdateOrder, {
      id,
      status: { id: statusId },
    });
  };

  const deleteHandler = (id: number) => {
    orderWSC.emit(WSOrderEvents.RemoveOrder, id);
  };

  const getTotal = (order: Order) => {
    return order.products.reduce((acc, curr) => acc + +curr.sum, 0).toFixed(2);
  };

  return (
    <Stack direction="column" gap={CSSGap.Average} margin={CSSMargin.Average}>
      <Grid container gap={CSSGap.Decent} columns={13}>
        {data.map((order) => (
          <Grid item key={order.id} xs={12} sm={6} lg={6}>
            <Card raised>
              <Box
                position="relative"
                height={300}
                overflow="scroll"
                padding={CSSPadding.Tiny}
              >
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  margin={CSSMargin.Small}
                >
                  <Button
                    color="error"
                    variant="text"
                    onClick={() => deleteHandler(order.id)}
                  >
                    <DeleteForever />
                  </Button>
                </Box>
                <Typography variant="h5" textAlign="left">
                  <Link to={`/orders/${order.id}`}>Заказ №{order.id}</Link>
                  <Typography>
                    {new Date(order.date).toLocaleString()}
                  </Typography>
                </Typography>

                <List>
                  {order.products.map((obj, i) => (
                    <ListItem key={i}>
                      <Typography marginRight={CSSMargin.Tiny} width={200}>
                        {obj.product.name}
                      </Typography>
                      <Typography marginRight={CSSMargin.Small}>
                        x{obj.count}
                      </Typography>
                      <Link to={`/products/${obj.product.id}`}>
                        <KeyboardDoubleArrowRight />
                      </Link>
                    </ListItem>
                  ))}
                </List>
                <Box
                  position="absolute"
                  right={0}
                  bottom={0}
                  margin={CSSMargin.Small}
                >
                  <Stack direction="column" alignItems="end">
                    <Typography>{getTotal(order)} BYN</Typography>
                    <Typography>{order.office.location}</Typography>
                    <Select
                      sx={{ width: "170px" }}
                      defaultValue={order.status.id}
                      onChange={(e) =>
                        changeStatusHandler(order.id, +e.target.value)
                      }
                    >
                      {[1, 2, 3, 4, 5].map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {t(`i18_order_status_${opt}`)}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{ alignSelf: "end" }}
        page={page}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 0);
        }}
        count={10}
      />
    </Stack>
  );
};
