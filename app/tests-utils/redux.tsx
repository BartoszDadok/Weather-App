import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";

const createTestWrapper = () => {
  return ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );
};

export { createTestWrapper };
