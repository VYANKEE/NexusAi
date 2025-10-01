import axios from 'axios';
import fs from 'fs';
import path from 'path';

// FIX: Updated to a widely available stable diffusion model ID
const ENGINE_ID = 'stable-diffusion-xl-1024-v1-0';
const API_HOST = 'https://api.stability.ai';

export const generateImage = async (prompt) => {
  if (!process.env.STABILITY_API_KEY) {
    throw new Error('Missing Stability AI API key.');
  }

  try {
    const response = await axios.post(
      `${API_HOST}/v1/generation/${ENGINE_ID}/text-to-image`,
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        timeout: 120000,
      }
    );

    const image = response.data.artifacts[0];
    const fileName = `img-${Date.now()}.png`;
    const filePath = path.join('public', 'images', fileName);
    
    fs.writeFileSync(filePath, Buffer.from(image.base64, 'base64'));

    const imageUrl = `/images/${fileName}`;
    return imageUrl;
    
  } catch (error) {
    console.error("Error generating image from Stability AI:", error.response?.data || error.message);
    throw new Error('Failed to generate image.');
  }
};