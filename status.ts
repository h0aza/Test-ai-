import { VercelRequest, VercelResponse } from '@vercel/node';
import { getTelegramBot } from '../../server/telegram-bot';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const bot = getTelegramBot();
    if (!bot) {
      return res.status(503).json({ 
        isActive: false,
        adminCount: 0,
        lastActivity: 'Bot not available',
        error: 'Telegram bot not initialized'
      });
    }

    const status = bot.getStatus();
    
    res.json({
      isActive: status.isActive,
      adminCount: status.adminCount,
      lastActivity: status.lastActivity,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to get bot status:', error);
    res.status(500).json({ 
      isActive: false,
      adminCount: 0,
      lastActivity: 'Error getting status',
      error: 'Failed to retrieve bot status'
    });
  }
}