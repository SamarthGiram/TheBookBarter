import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                location: true,
                coins: true,
                depositPaid: true,
                rating: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Admin Get Users Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllBooks = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const books = await prisma.book.findMany({
            include: { owner: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(books);
    } catch (error) {
        console.error('Admin Get Books Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const banUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Since we don't have a banned field, we can either soft delete or just delete
        // We'll delete for simplicity as per MVP Admin capabilities to "Ban users"
        await prisma.user.delete({ where: { id } });

        res.status(200).json({ message: 'User banned (deleted) successfully' });
    } catch (error) {
        console.error('Admin Ban User Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const adminDeleteBook = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;

        const book = await prisma.book.findUnique({ where: { id } });
        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        await prisma.book.delete({ where: { id } });
        res.status(200).json({ message: 'Book deleted successfully by admin' });
    } catch (error) {
        console.error('Admin Delete Book Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const transactions = await prisma.transaction.findMany({
            include: { user: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(transactions);
    } catch (err) {
        console.error('Admin Get Transactions Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
