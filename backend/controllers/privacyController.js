import * as privacyService from '../services/privacyService.js';

// Get privacy settings for a user
export const getPrivacySettings = async (req, res) => {
    const { userId } = req.params;

    try {
        const settings = await privacyService.getPrivacySettings(userId);
        res.json(settings);
    } catch (error) {
        res.status(error.message === 'Privacy settings not found' ? 404 : 400).json({ message: error.message });
    }
};

// Create or update privacy settings for a user
export const updatePrivacySettings = async (req, res) => {
    const { userId } = req.params;
    const { dataSharing, personalizedAds, dataRetentionPeriod } = req.body;

    try {
        const settings = await privacyService.updatePrivacySettings(userId, dataSharing, personalizedAds, dataRetentionPeriod);
        res.json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete privacy settings for a user
export const deletePrivacySettings = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedSettings = await privacyService.deletePrivacySettings(userId);
        res.json({ message: 'Privacy settings deleted successfully' });
    } catch (error) {
        res.status(error.message === 'Privacy settings not found' ? 404 : 400).json({ message: error.message });
    }
};
