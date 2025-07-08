import Rewards from '../models/Rewards.js';
import mongoose from 'mongoose';

// Get rewards for a user
export const getRewards = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID format.');
    }

    const rewards = await Rewards.findOne({ userId }).populate('userId');
    if (!rewards) {
        throw new Error('Rewards not found');
    }

    return rewards;
};

// Add Green Points to a user
export const addGreenPoints = async (userId, points) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID format.');
    }

    const rewards = await Rewards.findOneAndUpdate(
        { userId },
        { $inc: { greenPoints: points } },
        { new: true, upsert: true } // Create if not exists
    );

    return rewards;
};

// Redeem rewards for a user
export const redeemRewards = async (userId, pointsUsed, reward) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID format.');
    }

    const rewards = await Rewards.findOne({ userId });
    if (!rewards || rewards.greenPoints < pointsUsed) {
        throw new Error('Insufficient points for redemption');
    }

    // Update points and add to redemption history
    rewards.greenPoints -= pointsUsed;
    rewards.redemptionHistory.push({ pointsUsed, reward });
    await rewards.save();

    return rewards;
};
