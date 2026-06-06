const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Pastikan GEMINI_API_KEY sudah dimasukkan di Environment Variables Vercel
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Endpoint Image Prompt
app.post('/api/image-prompt', async (req, res) => {
    const { userPrompt } = req.body;
    if (!userPrompt) return res.status(400).json({ error: 'Prompt tidak boleh kosong' });
    
    try {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userPrompt);
        res.json({ result: result.response.text() });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Endpoint Video Script
app.post('/api/video-script', async (req, res) => {
    const { userPrompt } = req.body;
    if (!userPrompt) return res.status(400).json({ error: 'Konsep tidak boleh kosong' });
    
    try {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userPrompt);
        res.json({ result: result.response.text() });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = app;
