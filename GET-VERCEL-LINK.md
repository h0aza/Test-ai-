# الحصول على رابط معاذ AI على Vercel

## الطريقة السريعة - رفع مباشر

### 1. اذهب إلى Vercel
افتح: https://vercel.com/new

### 2. إنشاء حساب/تسجيل دخول
- اختر GitHub, Google, أو Email

### 3. رفع المشروع
- اضغط "Browse" واختر مجلد المشروع
- أو اسحب وأفلت مجلد المشروع

### 4. إعدادات المشروع
- اسم المشروع: `moaaz-ai`
- Framework: `Other`
- Build Command: `npm run build` (تلقائي)
- Output Directory: `dist/public`

### 5. متغيرات البيئة
أضف هذه المتغيرات في قسم Environment Variables:

```
NODE_ENV = production
PERMANENT_SERVICE = true
TELEGRAM_BOT_TOKEN = 7046260843:AAHbjuQUa5ONKdcZxaX-CxJyYvBT5Jtar4Y
ADMIN_PASSWORD = moaaz-ai-2025
```

### 6. النشر
اضغط "Deploy" وانتظر 2-3 دقائق

## الرابط النهائي

بعد النشر ستحصل على رابط مثل:
**https://moaaz-ai-[random].vercel.app**

## الصفحات المتاحة
- `/` - الدردشة الرئيسية
- `/admin` - لوحة الإدارة والتحكم في البوت
- `/api/health` - فحص الصحة

## إعداد رابط مخصص (اختياري)

1. في لوحة Vercel اذهب إلى Settings → Domains
2. أضف الدومين (مثل: moaaz-ai.com)
3. حدث DNS:
   ```
   A Record: @ → 76.76.19.19
   CNAME: www → cname.vercel-dns.com
   ```

المشروع جاهز تماماً للنشر!