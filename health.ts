import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const healthData = {
    status: 'healthy',
    service: 'معاذ AI - Vercel',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    platform: 'vercel',
    version: '2.0'
  };

  res.status(200).json(healthData);
}