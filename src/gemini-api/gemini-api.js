import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const GeminiApi = {
    async run(prompt) {
      if (!prompt) {
        throw new Error('Prompt is required');
      }

      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent( prompt );
        const response = result.response;
        const text = response.text();
        console.log(text);

        return { success: true, text };
      } catch (error) {
          if (error.response && error.response.candidates) {
            console.error('Error generating content:', error);
            return { success: false, message: error.response.candidates };
        }

        throw error;
      }
    }
  };

export default GeminiApi;

