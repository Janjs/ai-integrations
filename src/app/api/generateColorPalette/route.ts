import openai from "@/app/api/generateColorPalette/openai";
import { NextResponse } from "next/server";

export interface GenerateColorPaletteRequest {
  prompt: string;
}

export async function POST(req: Request) {
  const userInput: GenerateColorPaletteRequest = await req.json();

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: "You are a color palette generator",
      },
      {
        role: "user",
        content: `Generate a color palette that fits the following description: ${userInput.prompt}}`,
      },
    ],
    functions: [
      {
        "name": "get_color_palette",
        "parameters": {
          "type": "object",
          "required": [
            "colors"
          ],
          "properties": {
            "colors": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Colors part of the color palette in hex code."
            }
          }
        },
      }
    ],
  });

  const response = JSON.parse(completion.data.choices[0].message?.function_call.arguments)

  console.log(response.colors)

  return NextResponse.json({ colors: response.colors });
}

const toColors = (response: string): string[] => {
  return response.split(",").map(color => color.trim())
}

