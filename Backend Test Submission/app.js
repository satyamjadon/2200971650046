import express from 'express';
import urlRoutes from './routes/urlRoutes.js';
import { connectDB } from './config/db.js';

const app = express();
app.use(express.json());
app.use('/', urlRoutes);

connectDB();

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));