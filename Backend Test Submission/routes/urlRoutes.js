import express from 'express';
import { createShortUrl, getUrlStats } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:shortcode', getUrlStats);

export default router;