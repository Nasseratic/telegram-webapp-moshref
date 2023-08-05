import ReactDOM from "react-dom/client";
import {
  WebAppProvider,
  useThemeParams,
} from "@vkruglikov/react-telegram-web-app";

import { JoinQueueButton } from "./components/JoinQueueButton";
import { ReactQueryProvider } from "./utils/reactQuery";
import { List } from "./components/List";
import { USERNAME } from "./utils/config";
import { useEffect } from "react";
import { useSession, useStudents } from "./data/session";
import { ManageQueueButton } from "./components/ManageQueueButton";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const TeacherView = () => {
  return (
    <div>
      <List />
      <ManageQueueButton />
    </div>
  );
};

const StudentView = () => {
  const { data: students, isLoading } = useStudents();

  if (isLoading || !students) return null;

  const isInQueue = students.some(
    (sessionUser) => sessionUser.telegramUsername === USERNAME
  );

  return (
    <div>
      <List />
      <JoinQueueButton isInQueue={isInQueue} />
    </div>
  );
};

const Root = () => {
  const [colorScheme, themeParams] = useThemeParams();
  const { data: session, isLoading } = useSession();

  useEffect(() => {
    if (themeParams.bg_color)
      document.body.style.backgroundColor = themeParams.bg_color;
    if (colorScheme) document.body.classList.add(colorScheme);
  }, []);

  if (isLoading || !session) return null;

  return session.isTeacher ? <TeacherView /> : <StudentView />;
};

const App = () => {
  return (
    <ReactQueryProvider>
      <WebAppProvider options={{ smoothButtonsTransition: true }}>
        <div className="p-3">
          <Root />
        </div>
      </WebAppProvider>
    </ReactQueryProvider>
  );
};

root.render(<App />);
