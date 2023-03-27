import { useEffect, useContext, useCallback, useMemo } from "react";
import throttle from "lodash/throttle";
import AppContext from "./AppContext";

const useAppContext = () => {
  const {
    width,
    height,
    theme,
    deviceType,
    setTheme,
    setWidth,
    setHeight,
  } = useContext(AppContext);

  const calculateDeviceType = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, [setWidth, setHeight]);

  const handleResize = useMemo(
    () =>
      throttle(() => {
        calculateDeviceType();
      }, 100),
    [calculateDeviceType]
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleThemeChange = useCallback(
    (newTheme: "light" | "dark") => {
      setTheme(newTheme);
    },
    [setTheme]
  );

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const appContextValue = useMemo(
    () => ({
      width,
      height,
      deviceType,
      theme,
      setTheme: handleThemeChange,
    }),
    [width, height, deviceType, theme, handleThemeChange]
  );

  return appContextValue;
};

export default useAppContext;
