import { Router } from 'express';
const router = Router();
import { getRewards, addGreenPoints, redeemRewards } from '../controllers/rewardsController.js';

// Define routes
router.get('/:userId', getRewards);
router.put('/:userId/add', addGreenPoints);
router.post('/:userId/redeem', redeemRewards);

export default router;
