import { AppContextProvider } from "./context/AppContext";
import DeviceInfo from "./pages/DeviceInfo";

const App = () => {
  return (
    <AppContextProvider>
      <DeviceInfo />
    </AppContextProvider>
  );
};

export default App;
