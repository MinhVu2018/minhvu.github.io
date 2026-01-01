import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the Gemini Client
// NOTE: In a real production app, you might proxy this through a backend to hide the key,
// but for this frontend-only demo, we use the env variable directly as per instructions.
const apiKey = process.env.API_KEY || '';

let client: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables.");
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const initializeChat = async (): Promise<Chat> => {
  const ai = getClient();
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
  return chatSession;
};

export const sendMessageStream = async function* (message: string) {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  try {
    const resultStream = await chatSession.sendMessageStream({ message });

    for await (const chunk of resultStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            yield c.text;
        }
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    yield "I'm sorry, I'm having trouble connecting to my brain right now. Please check the API key or try again later.";
  }
};

export const generateContent = async (prompt: string): Promise<string> => {
    const ai = getClient();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                systemInstruction: "You are a helpful AI assistant embedded in a portfolio website."
            }
        });
        return response.text || "No response generated.";
    } catch (error) {
        console.error("Error generating content:", error);
        return "System error: Unable to generate content at this time.";
    }
};