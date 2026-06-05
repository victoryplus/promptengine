const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors()); // Mengizinkan GitHub Pages mengakses backend ini
app.use(express.json());

// Mengambil API Key dari Environment Variable (Aman)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// JALUR 1: OPTIMASI PROMPT GAMBAR (1 KREDIT)
app.post('/api/image-prompt', async (req, res) => {
    const { userPrompt } = req.body;
    if (!userPrompt) return res.status(400).json({ error: 'Prompt kosong' });

    try {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const systemInstruction = `Anda adalah Prompt Engineer profesional untuk Midjourney dan DALL-E 3.
Ubah prompt sederhana dari user menjadi prompt gambar yang sangat deskriptif, sinematik, fotorealistik, lengkap dengan detail pencahayaan (lighting), jenis lensa, dan estetika visual.
JANGAN memberikan teks penjelasan lain, CUKUP berikan teks prompt hasil optimasi Anda dalam format teks siap salin.`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            generationConfig: { systemInstruction, temperature: 0.7 }
        });

        res.json({ result: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: 'Gagal memproses prompt gambar' });
    }
});

// JALUR 2: SKRIP VIDEO SINEMATIK (5 KREDIT)
app.post('/api/video-script', async (req, res) => {
    const { userPrompt } = req.body;
    if (!userPrompt) return res.status(400).json({ error: 'Konsep kosong' });

    try {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const systemInstruction = `Anda adalah Sutradara Video Pendek dan Prompt Engineer handal.
Tugas Anda adalah mengubah ide cerita user menjadi skrip video pendek (TikTok/Reels) yang matang berbasis teknik sinematik Nano Banana.
Output HARUS dibuat terstruktur per SCENE (maksimal 3-4 scene) dan wajib mencantumkan:
1. Deskripsi Visual/Adegan
2. Camera Angle & Camera Movement (misal: Extreme Close-Up, Panning, Slow Motion)
3. Prompt Teks siap pakai yang bisa dicopy user untuk dimasukkan ke AI Video Generator (Sora/Runway/Luma).
Gunakan bahasa Indonesia yang santai namun profesional untuk instruksinya.`;

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            generationConfig: { systemInstruction, temperature: 0.6 }
        });

        res.json({ result: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: 'Gagal memproses skrip video' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server aman berjalan di port ${PORT}`));
