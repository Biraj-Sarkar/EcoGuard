import * as greenScoreService from '../services/greenScoreService.js';

// Create a new GreenScore
export const createGreenScore = async (req, res) => {
    const { productId, carbonFootprint, packagingRecyclability, ethicalSourcing, overallScore } = req.body;

    try {
        const savedScore = await greenScoreService.createGreenScore(productId, carbonFootprint, packagingRecyclability, ethicalSourcing, overallScore);
        return res.status(201).json(savedScore);
    } catch (error) {
        console.error('Error saving green score:', error);
        return res.status(400).json({ message: error.message });
    }
};

// Get all GreenScores
export const getAllGreenScores = async (req, res) => {
    try {
        const scores = await greenScoreService.getAllGreenScores();
        res.json(scores);
    } catch (error) {
        console.error('Error fetching green scores:', error);
        res.status(500).json({ message: error.message });
    }
};
