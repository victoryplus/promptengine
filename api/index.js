const express = require('express');
const cors = require('cors');
// PERBAIKAN UTAMA: Menggunakan GoogleGenAI yang benar tanpa kurung kurawal hancur
const { GoogleGenAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Inisialisasi Google AI dengan parameter objek apiKey yang valid
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Rute tes browser (GET) agar tidak memicu crash saat Anda buka langsung
app.get('/api/image-prompt', (req, res) => {
    res.json({ 
        status: "Online", 
        message: "Backend PromptCraft aktif dan siap menerima request POST!" 
    });
});

app.get('/api/video-script', (req, res) => {
    res.json({ 
        status: "Online", 
        message: "Backend Video Script aktif!" 
    });
});

// Endpoint Utama Image Prompt (POST)
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

// Endpoint Utama Video Script (POST)
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
