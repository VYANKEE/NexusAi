import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import sessionRoutes from './routes/session.js';
import imageRoutes from './routes/image.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
connectDB();

// --- NEW, MORE ROBUST CORS CONFIGURATION ---
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// --- END NEW CORS CONFIGURATION ---


app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/videos', express.static(path.join(__dirname, 'public', 'videos')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/image', imageRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});