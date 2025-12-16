import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// REMOVED: export const runtime = "edge"; 
// (Node runtime is more stable for debugging API key issues)

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "Gemini API Key is missing" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try the standard fast model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // --- FALLBACK MECHANISM ---
    // If the API fails (404, Quota, etc.), return default questions 
    // so the user's app doesn't crash.
    const fallbackText = "What's a hobby you've always wanted to pick up?||If you could have dinner with any historical figure, who would it be?||What's the best piece of advice you've ever received?";
    
    return NextResponse.json(
      { text: fallbackText }, 
      { status: 200 } // Return 200 OK even if AI failed, so the UI works
    );
  }
}
