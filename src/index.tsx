import ReactDOM from "react-dom/client";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import "antd/dist/reset.css";

import "./index.css";

import { JoinButton } from "./JoinButton";
import { ReactQueryProvider } from "./utils/reactQuery";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  return (
    <ReactQueryProvider>
      <WebAppProvider options={{ smoothButtonsTransition: true }}>
        <JoinButton />
      </WebAppProvider>
    </ReactQueryProvider>
  );
};

root.render(<App />);
