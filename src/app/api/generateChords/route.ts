import openai from "@/app/api/generateChords/openai";
import { NextResponse } from "next/server";

export interface GenerateChordsRequest {
  description: string;
  musicalKey: string;
  musicalScale: string;
}

export async function POST(req: Request) {
  const userInput: GenerateChordsRequest = await req.json();

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `You are a generator of color palette. 
          The user give you a description that describes the vibe of a color palette. You will respond only with five colors in hex code divided by comas, nothing else. Don't add more text than the one I asked for`,
      },
      {
        role: "user",
        content: `Generate a color palette that fits the following description: ${userInput.description}}`,
      },
    ],
  });
  const response = completion.data.choices[0].message?.content

  return NextResponse.json({ colors: toColors(response!!) });
}

const toColors = (response: string): string[] => {
  return response.split(",").map(color => color.trim())
}

