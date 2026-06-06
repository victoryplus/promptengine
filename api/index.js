const express = require('express');
const cors = require('cors');
// Mengambil modul bawaan Google Gen AI SDK secara utuh
const { GoogleGenAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Inisialisasi menggunakan sintaks objek konfigurasi resmi SDK terbaru
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Endpoint Tes Browser (GET) agar tidak memicu error 500 saat diakses langsung
app.get('/api/image-prompt', (req, res) => {
    res.json({ 
        status: "Online", 
        message: "Backend PromptCraft sukses berjalan dan siap menerima request POST!" 
    });
});

app.get('/api/video-script', (req, res) => {
    res.json({ 
        status: "Online", 
        message: "Backend Video Script sukses berjalan!" 
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
