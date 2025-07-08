import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Create a new product
export const createProduct = async (name, barcode) => {
    const newProduct = new Product({ name, barcode });

    try {
        return await newProduct.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get all active products
export const getAllProducts = async () => {
    return await Product.find({ isActive: true }); // Only fetch active products
};

// Delete a product by ID (soft delete)
export const deleteProductById = async (id) => {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid product ID format.');
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { isActive: false }, // Mark the product as inactive instead of deleting
        { new: true }
    );

    if (!updatedProduct) {
        throw new Error('Product not found.');
    }

    return updatedProduct;
};
