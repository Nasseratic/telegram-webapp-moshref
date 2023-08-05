import { useMutation, useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import { queryClient } from "../utils/reactQuery";
import { NAME, SESSION_ID, USERNAME } from "../utils/config";
import { useEffect } from "react";

export const useSession = () => {
  const query = useQuery("session", async () => {
    const { data: session, error } = await supabase
      .from("session")
      .select("*")
      .eq("id", SESSION_ID)
      .single();

    if (error) throw error;

    return {
      ...session,
      isTeacher: session?.teacherUsername === USERNAME,
    };
  });
  useEffect(() => {
    // turnChannel;
  }, []);

  return query;
};

export const useStudents = () => {
  return useQuery("students", async () => {
    const { data: students, error } = await supabase
      .from("sessionUser")
      .select("*")
      .eq("sessionId", SESSION_ID);

    if (error) throw error;

    return students;
  });
};

export const useJoinSession = () => {
  return useMutation(
    "joinSession",
    async () => {
      const { data, error } = await supabase
        .from("sessionUser")
        .insert({
          telegramUsername: USERNAME,
          sessionId: SESSION_ID,
          name: NAME,
        })
        .select();
      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries("session"),
    }
  );
};

const turnChannel = supabase
  .channel("turn")
  .on(
    "broadcast",
    {
      event: "setTurn",
    },
    ({ payload }) => {
      queryClient.setQueryData("session", (session: any) => ({
        ...session,
        currentSessionUserId: payload.currentSessionUserId,
      }));
    }
  )
  .subscribe();

export const useSetTurn = () => {
  return useMutation(
    "setTurn",
    async (currentSessionUserId?: number): Promise<any> => {
      queryClient.setQueryData("session", (session: any) => ({
        ...session,
        currentSessionUserId,
      }));

      const { data, error } = await supabase
        .from("session")
        .update({ currentSessionUserId })
        .eq("id", SESSION_ID)
        .select();

      if (error) {
        queryClient.invalidateQueries("session");
        throw error;
      }

      turnChannel.send({
        event: "setTurn",
        type: "broadcast",
        payload: {
          currentSessionUserId,
        },
      });
      return data;
    }
  );
};
