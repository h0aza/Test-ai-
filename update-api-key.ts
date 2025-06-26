import { VercelRequest, VercelResponse } from '@vercel/node';
import { getTelegramBot } from '../../server/telegram-bot';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { apiKey } = req.body;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    const bot = getTelegramBot();
    if (!bot) {
      return res.status(503).json({ error: 'Telegram bot not available' });
    }

    // Update API key through system alert
    await bot.sendSystemAlert(`🔑 API Key updated from website\nNew key: ${apiKey.substring(0, 8)}...`);
    
    res.json({ 
      success: true, 
      message: 'API key update notification sent',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to update API key via Telegram:', error);
    res.status(500).json({ error: 'Failed to send API key update' });
  }
}