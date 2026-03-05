import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import bookRoutes from './routes/book.routes';
import exchangeRoutes from './routes/exchange.routes';
import paymentRoutes from './routes/payment.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy: origin ${origin} not allowed`));
        }
    },
    credentials: true,
}));
app.use(express.json());

// Main entry point for routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/exchanges', exchangeRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Main entry point for routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/exchanges', exchangeRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'TheBookBarter API is running' });
});

export default app;
