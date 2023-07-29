import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useJoinSession } from "./data/session";

export const JoinButton = () => {
  const { mutate, isLoading, isSuccess } = useJoinSession();

  return (
    <div>
      <MainButton
        onClick={() => mutate()}
        progress={isLoading}
        disable={isSuccess || isLoading}
        text={isSuccess ? "تم الاضمام" : "انضم"}
      />
    </div>
  );
};
