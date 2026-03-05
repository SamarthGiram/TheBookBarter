import { Router } from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/book.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', authenticateToken, createBook);
router.put('/:id', authenticateToken, updateBook);
router.delete('/:id', authenticateToken, deleteBook);

export default router;
