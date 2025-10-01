import { Queue } from 'bullmq';
import IORedis from 'ioredis';

// Create a new connection instance specifically for the queue
const connection = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null
});

// Create and export the video job queue
export const videoJobQueue = new Queue('video-generation', { connection });

// We don't need the connection logs anymore
// We don't export the connection anymore