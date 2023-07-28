import ReactDOM from "react-dom/client";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import "antd/dist/reset.css";

import "./index.css";

import { JoinButton } from "./JoinButton";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  return (
    <WebAppProvider options={{ smoothButtonsTransition: true }}>
      <JoinButton />
    </WebAppProvider>
  );
};

root.render(<App />);
