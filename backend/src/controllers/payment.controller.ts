import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { prisma } from '../index';
import { AuthRequest } from '../middleware/auth.middleware';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'test_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret',
});

export const createDepositOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user?.depositPaid) {
            res.status(400).json({ error: 'Deposit already paid' });
            return;
        }

        const options = {
            amount: 500 * 100, // amount in smallest currency unit (paise)
            currency: 'INR',
            receipt: `receipt_order_${userId}`,
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error('Razorpay Order Error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const secret = process.env.RAZORPAY_KEY_SECRET || 'test_secret';

        // Verify signature
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        if (generated_signature !== razorpay_signature) {
            res.status(400).json({ error: 'Invalid payment signature' });
            return;
        }

        // Update user deposit status
        await prisma.user.update({
            where: { id: userId },
            data: { depositPaid: true },
        });

        res.status(200).json({ message: 'Payment verified successfully and deposit updated.' });
    } catch (error) {
        console.error('Payment Verification Error:', error);
        res.status(500).json({ error: 'Payment verification failed' });
    }
};

export const dummyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user?.depositPaid) {
            res.status(400).json({ error: 'Deposit already paid' });
            return;
        }

        // Dummy simulate
        await prisma.user.update({
            where: { id: userId },
            data: { depositPaid: true },
        });

        res.status(200).json({ message: 'Dummy payment verified successfully and deposit updated.' });
    } catch (error) {
        console.error('Dummy Payment Error:', error);
        res.status(500).json({ error: 'Dummy payment failed' });
    }
};
