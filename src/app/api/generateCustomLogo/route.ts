import openai from "@/app/api/generateColorPalette/openai";
import { NextResponse } from "next/server";
import replicate from "./replicate";

export interface GenerateCustomLogoRequest {
  originalLogo: string;
  prompt: string;
}

export async function POST(req: Request) {
  const userInput: GenerateCustomLogoRequest = await req.json();

  const output: any = await replicate.run(
    "jagilley/controlnet-seg:f967b165f4cd2e151d11e7450a8214e5d22ad2007f042f2f891ca3981dbfba0d",
    {
      input: {
        image: userInput.originalLogo,
        prompt: userInput.prompt,
        num_samples: "1",
        image_resolution: "512",
        ddim_steps: 20,
        scale: 9,
        a_prompt: "best quality, photorealistic",
        n_prompt: "cropped, worst quality, low quality"
      }
    }
  )

  return NextResponse.json({ customizedLogo: output[1] });
}
