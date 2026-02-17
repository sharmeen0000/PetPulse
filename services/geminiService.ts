
import { GoogleGenAI } from "@google/genai";

export const checkSymptoms = async (petInfo: string, symptoms: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: You are a professional veterinary symptom checker assistant. 
      Pet Info: ${petInfo}
      Symptoms: ${symptoms}
      
      Please provide:
      1. Potential causes (strictly non-definitive, always advise seeing a vet).
      2. Urgency level (Low, Moderate, High, Emergency).
      3. Immediate steps for the owner.
      4. Questions to ask their veterinarian.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error in Gemini symptom check:", error);
    return "I'm sorry, I'm having trouble analyzing the symptoms right now. Please consult a physical veterinarian immediately if this is an emergency.";
  }
};

export const assistDiagnosis = async (patientHistory: string, currentCondition: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Context: You are an advanced AI assistant for licensed Veterinarians.
      Patient History: ${patientHistory}
      Current Observations: ${currentCondition}
      
      Based on veterinary literature, please provide:
      1. Differential Diagnosis list.
      2. Recommended diagnostic tests.
      3. Potential treatment pathways.
      4. Drug interaction warnings relevant to this case.`,
      config: {
        temperature: 0.2,
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error in Gemini diagnosis assist:", error);
    return "Unable to provide diagnosis assistance at this moment.";
  }
};

export const getAIAssistantResponse = async (history: { role: string, parts: { text: string }[] }[], message: string, mode: 'GENERAL' | 'TRIAGE' = 'GENERAL') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const systemInstruction = mode === 'TRIAGE' 
      ? "You are the PetPulse Medical Triage AI. Your goal is to analyze symptoms provided by pet owners and suggest urgency levels. ALWAYS include a disclaimer that you are not a replacement for a human vet. Format your response with clear sections: Possible Causes, Urgency, and Next Steps."
      : "You are the PetPulse AI Assistant, a friendly pet care helper. You provide advice on nutrition, behavior, and general wellness. Keep your tone empathetic and helpful.";

    // Pass history to the chat session to maintain conversation context
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });
    
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having a little trouble connecting to my pet health database. Please try again or contact a human vet if this is urgent.";
  }
};
