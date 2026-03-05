import { Router } from 'express';
import { createDepositOrder, verifyPayment } from '../controllers/payment.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/create-order', authenticateToken, createDepositOrder);
router.post('/verify', authenticateToken, verifyPayment);

export default router;
