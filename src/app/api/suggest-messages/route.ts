import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";

export const runtime = "edge"; // keep edge runtime

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.";

    // Use the fastest free model: **gemini-1.5-flash**
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Start streaming response
    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Convert Gemini stream → Web stream for Next.js
    const stream = GoogleGenerativeAIStream(result);

    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
