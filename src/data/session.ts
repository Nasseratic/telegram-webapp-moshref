import { useMutation, useQuery } from "react-query";
import { supabase } from "../utils/supabase";
import { queryClient } from "../utils/reactQuery";

export const joinSession = async () => {
  const { data, error } = await supabase
    .from("sessionUser")
    .insert({ telegramUsername: USERNAME, sessionId: SESSION_ID })
    .select();
  if (error) throw error;
  return data;
};

export const useJoinSession = () => {
  return useMutation("joinSession", joinSession, {
    onSuccess: () => queryClient.invalidateQueries("session"),
  });
};

export const useSession = () => {
  return useQuery("session", async () => {
    const { data: session, error } = await supabase
      .from("session")
      .select()
      .eq("id", SESSION_ID)
      .single();

    const { data: students, error: error2 } = await supabase
      .from("sessionUser")
      .select()
      .eq("sessionId", SESSION_ID);
    if (error || error2) throw error;

    return {
      students,
      isTeacher: session?.teacherUsername === USERNAME,
    };
  });
};
