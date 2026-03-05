import { Router } from 'express';
import { getMyProfile, getWalletTransactions, getUserById } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/me', authenticateToken, getMyProfile);
router.get('/wallet', authenticateToken, getWalletTransactions);
router.get('/:id', getUserById);

export default router;
