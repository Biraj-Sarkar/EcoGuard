import EcoLoop from '../models/EcoLoop.js';
import mongoose from 'mongoose';

// Get all return options
export const getReturnOptions = async () => {
    return await EcoLoop.find(); // Fetch return options from the database
};

// Create a new return option
export const createReturnOption = async (type, description, impact) => {
    const newOption = new EcoLoop({
        type,
        description,
        impact,
    });

    try {
        return await newOption.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update an existing return option
export const updateReturnOption = async (id, type, description, impact) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid return option ID format.');
    }

    const updatedOption = await EcoLoop.findByIdAndUpdate(
        id,
        { type, description, impact },
        { new: true }
    );

    if (!updatedOption) {
        throw new Error('Return option not found');
    }

    return updatedOption;
};

// Delete a return option
export const deleteReturnOption = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid return option ID format.');
    }

    const deletedOption = await EcoLoop.findByIdAndDelete(id);
    if (!deletedOption) {
        throw new Error('Return option not found');
    }

    return deletedOption;
};
