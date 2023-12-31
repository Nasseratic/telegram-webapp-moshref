import { useSession, useSetTurn, useStudents } from "../data/session";
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";

export const List = () => {
  const { data: students, isLoading } = useStudents();

  const [, themeParams] = useThemeParams();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-2 pt-4  divide-y divide-gray-200 dark:divide-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
          الأدوار
        </h5>
      </div>
      <div className="flow-root">
        {students?.length === 0 ? (
          <div className="flex items-center justify-between my-4">
            <h5 className="text-xl font-light leading-none text-gray-900 dark:text-white">
              لا يوجد طلاب بعد
            </h5>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {students?.map((student) => (
              <StudentItem student={student} key={student.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const StudentItem = ({
  student,
}: {
  student: NonNullable<ReturnType<typeof useStudents>["data"]>[number];
}) => {
  const { data: session } = useSession();
  const { mutate } = useSetTurn();

  const isCurrentStudent = session?.currentSessionUserId === student.id;

  return (
    <li className="pt-3 pb-0 sm:pt-4">
      <div className="flex items-center pb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            {session?.isTeacher ? (
              <button
                type="button"
                onClick={() =>
                  mutate(isCurrentStudent ? undefined : student.id)
                }
                className={
                  "bg-zinc-700 text-white text-3xl font-medium rounded-md p-2.5 py-0.5 text-center inline-flex items-center mr-2"
                }
              >
                {isCurrentStudent ? "🎙️" : "👈"}
              </button>
            ) : (
              <div className={"flex-shrink-0"}>
                <p
                  className={`text-3xl ${isCurrentStudent ? "" : "opacity-10"}`}
                >
                  🎙️
                </p>
              </div>
            )}
            <p
              className={`text-2xl font-medium text-gray-900 truncate dark:text-white ${
                isCurrentStudent
                  ? "underline underline-offset-4"
                  : " opacity-80"
              }`}
            >
              {student.name ?? student.telegramUsername}
            </p>
          </div>
        </div>
        {session?.isTeacher && isCurrentStudent && (
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <button
              type="button"
              className="focus:outline-none text-white font-medium rounded-lg text-2xl px-2 py-0.5"
            >
              ✅
            </button>

            <button
              type="button"
              className="focus:outline-none text-white font-medium rounded-lg text-2xl px-2 py-0.5"
            >
              ❌
            </button>
          </div>
        )}
      </div>
    </li>
  );
};
