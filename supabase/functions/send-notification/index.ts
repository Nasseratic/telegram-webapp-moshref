// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

import type { Database } from "../../../src/utils/supabaseTypes.ts";

import {
  Bot,
  InlineKeyboard,
  webhookCallback,
} from "https://deno.land/x/grammy/mod.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Keyboard } from "https://deno.land/x/grammy@v1.17.2/mod.ts";

const supabase = createClient<Database>(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

const bot = new Bot(Deno.env.get("TELEGRAM_BOT_TOKEN") || "");

console.log(`Telegram-bot up and running!`);

bot.hears(/id:/, async (ctx) => {
  console.log(ctx.message?.text);
  if (ctx.message?.text?.includes("id:")) {
    const id = ctx.message.text.split("id:")[1];
    const chatId = (
      await supabase.from("group").select("*").eq("id", parseInt(id)).single()
    ).data?.chatId;

    if (!chatId) {
      return await ctx.reply("المجموعة غير موجودة");
    }

    const session = (
      await supabase
        .from("session")
        .insert([
          {
            teacherUsername: ctx.from?.username,
          },
        ])
        .select()
        .single()
    ).data;

    await bot.api.sendMessage(
      chatId,
      `https://t.me/elmoshrefbot/dori?startapp=${session.id}`
    );
  }
});

// bot.api.setMyCommands([{ command: "setup", description: "تجهيز المجموعة" }], {
//   scope: {
//     type: "all_group_chats",
//   },
// });

bot.api.setMyCommands(
  [{ command: "newsession", description: "إنشاء حلقة جديدة" }],
  {
    scope: {
      type: "all_private_chats",
    },
  }
);

bot.command("start", async (ctx) => {
  await ctx.reply("أهلا بك في بوت ");
  await ctx.reply("لإنشاء حلقة جديدة /newsession");
});

bot.command("newsession", async (ctx) => {
  const groups = await supabase.from("group").select("*");

  const keyboard = new Keyboard();

  groups.data?.forEach((group) => {
    keyboard.text(`${group.name ?? "??"}                --  id:${group.id}`);
  });
  keyboard.resized();

  try {
    await ctx.reply("اختر المجموعة", {
      reply_markup: keyboard.oneTime(true),
    });
  } catch (err) {
    console.log(err);
  }
});

bot.command("setup", async (ctx) => {
  if (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup") {
    return await ctx.reply("هذه ليست مجموعة");
  }

  const existing = (
    await supabase.from("group").select("*").eq("chatId", ctx.chat.id).single()
  ).data;

  if (existing) {
    return await ctx.reply("المجموعة مجهزه بالفعل");
  }

  await supabase
    .from("group")
    .insert([{ chatId: ctx.chat.id, name: ctx.chat.title }]);

  await ctx.reply("تم تجهيز المجموعة");
});

const handleUpdate = webhookCallback(bot, "std/http");

serve(async (req) => {
  try {
    const url = new URL(req.url);
    if (url.searchParams.get("secret") !== Deno.env.get("FUNCTION_SECRET"))
      return new Response("not allowed", { status: 405 });

    return await handleUpdate(req);
  } catch (err) {
    console.error(err);
  }
});
