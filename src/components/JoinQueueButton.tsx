import {
  MainButton,
  MainButtonProps,
  useHapticFeedback,
} from "@vkruglikov/react-telegram-web-app";
import { useJoinSession } from "../data/session";

export const JoinQueueButton = ({ isInQueue }: { isInQueue: boolean }) => {
  const [impact] = useHapticFeedback();
  const { mutate: join, isLoading } = useJoinSession();

  const disable = isInQueue || isLoading;

  const buttonProps: MainButtonProps = isInQueue
    ? {
        text: "تم حجز ✅",
        color: "#3a5a40",
        textColor: "#fff",
      }
    : {
        text: "خذ دور",
        color: "#00487C",
        textColor: "#fff",
        onClick: () => {
          impact("light");
          join();
        },
      };

  return (
    <div style={{ color: "white" }}>
      <MainButton progress={isLoading} disable={disable} {...buttonProps} />
    </div>
  );
};
