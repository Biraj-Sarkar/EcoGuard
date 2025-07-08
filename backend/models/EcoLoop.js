import { Schema, model } from 'mongoose';

const ecoLoopSchema = new Schema({
    type: { type: String, required: true }, // e.g., "Refurbish & Resell", "Donate Locally", "Recycle Responsibly"
    description: { type: String, required: true }, // Description of the return option
    impact: { type: String, required: true }, // Description of the environmental impact
});

export default model('EcoLoop', ecoLoopSchema);
