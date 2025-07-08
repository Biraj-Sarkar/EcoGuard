import { Router } from 'express';
import { createGreenScore, getAllGreenScores  } from '../controllers/greenScoreController.js';

const router = Router();

// Create a new GreenScore
router.post('/', createGreenScore);

// Get all GreenScores
router.get('/', getAllGreenScores);

export default router;
