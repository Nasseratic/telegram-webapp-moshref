import { useMutation, useQuery } from "react-query";
import { supabase } from "../utils/supabase";

export const joinSession = async () => {
  const { data, error } = await supabase
    .from("sessionUser")
    .insert({ telegramUsername: "@nasseratic", sessionId: 1 })
    .select();
  if (error) throw error;
  return data;
};

export const useJoinSession = () => {
  return useMutation("joinSession", joinSession);
};
