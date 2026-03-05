// Netlify serverless function wrapper for the Express app.
// Requires: npm install serverless-http
// Dev dep : npm install -D @types/serverless-http  (optional)
import serverless from 'serverless-http';
import app from '../../src/app';

export const handler = serverless(app);
