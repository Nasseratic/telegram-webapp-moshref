import { Button, Form, Input, Typography, Switch } from "antd";
import { FC, useState } from "react";
import {
  MainButton,
  MainButtonProps,
} from "@vkruglikov/react-telegram-web-app";

export const JoinButton: FC<{
  initialValues?: Partial<MainButtonProps> & { show?: boolean };
}> = ({ initialValues }) => {
  const [joinState, setJoinState] = useState(false);

  return (
    <div>
      <MainButton
        onClick={() => setJoinState((state) => !state)}
        text={joinState ? "تم الاضمام" : "انضم"}
      />
    </div>
  );
};
