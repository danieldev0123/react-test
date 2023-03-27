import React, { useMemo, useState } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";
export type Theme = "light" | "dark";

interface AppContextProps {
  width: number;
  height: number;
  deviceType: DeviceType;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setWidth: (size: number) => void;
  setHeight: (size: number) => void;
}

const AppContext = React.createContext({} as AppContextProps);

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  const deviceType = useMemo<DeviceType>(() => {
    if (width <= 768) {
      return "mobile";
    } else if (width <= 1024) {
      return "tablet";
    } else {
      return "desktop";
    }
  }, [width]);

  return (
    <AppContext.Provider
      value={{
        theme,
        deviceType,
        width,
        height,
        setTheme,
        setWidth,
        setHeight,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
