'use server'

import OpenAI from 'openai';

export async function generateNewsStrategy(newsContext: string, businessNiche: string) {
  if (!process.env.OPENAI_API_KEY) {
    // Mock response for local dev
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `
# Your Custom Action Plan

Based on the news **"${newsContext}"** and your business niche **"${businessNiche}"**, here is your strategy:

### 1. Immediate Action
Update your automated response sequences to reflect the new API pricing structure so you can save 20% on outbound messaging costs starting today.

### 2. Integration Step
Integrate the new AI models into your lead generation chatbot. Focus on using it to answer FAQ queries instantly.

### 3. Long Term Strategy
Build a custom AI agent for your sales team that leverages these new automation capabilities.

*Need help implementing this? Reach out to the Kaiee community for experts!*
    `;
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
    You are an elite business automation consultant. 
    The user has just read the following news headline/context:
    "${newsContext}"

    Their business niche is: "${businessNiche}"

    Write a concise, 3-step actionable strategy (in Markdown format) telling them exactly how they can apply this news to their business using automation/AI. 
    Make it highly practical, high-value, and easy to read. Use headings, bullet points, and bold text.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content || "Strategy generated successfully, but no content was returned.";
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("Failed to generate strategy");
  }
}
