import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";

test("renders app component", () => {
  const { getByText } = render(
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );

  const widthText = getByText(/Width/i);
  const heightText = getByText(/Height/i);
  const deviceTypeText = getByText(/Device Type/i);
  const switchThemeButton = getByText(/Switch to Dark Theme/i);

  expect(widthText).toBeInTheDocument();
  expect(heightText).toBeInTheDocument();
  expect(deviceTypeText).toBeInTheDocument();
  expect(switchThemeButton).toBeInTheDocument();
});

test("switches theme correctly", () => {
  const { getByText } = render(
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );

  const switchThemeButton = getByText(/Switch to Dark Theme/i);

  fireEvent.click(switchThemeButton);

  expect(switchThemeButton).toHaveTextContent(/Switch to Light Theme/i);
});
