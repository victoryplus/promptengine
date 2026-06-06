const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Inisialisasi Google AI Object
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Tambahan Endpoint TEST (Agar saat dibuka di browser tidak error 500)
app.get('/api/image-prompt', (req, res) => {
    res.json({ 
        status: "Online", 
        message: "Backend PromptCraft siap menerima POST request dari Telegram Mini App!" 
    });
});

app.get('/api/video-script', (req, res) => {
    res.json({ 
        status: "Online", 
        message: "Backend Video Script siap menerima POST request!" 
    });
});

// Endpoint Utama Image Prompt (Untuk dihubungkan ke aplikasi)
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

// Endpoint Utama Video Script (Untuk dihubungkan ke aplikasi)
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
