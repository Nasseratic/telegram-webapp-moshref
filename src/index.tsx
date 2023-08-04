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
import { useSession } from "./data/session";
import { ManageQueueButton } from "./components/ManageQueueButton";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

type StudentsList = NonNullable<
  ReturnType<typeof useSession>["data"]
>["students"];

const TeacherView = () => {
  return (
    <div>
      <List />
      <ManageQueueButton />
    </div>
  );
};

const StudentView = ({ students }: { students: StudentsList }) => {
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
  const [, themeParams] = useThemeParams();
  const { data: session, isLoading: isLoadingSessions } = useSession();

  useEffect(() => {
    if (themeParams.bg_color)
      document.body.style.backgroundColor = themeParams.bg_color;
  }, []);

  if (isLoadingSessions || !session) return null;

  return session.isTeacher ? (
    <TeacherView />
  ) : (
    <StudentView students={session.students} />
  );
};

const App = () => {
  return (
    <ReactQueryProvider>
      <WebAppProvider options={{ smoothButtonsTransition: true }}>
        <div className="p-8">
          <Root />
        </div>
      </WebAppProvider>
    </ReactQueryProvider>
  );
};

root.render(<App />);
