import Privacy from '../models/Privacy.js';
import mongoose from 'mongoose';

// Get privacy settings for a user
export const getPrivacySettings = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID format.');
    }

    const settings = await Privacy.findOne({ userId });
    if (!settings) {
        throw new Error('Privacy settings not found');
    }

    return settings;
};

// Create or update privacy settings for a user
export const updatePrivacySettings = async (userId, dataSharing, personalizedAds, dataRetentionPeriod) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID format.');
    }

    const settings = await Privacy.findOneAndUpdate(
        { userId },
        { dataSharing, personalizedAds, dataRetentionPeriod },
        { new: true, upsert: true } // Create if not exists
    );

    return settings;
};

// Delete privacy settings for a user
export const deletePrivacySettings = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID format.');
    }

    const deletedSettings = await Privacy.findOneAndDelete({ userId });
    if (!deletedSettings) {
        throw new Error('Privacy settings not found');
    }

    return deletedSettings;
};
