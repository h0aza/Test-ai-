# نشر معاذ AI على Vercel - الخطوات النهائية

## الملفات الجاهزة للنشر

✅ `vercel.json` - إعداد Vercel محسن
✅ `api/` مجلد - وظائف serverless جاهزة
✅ `dist/public/` - الواجهة الأمامية مبنية
✅ `.vercelignore` - استبعاد الملفات غير المطلوبة

## خطوات النشر السريع

### الطريقة الأولى: النشر عبر Vercel Dashboard

1. **اذهب إلى**: https://vercel.com/new
2. **اختر**: "Import Git Repository" أو "Deploy from ZIP"
3. **ارفع المشروع** أو اربطه بـ Git
4. **الإعدادات**:
   - Framework Preset: Other
   - Build Command: `npm run build` (سيستخدم vite build)
   - Output Directory: `dist/public`
   - Install Command: `npm install`

### الطريقة الثانية: النشر عبر CLI

```bash
# تسجيل الدخول (مطلوب مرة واحدة)
vercel login

# النشر المباشر
vercel --prod
```

## متغيرات البيئة المطلوبة

في إعدادات Vercel، أضف:

```
NODE_ENV=production
PERMANENT_SERVICE=true
TELEGRAM_BOT_TOKEN=7046260843:AAHbjuQUa5ONKdcZxaX-CxJyYvBT5Jtar4Y
ADMIN_PASSWORD=moaaz-ai-2025
```

## الـ API Endpoints المتاحة

- `/api/health` - فحص صحة النظام
- `/api/chat` - دردشة مع AI
- `/api/messages` - جلب الرسائل
- `/api/system-status` - حالة النظام المفصلة

## التحقق من النشر

بعد النشر، تحقق من:
- `https://your-project.vercel.app/` - الموقع الرئيسي
- `https://your-project.vercel.app/api/health` - فحص الصحة

## ملاحظات مهمة

- جميع الملفات جاهزة للنشر
- الواجهة مبنية ومحسنة للإنتاج
- API functions محولة لـ Vercel serverless
- أمان محسن مع headers الحماية
- دعم RTL للعربية مفعل