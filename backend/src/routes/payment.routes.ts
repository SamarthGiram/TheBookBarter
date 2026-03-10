import { Router } from 'express';
import { createDepositOrder, verifyPayment, dummyPayment } from '../controllers/payment.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/create-order', authenticateToken, createDepositOrder);
router.post('/verify', authenticateToken, verifyPayment);
router.post('/dummy', authenticateToken, dummyPayment);

export default router;
