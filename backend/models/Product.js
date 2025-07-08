import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true },
    barcode: { type: String, required: true, unique: true }, // Unique barcode for scanning
    isActive: { type: Boolean, default: true } // New field to indicate active status
    // Add other fields as necessary
});

export default model('Product', productSchema);
