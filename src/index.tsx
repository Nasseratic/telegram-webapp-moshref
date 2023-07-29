import ReactDOM from "react-dom/client";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import "antd/dist/reset.css";

import "./index.css";

import { JoinButton } from "./JoinButton";
import { ReactQueryProvider } from "./utils/reactQuery";
import { List } from "./List";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log((window as any)?.Telegram.WebApp?.initDataUnsafe?.user);
console.log((window as any)?.Telegram.WebApp);
const USERNAME = (window as any)?.Telegram.WebApp?.initDataUnsafe?.user
  ?.username;
const NAME = `${
  (window as any)?.Telegram.WebApp?.initDataUnsafe?.user?.first_name
} ${(window as any)?.Telegram.WebApp?.initDataUnsafe?.user?.last_name}`;

const SESSION_ID = (window as any)?.Telegram.WebApp?.initDataUnsafe
  ?.start_param;

const App = () => {
  return (
    <ReactQueryProvider>
      <WebAppProvider options={{ smoothButtonsTransition: true }}>
        <h2 style={{ color: "white" }}> الادوار:</h2>

        <List />
        <br />
        <br />

        <p style={{ background: "white", padding: 10 }}>
          <h4> Info</h4>
          name: {NAME}
          <br />
          username @{USERNAME}
        </p>
        <JoinButton />
      </WebAppProvider>
    </ReactQueryProvider>
  );
};

root.render(<App />);
