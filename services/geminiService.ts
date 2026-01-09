
import { GoogleGenAI } from "@google/genai";

export const generateBirthdayPoem = async (name: string, age: number) => {
  try {
    // Inisialisasi dilakukan di sini sesuai panduan (right before making an API call)
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tuliskan sebuah puisi ulang tahun yang sangat romantis, modern, dan menyentuh hati dalam Bahasa Indonesia untuk ${name} yang hari ini berulang tahun ke-${age}. Gunakan kata-kata yang indah tapi tidak kaku.`,
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Selamat ulang tahun untukmu, Sayang tercinta. 
Di hari yang indah ini, semoga setiap doa yang dipanjatkan menjadi kenyataan. 
Terima kasih telah menjadi bagian paling manis dalam hidupku. 
Bahagiaku adalah melihat senyummu selamanya.`;
  }
};
