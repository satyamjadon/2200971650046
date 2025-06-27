import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  timestamp: Date,
  referrer: String,
  location: String
});

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  expiry: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  clicks: [clickSchema]
});

export default mongoose.model('Url', urlSchema);