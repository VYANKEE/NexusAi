import OpenAI from 'openai';

// This initializes the client using the API key from your .env file
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
  timeout: 30 * 1000, // 30 second timeout
});

export async function generateText(prompt, history) {
  // Prepare the message history in the format the API expects
  const messages = history.map(msg => ({
    role: msg.role === 'model' ? 'assistant' : 'user',
    content: msg.content
  }));

  // Add the new user prompt
  messages.push({ role: 'user', content: prompt });

  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama3-8b-instruct",
      messages: messages,
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
      stream: false, // Set to false to get the full response at once
    });

    const aiResponseText = completion.choices[0].message.content;
    return aiResponseText;
  } catch (error) {
    console.error("Error generating text from NVIDIA AI:", error);
    throw new Error("Failed to get response from NVIDIA AI");
  }
}