import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Users
    const user1 = await prisma.user.upsert({
        where: { email: 'alice@example.com' },
        update: {},
        create: {
            name: 'Alice Reader',
            email: 'alice@example.com',
            password: hashedPassword,
            phone: '9876543210',
            location: 'Mumbai',
            coins: 100,
            depositPaid: true,
            rating: 4.8,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'bob@example.com' },
        update: {},
        create: {
            name: 'Bob Bookworm',
            email: 'bob@example.com',
            password: hashedPassword,
            phone: '9876543211',
            location: 'Pune',
            coins: 50,
            depositPaid: true,
            rating: 4.5,
        },
    });

    const admin = await prisma.user.upsert({
        where: { email: 'admin@thebookbarter.com' },
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@thebookbarter.com',
            password: hashedPassword,
            phone: '0000000000',
            location: 'Headquarters',
            coins: 9999,
            depositPaid: true,
            rating: 5.0,
        },
    });

    // Books
    await prisma.book.create({
        data: {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'Fiction',
            mrp: 399,
            coinValue: 39,
            condition: 'Good',
            location: 'Mumbai',
            ownerId: user1.id,
            images: ['https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg']
        }
    });

    await prisma.book.create({
        data: {
            title: 'Atomic Habits',
            author: 'James Clear',
            genre: 'Self-Help',
            mrp: 599,
            coinValue: 59,
            condition: 'Like New',
            location: 'Pune',
            ownerId: user2.id,
            images: ['https://m.media-amazon.com/images/I/81bGKUa1e0L._AC_UF1000,1000_QL80_.jpg']
        }
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
