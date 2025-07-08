import * as productService from '../services/productService.js';

// Create a new product
export const createProduct = async (req, res) => {
    const { name, barcode } = req.body;

    try {
        const savedProduct = await productService.createProduct(name, barcode);
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(400).json({ message: error.message });
    }
};

// Get all active products
export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a product by ID (soft delete)
export const deleteProductById = async (req, res) => {
    const { id } = req.params; // Get the product ID from the request parameters

    try {
        const updatedProduct = await productService.deleteProductById(id);
        res.json({ message: 'Product marked as inactive successfully', updatedProduct });
    } catch (error) {
        res.status(error.message === 'Product not found.' ? 404 : 400).json({ message: error.message });
    }
};
