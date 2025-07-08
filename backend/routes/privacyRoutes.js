import { Router } from 'express';
const router = Router();
import { getPrivacySettings, updatePrivacySettings, deletePrivacySettings } from '../controllers/privacyController.js';

// Define routes
router.get('/:userId', getPrivacySettings);
router.put('/:userId', updatePrivacySettings);
router.delete('/:userId', deletePrivacySettings);

export default router;
