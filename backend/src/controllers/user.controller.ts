import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth.middleware';

export const getMyProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
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
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getWalletTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { coins: true },
        });

        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                exchange: {
                    include: {
                        book: { select: { title: true } },
                    },
                },
            },
        });

        res.status(200).json({
            balance: user?.coins || 0,
            transactions,
        });
    } catch (error) {
        console.error('Wallet Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                location: true,
                rating: true,
                booksOwned: {
                    where: { status: 'Available' },
                    include: { book: true }
                }
            },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Get User Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
