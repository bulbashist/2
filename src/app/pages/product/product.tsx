import { useEffect } from "react";
import { useParams } from "react-router";
import PageWrapperComponent from "app/components/page-wrapper";
import NoPage from "app/pages/404";
import { useAppDispatch, useAppSelector } from "app/hooks";
import UpdateProductForm from "./components/product-form";
import { getProduct, resetError, setEditingState } from "./store/slice";
import styles from "app/styles/animations.module.css";
import CommentBlockComponent from "./components/comment-block";
import FullProductCardComponent from "app/components/full-product-card";
import DialogFailure from "app/components/utility/dialog-failure";

export const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { isBeingEdited, data, loading, err, errMsg } = useAppSelector(
    (state) => state.product
  );
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getProduct(+id));
    }
  }, [dispatch, id]);

  if (loading) return <div className={styles.loading} />;
  if (!data) return <NoPage />;

  return (
    <PageWrapperComponent>
      <DialogFailure
        isOpen={err}
        close={() => {
          dispatch(resetError());
        }}
        msg={errMsg}
      />
      <UpdateProductForm
        isOpen={isBeingEdited}
        close={() => dispatch(setEditingState(false))}
      />
      <FullProductCardComponent product={data} />
      <CommentBlockComponent comments={data.comments} />
    </PageWrapperComponent>
  );
};
