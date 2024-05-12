export type AddPaycardDto = {
  cardNumber: string;
  validThrough: string;
  cvv: number;
  user: { id: number };
};

export type ChangeNameDto = {
  id: number;
  name: string;
};
