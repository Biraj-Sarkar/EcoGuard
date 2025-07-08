import { Router } from 'express';
import { createProduct, getAllProducts, deleteProductById } from '../controllers/productController.js';

const router = Router();

// Create a new product
router.post('/', createProduct);

// Get all active products
router.get('/', getAllProducts);

// Delete a product by ID (soft delete)
router.delete('/:id', deleteProductById);

export default router;
