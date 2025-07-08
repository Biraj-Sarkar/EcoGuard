import * as ecoLoopService from '../services/ecoLoopService.js';

// Get all return options
export const getReturnOptions = async (req, res) => {
    try {
        const options = await ecoLoopService.getReturnOptions();
        res.json(options);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new return option
export const createReturnOption = async (req, res) => {
    const { type, description, impact } = req.body;

    try {
        const savedOption = await ecoLoopService.createReturnOption(type, description, impact);
        res.status(201).json(savedOption);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing return option
export const updateReturnOption = async (req, res) => {
    const { id } = req.params;
    const { type, description, impact } = req.body;

    try {
        const updatedOption = await ecoLoopService.updateReturnOption(id, type, description, impact);
        res.json(updatedOption);
    } catch (error) {
        res.status(error.message === 'Return option not found' ? 404 : 400).json({ message: error.message });
    }
};

// Delete a return option
export const deleteReturnOption = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOption = await ecoLoopService.deleteReturnOption(id);
        res.json({ message: 'Return option deleted successfully', deletedOption });
    } catch (error) {
        res.status(error.message === 'Return option not found' ? 404 : 400).json({ message: error.message });
    }
};
