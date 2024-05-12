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
import {
  changeOrderStatusFromList,
  deleteOrderFromList,
} from "../../store/slice";
import { CartProduct } from "app/pages/cart/slice";
import { orderWSC } from "../../services/order-connection";
import { WSOrderEvents } from "app/pages/product/components/comment-block/services/types";

const options = ["Принят", "Обрабатывается", "В пути", "Доставлен", "Получен"];

export const OrderListComponent = () => {
  const { data } = useAppSelector((state) => state.orders);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    orderWSC.connect(process.env.REACT_APP_WS_SERVER!, "78");
    orderWSC.emit(WSOrderEvents.FindAllOrders);
    return () => orderWSC.close();
  }, [page, dispatch]);

  if (!data) return null;

  const changeStatusHandler = (id: number, statusId: number) => {
    dispatch(changeOrderStatusFromList({ id, statusId }));
  };

  const deleteHandler = (id: number) => {
    dispatch(deleteOrderFromList(id));
  };

  const getTotal = (objs: CartProduct[]) => {
    return objs
      .reduce((acc, curr) => acc + curr.product.price * curr.count, 0)
      .toFixed(2);
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
                    variant="contained"
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
                      <Typography
                        marginRight={CSSMargin.Small}
                        width={200}
                        overflow="scroll"
                      >
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
                  <Typography>{getTotal(order.products)} BYN</Typography>
                  <Select
                    defaultValue={order.status.id - 1}
                    onChange={(e) =>
                      changeStatusHandler(order.id, +e.target.value + 1)
                    }
                  >
                    {options.map((opt, i) => (
                      <MenuItem key={i} value={i}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
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
