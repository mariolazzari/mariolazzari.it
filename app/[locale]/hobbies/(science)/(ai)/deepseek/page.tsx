import { createDeepSeek } from "@ai-sdk/deepseek";
import OpenAI from "openai";
import { generateText } from "ai";

async function DeepSeekPage() {
  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.DEEPSEEK_TOKEN,
  });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);

  return (
    <div>
      <h1>DeepSeek</h1>
    </div>
  );
}

export default DeepSeekPage;
