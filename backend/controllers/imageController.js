import { generateImage } from '../services/imageService.js';

export const createImageFromPrompt = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required.' });
    }

    try {
        const imageUrl = await generateImage(prompt);
        res.status(201).json({ url: imageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate image.' });
    }
};