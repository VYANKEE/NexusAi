import mongoose from 'mongoose';

const videoJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['queued', 'processing', 'completed', 'failed'],
    default: 'queued',
  },
  bullJobId: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
  },
  errorMessage: {
    type: String,
  }
}, {
  timestamps: true,
});

const VideoJob = mongoose.model('VideoJob', videoJobSchema);

export default VideoJob;