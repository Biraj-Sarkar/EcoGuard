import * as rewardsService from '../services/rewardsService.js';

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
