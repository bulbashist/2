import DeleteForever from "@mui/icons-material/DeleteForever";
import {
  Box,
  Button,
  Input,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CSSBorder, CSSPadding } from "app/styles/constants";
import { Paycard } from "app/types2";
import { useForm } from "react-hook-form";
import { addPaycard, removePaycard } from "../../store/slice";
import { AddPaycardDto } from "../../store/types";

type Props = {
  cards: Paycard[];
};

type FormProps = {
  cardNumber: string;
  validThrough: string;
  cvv: number;
};

export const PaycardFormComponent = ({ cards }: Props) => {
  const userId = useAppSelector((state) => state.core.id);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>();
  const dispatch = useAppDispatch();

  const formHandler = (data: FormProps) => {
    if (cards.some((card) => card.cardNumber === data.cardNumber)) return;

    const dto = {
      ...data,
      user: { id: userId },
    } as AddPaycardDto;

    dispatch(addPaycard(dto));
  };

  // TODO: add constraints
  return (
    <Box>
      <Stack direction="row" justifyContent="space-around">
        <Box sx={{ overflow: "auto" }}>
          <Table border={CSSBorder.Tiny}>
            <TableHead>
              <TableRow>
                <th>Номер карты</th>
                <th>Годна до:</th>
                <th>CVV</th>
                <th>Удалить:</th>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map((card: Paycard) => (
                <TableRow key={card.id}>
                  <TableCell align="center">{card.cardNumber}</TableCell>
                  <TableCell align="center">{card.validThrough}</TableCell>
                  <TableCell align="center">{card.cvv}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => dispatch(removePaycard(card.id))}
                    >
                      <DeleteForever />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <form onSubmit={handleSubmit(formHandler)} style={{ width: "400px" }}>
          <Box
            position="relative"
            border={CSSBorder.Tiny}
            padding={CSSPadding.Tiny}
          >
            <Stack direction="column" width="50%">
              <Input
                {...register("cardNumber", {
                  required: true,
                  pattern: /[0-9]{4,20}/,
                })}
                placeholder="Номер карты:"
                error={!!errors.cardNumber}
              />
              <Input
                {...register("validThrough", {
                  required: true,
                  pattern: /[0-9]{2}\/[0-9]{2}/,
                })}
                placeholder="01/01"
                error={!!errors.validThrough}
              />
              <Input
                {...register("cvv", { required: true, minLength: 3 })}
                placeholder="CVV:"
                error={!!errors.cvv}
              />
            </Stack>
            <Box position="absolute" bottom={2} right={2}>
              <Button variant="contained" type="submit">
                Добавить карту
              </Button>
            </Box>
          </Box>
        </form>
      </Stack>
    </Box>
  );
};
