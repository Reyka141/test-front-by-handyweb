"use client";
import { ReactNode } from "react";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
