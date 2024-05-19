type SortVariant = {
  label: string;
  value: number;
};

export const sortVariants: SortVariant[] = [
  {
    label: "Популярные",
    value: 0,
  },
  {
    label: "Сначала дешевые",
    value: 1,
  },
  {
    label: "Сначала дорогие",
    value: 2,
  },
  {
    label: "Новинки",
    value: 3,
  },
];
