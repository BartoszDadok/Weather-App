import { SafeAreaProvider } from "react-native-safe-area-context";
import { cloneElement, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
const providers = [<SafeAreaProvider />, <Provider store={store} children />];

const ProviderComposer = ({ children }: PropsWithChildren) =>
  providers.reduceRight(
    (kids, parent) => cloneElement(parent, { children: kids }),
    children
  );

export { ProviderComposer };
