import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useSession, useSetTurn, useStudents } from "../data/session";

export const ManageQueueButton = () => {
  const { data: session } = useSession();
  const { data: students } = useStudents();
  const { mutate } = useSetTurn();

  const currentStudentIndex =
    students?.findIndex(
      (student) => student.id === session?.currentSessionUserId
    ) ?? -1;

  const nextStudentId = students?.[currentStudentIndex + 1]?.id;

  if (!nextStudentId) return null;

  return (
    <div style={{ color: "white" }}>
      <MainButton
        text="⬇️ التالي"
        color="#1a659e"
        textColor="#fff"
        onClick={() => mutate(nextStudentId)}
      />
    </div>
  );
};
