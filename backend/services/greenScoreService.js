import GreenScore from '../models/GreenScore.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Create a new GreenScore
export const createGreenScore = async (productId, carbonFootprint, packagingRecyclability, ethicalSourcing, overallScore) => {
    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID format.');
    }

    // Check if the product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
        throw new Error('Product not found.');
    }

    // Create a new GreenScore
    const newScore = new GreenScore({
        productId,
        carbonFootprint,
        packagingRecyclability,
        ethicalSourcing,
        overallScore,
    });

    try {
        return await newScore.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get all GreenScores
export const getAllGreenScores = async () => {
    return await GreenScore.find().populate('productId'); // Populate productId
};
