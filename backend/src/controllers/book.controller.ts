import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth.middleware';

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { genre, city, condition, maxCoins } = req.query;

        const filters: any = {
            status: 'Available',
        };

        if (genre) filters.genre = { contains: String(genre), mode: 'insensitive' };
        if (city) filters.location = { contains: String(city), mode: 'insensitive' };
        if (condition) filters.condition = String(condition);
        if (maxCoins) filters.coinValue = { lte: parseInt(String(maxCoins)) };

        const books = await prisma.book.findMany({
            where: filters,
            include: {
                owner: { select: { name: true, rating: true, location: true } },
            },
            orderBy: { createdAt: 'desc' }
        });

        res.status(200).json(books);
    } catch (error) {
        console.error('Get Books Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id as string;
        const book = await prisma.book.findUnique({
            where: { id },
            include: {
                owner: { select: { id: true, name: true, rating: true, location: true, createdAt: true } },
            },
        });

        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        res.status(200).json(book);
    } catch (error) {
        console.error('Get Book Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createBook = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const { title, author, genre, mrp, condition, images, location } = req.body;

        if (!title || !author || !genre || !mrp || !condition || !location) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const coinValue = Math.floor(mrp / 10);

        const book = await prisma.book.create({
            data: {
                title,
                author,
                genre,
                mrp: parseInt(mrp),
                coinValue,
                condition,
                images: images || [],
                location,
                ownerId: userId,
            },
        });

        res.status(201).json(book);
    } catch (error) {
        console.error('Create Book Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateBook = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const id = req.params.id as string;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const book = await prisma.book.findUnique({ where: { id } });
        if (!book || book.ownerId !== userId) {
            res.status(403).json({ error: 'Forbidden or Not Found' });
            return;
        }

        const { title, author, genre, mrp, condition, images, location, status } = req.body;

        const dataToUpdate: any = {};
        if (title) dataToUpdate.title = title;
        if (author) dataToUpdate.author = author;
        if (genre) dataToUpdate.genre = genre;
        if (condition) dataToUpdate.condition = condition;
        if (images) dataToUpdate.images = images;
        if (location) dataToUpdate.location = location;
        if (status) dataToUpdate.status = status;

        if (mrp) {
            dataToUpdate.mrp = parseInt(mrp);
            dataToUpdate.coinValue = Math.floor(mrp / 10);
        }

        const updatedBook = await prisma.book.update({
            where: { id },
            data: dataToUpdate,
        });

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Update Book Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteBook = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const id = req.params.id as string;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const book = await prisma.book.findUnique({ where: { id } });
        if (!book || book.ownerId !== userId) {
            res.status(403).json({ error: 'Forbidden or Not Found' });
            return;
        }

        await prisma.book.delete({ where: { id } });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
