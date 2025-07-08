import { Schema, model } from 'mongoose';

const greenScoreSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the product
    carbonFootprint: { type: Number, required: true }, // Carbon footprint value
    packagingRecyclability: { type: Number, required: true }, // Recyclability score (0-100)
    ethicalSourcing: { type: Number, required: true }, // Ethical sourcing score (0-100)
    overallScore: { type: Number, required: true }, // Overall green score (0-100)
});

export default model('GreenScore', greenScoreSchema);
