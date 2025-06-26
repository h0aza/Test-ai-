import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const memUsage = process.memoryUsage();
    const uptime = process.uptime();

    const systemInfo = {
      uptime: uptime,
      memoryUsage: {
        heapUsed: memUsage.heapUsed,
        heapTotal: memUsage.heapTotal,
        rss: memUsage.rss,
        external: memUsage.external
      },
      processId: process.pid,
      nodeVersion: process.version,
      platform: process.platform,
      environment: process.env.NODE_ENV || 'development',
      lastActivity: new Date().toISOString()
    };

    res.json({
      success: true,
      systemInfo: systemInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to get system logs:', error);
    res.status(500).json({ error: 'Failed to get system information' });
  }
}