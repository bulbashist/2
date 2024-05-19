import DeleteForever from "@mui/icons-material/DeleteForever";
import {
  Box,
  Button,
  Input,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CSSBorder, CSSGap, CSSMargin, CSSPadding } from "app/styles/constants";
import { Paycard } from "app/types";
import { useForm } from "react-hook-form";
import { addPaycard, removePaycard } from "../../store/slice";
import { AddPaycardDto } from "../../store/types";
import { useState } from "react";

type Props = {
  cards: Paycard[];
};

type FormProps = Omit<Paycard, "id">;

export const PaycardFormComponent = ({ cards }: Props) => {
  const userId = useAppSelector((state) => state.core.id);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const formHandler = (data: FormProps) => {
    if (cards.some((card) => card.cardNumber === data.cardNumber)) return;

    const dto = {
      ...data,
      user: { id: userId },
    } as AddPaycardDto;

    dispatch(addPaycard(dto));
  };

  if (!visible) {
    return (
      <Button onClick={() => setVisible(true)}>
        Показать привязанные карты
      </Button>
    );
  }

  // TODO: add constraints
  return (
    <Box>
      <Stack direction="column" gap={CSSGap.Small}>
        <Box sx={{ overflow: "auto" }}>
          <Stack direction="row" gap={CSSGap.Tiny}>
            {cards.map((card: Paycard) => (
              <Box
                key={card.id}
                textAlign="left"
                border={CSSBorder.Tiny}
                padding={CSSPadding.Tiny}
                flexGrow={1}
              >
                <Stack direction="column">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    gap={CSSGap.Small}
                  >
                    <Box>
                      <Typography variant="h5">{card.cardNumber}</Typography>
                      <Typography variant="h6">{card.validThrough}</Typography>
                    </Box>
                    <Button
                      color="error"
                      onClick={() => dispatch(removePaycard(card.id))}
                    >
                      <DeleteForever />
                    </Button>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5">{card.credentials}</Typography>
                    <Typography variant="h6" textAlign="right">
                      cvv: {card.cvv}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
        <Stack direction="row" alignItems="center">
          <Box flexGrow={1}>
            <Button onClick={() => setVisible(false)}>
              <Typography variant="h5" textTransform="none">
                Скрыть платежные карты
              </Typography>
            </Button>
          </Box>
          <form
            onSubmit={handleSubmit(formHandler)}
            style={{ width: "400px", alignSelf: "end" }}
          >
            <Box
              position="relative"
              border={CSSBorder.Tiny}
              padding={CSSPadding.Tiny}
              alignSelf="end"
            >
              <Input
                {...register("cardNumber", {
                  required: true,
                  pattern: {
                    value: /[0-9]{4,20}/,
                    message: "Card number should be 4-20 digits",
                  },
                })}
                placeholder="Номер карты:"
                fullWidth
                error={!!errors.cardNumber}
                title={errors.cardNumber?.message}
              />
              <Input
                {...register("validThrough", {
                  required: true,
                  pattern: {
                    value: /[0-9]{2}\/[0-9]{2}/,
                    message: "Enter correct data",
                  },
                })}
                placeholder="01/01"
                fullWidth
                error={!!errors.validThrough}
                title={errors.validThrough?.message}
              />
              <Input
                {...register("credentials", { required: true })}
                placeholder="NAME SURNAME"
                fullWidth
                error={!!errors.credentials}
              />
              <Stack direction="column" width="50%" marginTop={CSSMargin.Tiny}>
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
            <p>{errors.cardNumber?.message}</p>
          </form>
        </Stack>
      </Stack>
    </Box>
  );
};
