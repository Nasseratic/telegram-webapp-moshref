import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabaseTypes";

export const supabase = createClient<Database>(
  "https://oaleghpudvrsnbvaqdzt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hbGVnaHB1ZHZyc25idmFxZHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2MjQ4NzEsImV4cCI6MjAwNjIwMDg3MX0.PWshisSwUUMG-IE7JnsucrtdxpV310keb1uvDQzP_6o"
);
