import Url from '../models/UrlModel.js';
import { nanoid } from 'nanoid';
import log from '../middleware/log.js';

export const createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;
    if (!url) return res.status(400).json({ message: 'URL is required' });

    let code = shortcode || nanoid(6);
    const exists = await Url.findOne({ shortCode: code });
    if (exists) return res.status(409).json({ message: 'Shortcode already exists' });

    const expiry = new Date(Date.now() + validity * 60000);

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode: code,
      expiry
    });

    await log("backend", "info", "controller", `Short URL created for ${url}`);

    console.log("contr.. check")

    res.status(201).json({
      shortLink: `http://localhost:4000/${code}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
     try {
      await log("backend", "error", "controller", err.message);
    } catch (logErr) {
      console.error("Failed to log error:", logErr.message);
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUrlStats = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const data = await Url.findOne({ shortCode: shortcode });

    if (!data) return res.status(404).json({ message: 'Shortcode not found' });

    res.json({
      originalUrl: data.originalUrl,
      createdAt: data.createdAt,
      expiry: data.expiry,
      clickCount: data.clicks.length,
      clickDetails: data.clicks
    });
  } catch (err) {
    await log("backend", "error", "controller", err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};