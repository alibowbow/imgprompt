
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getAiSuggestion = async (userKeyword: string): Promise<string> => {
    if (!userKeyword) {
        return "";
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: `Expand the following keyword/idea into a descriptive phrase for an image prompt: "${userKeyword}"` }] },
            config: {
                systemInstruction: "You are an AI assistant that expands a simple keyword into a rich, descriptive phrase suitable for an image generation prompt. Be creative, evocative, and concise. Only return the phrase itself, without any introductory text.",
            }
        });
        
        const text = response.text;
        return text ? text.trim() : "";

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return `(AI suggestion failed: ${error instanceof Error ? error.message : 'Unknown error'})`;
    }
};
