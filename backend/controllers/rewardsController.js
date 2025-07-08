import * as rewardsService from '../services/rewardsService.js';
import blockchainService from '../services/blockchainService.js'; // Import blockchainService

// Get rewards for a user
export const getRewards = async (req, res) => {
    const { userId } = req.params;

    try {
        const rewards = await rewardsService.getRewards(userId);
        res.json(rewards);
    } catch (error) {
        res.status(error.message === 'Rewards not found' ? 404 : 400).json({ message: error.message });
    }
};

// Add Green Points to a user
export const addGreenPoints = async (req, res) => {
    const { userId } = req.params;
    const { points } = req.body;

    try {
        const rewards = await rewardsService.addGreenPoints(userId, points);
        res.json(rewards);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Redeem rewards for a user
export const redeemRewards = async (req, res) => {
    const { userId } = req.params;
    const { pointsUsed, reward } = req.body;

    try {
        const rewards = await rewardsService.redeemRewards(userId, pointsUsed, reward);
        res.json(rewards);
    } catch (error) {
        res.status(error.message === 'Insufficient points for redemption' ? 400 : 500).json({ message: error.message });
    }
};

// New method to log CO₂ reduction
export const logEmissionReduction = async (req, res) => {
    const { userId, co2Amount, activityType } = req.body;
    try {
        const txHash = await blockchainService.logCO2Reduction(userId, co2Amount, activityType);
        res.status(200).json({ txHash });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// New method to get total CO₂ saved by user
export const getUserCO2Saved = async (req, res) => {
    const { userId } = req.params;
    try {
        const totalSaved = await blockchainService.getUserCO2Saved(userId);
        res.json({ totalSaved });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
