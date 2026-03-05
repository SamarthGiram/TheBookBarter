import { Router } from 'express';
import { requestExchange, updateExchangeStatus, getMyExchanges } from '../controllers/exchange.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/request', authenticateToken, requestExchange);
router.put('/:id/status', authenticateToken, updateExchangeStatus);
router.get('/me', authenticateToken, getMyExchanges);

export default router;
