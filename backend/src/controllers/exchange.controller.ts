import { Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth.middleware';

export const requestExchange = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const requesterId = req.user?.id;
        const { bookId } = req.body;

        if (!requesterId || !bookId) {
            res.status(400).json({ error: 'Book ID is required' });
            return;
        }

        const book = await prisma.book.findUnique({ where: { id: bookId } });

        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        if (book.status !== 'Available') {
            res.status(400).json({ error: 'Book is not available for exchange' });
            return;
        }

        if (book.ownerId === requesterId) {
            res.status(400).json({ error: 'Cannot request your own book' });
            return;
        }

        const requester = await prisma.user.findUnique({ where: { id: requesterId } });
        if (!requester || requester.coins < book.coinValue) {
            res.status(400).json({ error: 'Insufficient Magic Coins to request this book' });
            return;
        }

        // Create exchange request
        const exchange = await prisma.exchange.create({
            data: {
                bookId,
                ownerId: book.ownerId,
                requesterId,
                coinValue: book.coinValue,
                status: 'Requested',
            },
        });

        // Update book status
        await prisma.book.update({
            where: { id: bookId },
            data: { status: 'Requested' },
        });

        res.status(201).json({ message: 'Book requested successfully', exchange });
    } catch (error) {
        console.error('Exchange Request Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateExchangeStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const id = req.params.id as string;
        const { status } = req.body;

        if (!userId || !status) {
            res.status(400).json({ error: 'Status is required' });
            return;
        }

        const exchange = await prisma.exchange.findUnique({ where: { id } });
        if (!exchange) {
            res.status(404).json({ error: 'Exchange not found' });
            return;
        }

        const isOwner = exchange.ownerId === userId;
        const isRequester = exchange.requesterId === userId;

        if (!isOwner && !isRequester) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }

        // Logic for transferring coins if Completed
        if (status === 'Completed' && exchange.status !== 'Completed') {
            const requester = await prisma.user.findUnique({ where: { id: exchange.requesterId } });
            const owner = await prisma.user.findUnique({ where: { id: exchange.ownerId } });

            if (!requester || !owner) {
                res.status(500).json({ error: 'Users not found' });
                return;
            }

            if (requester.coins < exchange.coinValue) {
                res.status(400).json({ error: 'Requester has insufficient coins. Transaction failed.' });
                return;
            }

            // Transfer Coins (Wrapped in transaction)
            await prisma.$transaction(async (tx: any) => {
                // Decrease spender
                await tx.user.update({
                    where: { id: exchange.requesterId },
                    data: { coins: { decrement: exchange.coinValue } },
                });

                // Increase earner
                await tx.user.update({
                    where: { id: exchange.ownerId },
                    data: { coins: { increment: exchange.coinValue } },
                });

                // Log Transactions
                await tx.transaction.create({
                    data: { userId: exchange.requesterId, coins: exchange.coinValue, type: 'Spent', exchangeId: exchange.id },
                });

                await tx.transaction.create({
                    data: { userId: exchange.ownerId, coins: exchange.coinValue, type: 'Earned', exchangeId: exchange.id },
                });

                // Update Exchange and Book Status
                await tx.exchange.update({
                    where: { id: exchange.id },
                    data: { status: 'Completed' },
                });

                await tx.book.update({
                    where: { id: exchange.bookId },
                    data: { status: 'Exchanged' },
                });
            });

            res.status(200).json({ message: 'Exchange completed and coins transferred successfully' });
            return;
        }

        // Make sure we only allow certain transitions
        // Only owner can approve/reject/mark shipped
        if (['Approved', 'Rejected', 'Shipped'].includes(status) && !isOwner) {
            res.status(403).json({ error: 'Only owner can change to this status' });
            return;
        }
        // Only requester can mark received
        if (status === 'Received' && !isRequester) {
            res.status(403).json({ error: 'Only requester can mark as received' });
            return;
        }

        await prisma.exchange.update({
            where: { id },
            data: { status },
        });

        if (status === 'Rejected') {
            await prisma.book.update({
                where: { id: exchange.bookId },
                data: { status: 'Available' },
            });
        }

        res.status(200).json({ message: `Exchange status updated to ${status}` });
    } catch (error) {
        console.error('Update Exchange Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMyExchanges = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const requestsMade = await prisma.exchange.findMany({
            where: { requesterId: userId },
            include: { book: true, owner: { select: { name: true, location: true } } },
            orderBy: { createdAt: 'desc' },
        });

        const requestsReceived = await prisma.exchange.findMany({
            where: { ownerId: userId },
            include: { book: true, requester: { select: { name: true, location: true } } },
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json({ requestsMade, requestsReceived });
    } catch (error) {
        console.error('Get Exchanges Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
