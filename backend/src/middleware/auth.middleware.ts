import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Access token is missing' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Invalid token' });
            return;
        }
        req.user = user as { id: string; email: string };
        next();
    });
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user && req.user.email === 'admin@thebookbarter.com') {
        next();
    } else {
        res.status(403).json({ error: 'Admin access required' });
    }
};
