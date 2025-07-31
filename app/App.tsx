import { NavigationContainer } from "@react-navigation/native";
import { ProviderComposer } from "./providers";
import { Router } from "./router";

const App = () => (
  <NavigationContainer>
    <ProviderComposer>
      <Router />
    </ProviderComposer>
  </NavigationContainer>
);

export default App;
