import app from './app';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 5000;
export const prisma = new PrismaClient();

async function startServer() {
    try {
        await prisma.$connect();
        console.log('Connected to PostgreSQL Database');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
