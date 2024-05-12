import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import mainReducer from "../pages/main/store/slice";
import orderReducer from "../pages/order/store/slice";
import ordersReducer from "../pages/orders/store/slice";
import coreReducer from "./core-reducer";
import adminReducer from "../pages/admin/store/slice";
import searchReducer from "../pages/search/store/slice";
import userReducer from "../pages/user/store/slice";
import productReducer from "app/pages/product/store/slice";
import cartReducer from "app/pages/cart/slice";
import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  whitelist: ["core", "cart"],
};

const reducer = combineReducers({
  core: coreReducer,
  main: mainReducer,
  order: orderReducer,
  orders: ordersReducer,
  admin: adminReducer,
  search: searchReducer,
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
});

type RootReducer = ReturnType<typeof reducer>;
const persistedReducer = persistReducer<RootReducer>(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
