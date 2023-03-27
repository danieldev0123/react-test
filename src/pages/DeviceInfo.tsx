import useAppContext from "../context/useAppContext";
import "../App.css";

const App = () => {
  const { width, height, deviceType, theme, setTheme } = useAppContext();

  return (
    <div className="container">
      <div className="device-info">
        <p>Width: {width}</p>
        <p>Height: {height}</p>
        <p>Device Type: {deviceType}</p>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
        </button>
      </div>
    </div>
  );
};

export default App;
