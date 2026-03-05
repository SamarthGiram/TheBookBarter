// Serverless entry point for Vercel.
// @vercel/node accepts a plain Express app as the default export.
// Do NOT call app.listen() here – Vercel manages the server lifecycle.
import app from '../src/app';

export default app;
