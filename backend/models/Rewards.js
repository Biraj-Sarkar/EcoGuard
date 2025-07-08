import { Schema, model } from 'mongoose';

const rewardsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User ', required: true }, // Reference to the user
    greenPoints: { type: Number, default: 0 }, // Total Green Points earned
    redemptionHistory: [
        {
            date: { type: Date, default: Date.now }, // Date of redemption
            pointsUsed: { type: Number, required: true }, // Points used for redemption
            reward: { type: String, required: true }, // Description of the reward
        },
    ],
});

export default model('Rewards', rewardsSchema);
