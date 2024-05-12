import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store/store";
import App from "./App";
import "./index.css";
import { initTranslation } from "app/translation";

const container = document.getElementById("root")!;
const root = createRoot(container);

const onBeforeLift = async () => {
  await initTranslation();
};

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
      onBeforeLift={onBeforeLift}
    >
      <App />
    </PersistGate>
  </Provider>
  // {/* </React.StrictMode> */}
);
