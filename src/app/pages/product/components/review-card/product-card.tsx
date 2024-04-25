import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Product } from "app/types2";
import FullProductCardComponent from "app/components/full-product-card";

type Props = {
  product: Product;
};

export const ReviewCardComponent = ({ product }: Props) => {
  const { id: userId } = useAppSelector((state) => state.core);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>(null);
  // console.log(product);

  return <FullProductCardComponent product={product} />;
};
