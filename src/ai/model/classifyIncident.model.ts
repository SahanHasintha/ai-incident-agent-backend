import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import 'dotenv/config';

export const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0.3,
    apiKey: process.env.GEMINI_API_KEY,
  });