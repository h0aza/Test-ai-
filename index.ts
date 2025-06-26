import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';
import { log } from '../server/vite';

// إنشاء تطبيق Express
const app = express();

// إعداد middleware أساسي
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// إعداد CORS للنشر على Vercel
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// تسجيل الطرق
let serverInitialized = false;

async function initializeServer() {
  if (!serverInitialized) {
    try {
      await registerRoutes(app);
      serverInitialized = true;
      log('معاذ AI initialized for Vercel deployment', 'vercel');
    } catch (error) {
      log(`Error initializing server: ${error}`, 'error');
    }
  }
}

// دالة التعامل مع طلبات Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // تهيئة الخادم إذا لم يكن مهيأ
  await initializeServer();
  
  // تمرير الطلب لـ Express
  return new Promise((resolve) => {
    app(req as any, res as any, () => {
      resolve(undefined);
    });
  });
}