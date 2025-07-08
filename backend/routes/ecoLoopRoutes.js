import { Router } from 'express';
const router = Router();
import { getReturnOptions, createReturnOption, updateReturnOption, deleteReturnOption } from '../controllers/ecoLoopController.js';

// Define routes
router.get('/options', getReturnOptions);
router.post('/options', createReturnOption);
router.put('/options/:id', updateReturnOption);
router.delete('/options/:id', deleteReturnOption);

export default router;
