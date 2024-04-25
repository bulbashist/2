import { useEffect } from "react";
import { useParams } from "react-router";
import PageWrapperComponent from "app/components/page-wrapper";
import NoPage from "app/pages/404";
import { useAppDispatch, useAppSelector } from "app/hooks";
import ReviewFormComponent from "./components/review-form";
import ReviewCardComponent from "./components/review-card";
import { getProduct, setEditingState } from "./store/slice";
import styles from "app/styles/animations.module.css";
import CommentBlockComponent from "./components/comment-block";

export const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { isBeingEdited, product, loading } = useAppSelector(
    (state) => state.product
  );
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getProduct(+id));
    }
  }, [dispatch, id]);

  if (loading) return <div className={styles.loading} />;
  if (!product) return <NoPage />;

  return (
    <PageWrapperComponent>
      <ReviewFormComponent
        isOpen={isBeingEdited}
        close={() => dispatch(setEditingState(false))}
      />
      <ReviewCardComponent product={product} />
      <CommentBlockComponent comments={product.comments} />
    </PageWrapperComponent>
  );
};
