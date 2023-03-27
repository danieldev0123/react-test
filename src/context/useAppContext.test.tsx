import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { AppContextProvider } from "./AppContext";
import useAppContext from "./useAppContext";

describe("useAppContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AppContextProvider>{children}</AppContextProvider>
  );

  it('returns default values', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
    expect(result.current.deviceType).toBe('tablet');
    expect(result.current.theme).toBe('light');
    expect(typeof result.current.setTheme).toBe("function");
  });

  it("should update window size and device type on resize", async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    const resizeEvent = new Event("resize");
    Object.defineProperty(window, "innerWidth", { writable: true, value: 500 });
    Object.defineProperty(window, "innerHeight", { writable: true, value: 800 });

    act(() => {
      window.dispatchEvent(resizeEvent);
    });

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(800);
    expect(result.current.deviceType).toBe("mobile");
  });

  it("should update theme on change", async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.setTheme("dark");
    });
    expect(result.current.theme).toBe("dark");
  });
});
