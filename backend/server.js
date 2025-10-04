import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
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

app.use(cors()); // Use default CORS for simplicity
app.use(helmet({ contentSecurityPolicy: false })); // Adjust helmet for serving files
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/image', imageRoutes);

// --- Serve Frontend ---
app.use(express.static(path.join(__dirname, 'public', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});