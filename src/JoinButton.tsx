import {
  MainButton,
  MainButtonProps,
  useHapticFeedback,
} from "@vkruglikov/react-telegram-web-app";
import { useJoinSession, useSession } from "./data/session";
import { match, P } from "ts-pattern";
import { USERNAME } from "./utils/app";

export const JoinButton = () => {
  const [impact] = useHapticFeedback();
  const { mutate: join, isLoading } = useJoinSession();

  const { data, isLoading: isLoadingSessions } = useSession();

  const isAlreadyJoined = data?.students.some(
    (sessionUser) => sessionUser.telegramUsername === USERNAME
  );

  const disable = isAlreadyJoined || isLoading;

  if (isLoadingSessions) return null;

  const buttonProps: MainButtonProps | null = match([
    data?.isTeacher && false,
    isAlreadyJoined,
  ])
    .with([true, P.boolean], () => ({
      text: "⬇️ التالي",
      color: "#1a659e",
      textColor: "#fff",
      onClick: () => {},
    }))
    .with([false, true], () => ({
      text: "تم حجز ✅",
      color: "#3a5a40",
      textColor: "#fff",
    }))
    .with([false, false], () => ({
      text: "خذ دور",
      color: "#00487C",
      textColor: "#fff",
      onClick: () => {
        impact("light");
        join();
      },
    }))
    .otherwise(() => null);

  if (!buttonProps) return null;

  return (
    <div style={{ color: "white" }}>
      <MainButton progress={isLoading} disable={disable} {...buttonProps} />
    </div>
  );
};
