import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const messages = await storage.getMessages(50);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Messages API error:', error);
    res.status(500).json({ error: 'حدث خطأ في جلب الرسائل' });
  }
}