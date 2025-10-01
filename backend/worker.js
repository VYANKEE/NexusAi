import 'dotenv/config';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import axios from 'axios'; // We'll use axios to talk to Ollama
import fs from 'fs';
import path from 'path';
import connectDB from './config/db.js';
import VideoJob from './models/VideoJob.js';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

connectDB();

// The local URL for your Ollama server
const OLLAMA_API_URL = "http://localhost:11434/api/generate";

const connection = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null
});

console.log("🎬 Worker process started, using local Ollama server...");

const worker = new Worker('video-generation', async job => {
  console.log(`[WORKER] Picked up job ${job.id}`);
  const { prompt } = job.data;

  await VideoJob.findOneAndUpdate({ bullJobId: job.id }, { status: 'processing' });

  try {
    // NOTE: This is a placeholder as Ollama does not do video.
    // We are simulating the process with a text generation call to confirm the architecture works.
    console.log(`Simulating video generation for prompt: "${prompt}"`);
    
    // Call the local Ollama API for a text response to simulate a long task
    await axios.post(OLLAMA_API_URL, {
      model: "llama3:8b",
      prompt: `Create a short, one-sentence description for a video about: ${prompt}`
    });

    // Since we can't generate a real video locally, we will use a placeholder
    const placeholderVideoUrl = "/videos/placeholder.mp4";
    console.log(`✅ Video simulation complete! Using placeholder: ${placeholderVideoUrl}`);
    
    // You would need to create a placeholder.mp4 file in your backend/public/videos folder.
    
    await VideoJob.findOneAndUpdate(
      { bullJobId: job.id },
      { status: 'completed', videoUrl: placeholderVideoUrl }
    );
    
    return { status: 'Complete', videoUrl: placeholderVideoUrl };

  } catch (error)
 {
    console.error(`Job ${job.id} failed with error:`, error);
    await VideoJob.findOneAndUpdate(
      { bullJobId: job.id },
      { status: 'failed', errorMessage: 'Failed to simulate video generation.' }
    );
    throw error;
  }
}, { connection });

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} has failed in BullMQ: ${err.message}`);
});