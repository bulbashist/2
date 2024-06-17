import { useAppSelector } from "../../../../hooks";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Box, Stack, Typography } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

export const OrdersListComponent = () => {
  const orders = useAppSelector((state) => state.user.data?.orders);
  const { t } = useTranslation();

  if (!orders) return null;

  const fields: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Link to={`/orders/${id}`}>
            <Stack direction="row">
              <KeyboardDoubleArrowRight />
              <Typography>{id}</Typography>
            </Stack>
          </Link>
        );
      },
    },
    {
      field: "status",
      headerName: t("profile_goods_list_title2"),
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const { status } = params.row;
        return <Typography>{t(status.name)}</Typography>;
      },
    },
    {
      field: "office",
      headerAlign: "center",
      headerName: t("profile_goods_list_title3"),
      minWidth: 150,
      flex: 1,
      align: "center",
      renderCell: (params) => {
        const { office } = params.row;
        return <Typography>{office.location}</Typography>;
      },
    },
    {
      field: "date",
      headerName: t("profile_goods_list_title4"),
      headerAlign: "center",
      minWidth: 200,
      flex: 1,
      align: "center",
      renderCell: (params) => {
        const { date } = params.row;
        return <Typography>{new Date(date).toLocaleString()}</Typography>;
      },
    },
  ];

  return (
    <Box>
      <Typography variant="h4" textAlign="left">
        Список заказов:
      </Typography>
      <Box sx={{ overflow: "auto" }}>
        <DataGrid
          columns={fields}
          rows={orders}
          hideFooter
          sx={{ minHeight: 100 }}
        />
      </Box>
    </Box>
  );
};
