import { useSession } from "../data/session";
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";

export const List = () => {
  const { data, isLoading } = useSession();
  const [, themeParams] = useThemeParams();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <ul>
      {data?.students?.map((item, i) => (
        <ol
          style={{
            color: themeParams.text_color,
          }}
          key={item.id}
        >
          {i + 1} - {item.name ?? item.telegramUsername}
        </ol>
      ))}
    </ul>
  );
};
