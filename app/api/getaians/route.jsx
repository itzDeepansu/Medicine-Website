import { NextResponse } from "next/server";
import prisma from '../../libs/prismadb'
import { OpenAI } from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(request) {
    const med_data = await prisma.medicine.findMany();
  let messages = [
    {
      role: "system",
      content:
        "You are a custom data experts that specializes in giving accurate answers based on data provided to you",
    },
    {
      role: "user",
      content:
        "hi , i want to give you some data and i want you to learn from this data and afterwards give me answers specific to this data and if there is something that cannot be answered with the given data , use your intelligence to find it",
    },
    {
      role: "assistant",
      content:
        "Sure, feel free to provide the data, and I'll do my best to learn from it and provide you with answers based on that data.",
    },
    {
      role: "user",
      content:  JSON.stringify(med_data),
    },
    {
      role: "user",
      content:  "either data for given question is available or not , dont mention based on data in your answer",
    },
    {
      role: "assistant",
      content:
        "Hello! It's nice to meet you. How can I assist you today? If you have any questions or tasks you'd like me to help with, feel free to let me know.",
    },
  ];

  const recieveddata = await request.json();
  const question = recieveddata.question;
  messages.push({ role: "user", content: question });
  
  const reply = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  const answer = reply["choices"][0]["message"]["content"];
  messages.push({ role: "assistant", content: answer });

  return NextResponse.json({ answer });
}
