import ReactDOM from "react-dom/client";
import {
  WebAppProvider,
  useThemeParams,
} from "@vkruglikov/react-telegram-web-app";
import "antd/dist/reset.css";

import "./index.css";

import { JoinButton } from "./JoinButton";
import { ReactQueryProvider } from "./utils/reactQuery";
import { List } from "./List";
import { NAME, USERNAME } from "./utils/app";
import { useEffect } from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Root = () => {
  const [, themeParams] = useThemeParams();

  useEffect(() => {
    if (themeParams.bg_color)
      document.body.style.backgroundColor = themeParams.bg_color;
  }, []);

  return (
    <div>
      <h2 style={{ color: "white" }}> الادوار:</h2>
      <List />
      <JoinButton />
    </div>
  );
};

const App = () => {
  return (
    <ReactQueryProvider>
      <WebAppProvider options={{ smoothButtonsTransition: true }}>
        <Root />
      </WebAppProvider>
    </ReactQueryProvider>
  );
};

root.render(<App />);
