import { Job, scheduleJob } from "node-schedule";
import fetch, { Headers } from "node-fetch";
import { config } from "dotenv";

config();

const token = process.env.DISCORD_BOY_TOKEN!;
const channelId = process.env.CHANNEL_ID!;
const sendText = Object.freeze({
  tokyoAndZangai:
    "ワールドボス通知:\nアイアンキング(東京)・王将(蔵骸の井戸)が5分後に始まります",
  doroAndYouenchi:
    "ワールドボス通知:\n虚影(95番道路)・影蜘蛛鬼丸(遊園地)が5分後に始まります",
  ehimeAndGakuin:
    "ワールドボス通知:\n妖狐(源氏重工裏)・レビヤタン(愛媛県)・バークマン(カッセル学院)が5分後に始まります",
});

interface ScheduleInitializer {
  token: string;
  channelId: string;
}

class NotifyScheduler {
  /** DiscordAPIのURL */
  private url: string;
  /** HTTPヘッダー */
  private headers: Headers;

  constructor(initializer: ScheduleInitializer) {
    this.url = `https://discord.com/api/channels/${initializer.channelId}/messages`;
    this.headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bot ${initializer.token}`,
    });
  }

  DiscordNotification(name: string, rule: string, content: string): Job {
    const method = "POST";
    const body = content;
    const job = scheduleJob(name, rule, async () => {
      const result = await fetch(this.url, {
        method,
        headers: this.headers,
        body,
      });
      result.ok
        ? console.log("通知は成功しました")
        : console.log("通知は失敗しました");
    });
    return job;
  }
}

const scheduler = new NotifyScheduler({ token, channelId });

scheduler.DiscordNotification(
  "ワールドボス: アイアンキング・王将",
  "55 12 * * *",
  JSON.stringify({ content: sendText.tokyoAndZangai })
);

scheduler.DiscordNotification(
  "ワールドボス: アイアンキング・王将",
  "55 15 * * *",
  JSON.stringify({ content: sendText.tokyoAndZangai })
);

scheduler.DiscordNotification(
  "ワールドボス: アイアンキング・王将",
  "55 18 * * *",
  JSON.stringify({ content: sendText.tokyoAndZangai })
);

scheduler.DiscordNotification(
  "ワールドボス: アイアンキング・王将",
  "55 22 * * *",
  JSON.stringify({ content: sendText.tokyoAndZangai })
);

scheduler.DiscordNotification(
  "ワールドボス: 虚影・影蜘蛛鬼丸",
  "25 14 * * *",
  JSON.stringify({ content: sendText.doroAndYouenchi })
);

scheduler.DiscordNotification(
  "ワールドボス: 虚影・影蜘蛛鬼丸",
  "25 22 * * *",
  JSON.stringify({ content: sendText.doroAndYouenchi })
);

scheduler.DiscordNotification(
  "ワールドボス: レビヤタン・バークマン",
  "25 11 * * *",
  JSON.stringify({ content: sendText.ehimeAndGakuin })
);

scheduler.DiscordNotification(
  "ワールドボス: 妖狐・レビヤタン・バークマン",
  "25 15 * * *",
  JSON.stringify({ content: sendText.ehimeAndGakuin })
);

scheduler.DiscordNotification(
  "ワールドボス: 妖狐・レビヤタン・バークマン",
  "25 19 * * *",
  JSON.stringify({ content: sendText.ehimeAndGakuin })
);

scheduler.DiscordNotification(
  "ワールドボス: 妖狐・レビヤタン・バークマン",
  "25 23 * * *",
  JSON.stringify({ content: sendText.ehimeAndGakuin })
);
