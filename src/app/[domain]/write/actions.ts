'use server'

import OpenAI from 'openai';

export async function generateArticle(businessInfo: string) {
  // If OpenAI key is missing, mock the response for local testing
  if (!process.env.OPENAI_API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
    return {
      seoTitle: "Boost Your Business with Automation Strategies",
      metaDesc: "Learn how modern businesses are leveraging AI and WhatsApp automation to scale operations, increase customer retention, and drive massive revenue growth.",
      articleHtml: `
        <h1>How Automation Transformed Our Workflow</h1>
        <p>Running a business in today's fast-paced environment requires more than just hard work; it demands smart systems. Based on the details provided: <strong>${businessInfo}</strong>, we've outlined a comprehensive strategy.</p>
        <h2>The Power of WhatsApp</h2>
        <p>By integrating the WhatsApp Business API, customer inquiries are handled instantly, leading to a 40% increase in conversions.</p>
        <p>This is a simulated AI response because the OPENAI_API_KEY environment variable is not set. Add your key to generate real articles!</p>
      `
    }
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
    You are an expert SEO content writer and business strategist.
    Write a highly engaging, SEO-optimized article based on the following business information:
    "${businessInfo}"

    Requirements:
    1. Write the article in HTML format (use <h1>, <h2>, <p>, <ul>). Do not wrap in markdown code blocks.
    2. The article should read like a high-quality Medium post.
    3. Provide an SEO title (max 60 chars) and Meta Description (max 160 chars).

    Respond strictly in JSON format:
    {
      "seoTitle": "string",
      "metaDesc": "string",
      "articleHtml": "string"
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("Failed to generate article");
  }
}

export async function generateOmnichannelContent(articleText: string) {
  if (!process.env.OPENAI_API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      linkedinPost: "🚀 Just published a new deep dive into automation!\n\nHere's what you need to know:\n\n1️⃣ Automation saves time.\n2️⃣ AI is the future.\n3️⃣ Start today.\n\nRead the full article in the community! #Automation #AI #Business",
      twitterThread: "1/ We just broke down how automation changes the game. 🧵\n\n2/ It's not just about saving time; it's about scaling intelligently.\n\n3/ Check out the full breakdown on our community platform! 👇",
      videoScript: "**[HOOK]** Want to save 20 hours a week?\n\n**[BODY]** Stop doing repetitive tasks manually. By setting up simple workflows, you can automate your entire customer journey. \n\n**[CTA]** Hit the link in my bio to read the exact strategy I used to scale!"
    };
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
    You are an elite social media manager and content repurposer.
    Take the following article text and convert it into a marketing kit:
    1. A highly engaging LinkedIn post (with emojis and line breaks).
    2. A Twitter thread (short, punchy, numbered).
    3. A 60-second Short-form Video Script (Hook, Body, CTA).

    Article Text:
    "${articleText.substring(0, 3000)}" // limit context

    Respond strictly in JSON format:
    {
      "linkedinPost": "string",
      "twitterThread": "string",
      "videoScript": "string"
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("Failed to generate marketing kit");
  }
}
