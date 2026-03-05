import { Router } from 'express';
import { getAllUsers, getAllBooks, banUser, adminDeleteBook, getAllTransactions } from '../controllers/admin.controller';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken, isAdmin);

router.get('/users', getAllUsers);
router.get('/books', getAllBooks);
router.delete('/users/:id/ban', banUser);
router.delete('/books/:id', adminDeleteBook);
router.get('/transactions', getAllTransactions);

export default router;
