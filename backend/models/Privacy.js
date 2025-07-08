import { Schema, model } from 'mongoose';

const privacySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User ', required: true }, // Reference to the user
    dataSharing: { type: Boolean, default: false }, // Whether the user allows data sharing
    personalizedAds: { type: Boolean, default: false }, // Whether the user allows personalized ads
    dataRetentionPeriod: { type: Number, default: 30 }, // Days for data retention
});

export default model('Privacy', privacySchema);
