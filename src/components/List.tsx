import { useSession } from "../data/session";

export const List = () => {
  const { data, isLoading } = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <ul>
      {data?.students?.map((item, i) => (
        <ol
          style={{
            color: "white",
          }}
          key={item.id}
        >
          {i + 1} - {item.name ?? item.telegramUsername}
        </ol>
      ))}
    </ul>
  );
};
