# معاذ AI - دليل النشر على Vercel

## 🎯 نظرة عامة

هذا الدليل يوضح كيفية نشر معاذ AI على منصة Vercel للحصول على خادم سحابي مجاني وسريع.

## 🚀 النشر السريع

### الطريقة الأولى: النشر التلقائي

```bash
# تشغيل سكريبت النشر التلقائي
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

### الطريقة الثانية: النشر اليدوي

1. **تثبيت Vercel CLI**
```bash
npm install -g vercel
```

2. **تسجيل الدخول**
```bash
vercel login
```

3. **بناء المشروع**
```bash
npm run build
```

4. **النشر**
```bash
vercel --prod
```

## ⚙️ إعداد متغيرات البيئة

في لوحة Vercel أو باستخدام CLI:

```bash
# إعداد متغيرات البيئة الأساسية
vercel env add NODE_ENV production
vercel env add PERMANENT_SERVICE true

# إعداد Telegram Bot (اختياري)
vercel env add TELEGRAM_BOT_TOKEN your_bot_token_here

# إعداد كلمة مرور الحماية
vercel env add ADMIN_PASSWORD your_secure_password
```

## 🗄️ إعداد قاعدة البيانات

### خيار 1: Neon PostgreSQL (مجاني)

1. **إنشاء حساب على Neon**
   - اذهب إلى: https://neon.tech
   - أنشئ مشروع جديد
   - انسخ DATABASE_URL

2. **إضافة DATABASE_URL**
```bash
vercel env add DATABASE_URL "postgresql://username:password@host:port/database"
```

### خيار 2: PlanetScale MySQL (مجاني)

1. **إنشاء حساب على PlanetScale**
   - اذهب إلى: https://planetscale.com
   - أنشئ قاعدة بيانات جديدة
   - انسخ DATABASE_URL

2. **إضافة DATABASE_URL**
```bash
vercel env add DATABASE_URL "mysql://username:password@host:port/database"
```

### خيار 3: بدون قاعدة بيانات (تخزين مؤقت)

المشروع سيعمل بتخزين في الذاكرة، لكن البيانات ستضيع عند إعادة التشغيل.

## 🌐 الميزات المتاحة

### Serverless Functions
- `/api/health` - فحص صحة الخدمة
- `/api/chat` - دردشة مع AI
- `/api/messages` - جلب الرسائل

### Static Assets
- الواجهة الأمامية محفوظة في `/dist/public`
- تحسين تلقائي للملفات الثابتة
- CDN عالمي لسرعة الوصول

## 🔧 التخصيص المتقدم

### إعداد دومين مخصص

1. **في لوحة Vercel**
   - اذهب إلى Settings → Domains
   - أضف الدومين الخاص بك

2. **تحديث DNS**
```
Type: CNAME
Name: www (or @)
Value: cname.vercel-dns.com
```

### إعداد SSL/HTTPS

Vercel يوفر شهادات SSL تلقائياً لجميع المشاريع.

### إعداد Redirects

في `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

## 📊 المراقبة والأداء

### Analytics

```bash
# عرض إحصائيات الاستخدام
vercel analytics
```

### Logs

```bash
# مراقبة اللوقات المباشرة
vercel logs --follow

# لوقات function معين
vercel logs --function=api/chat
```

### Performance

- **Edge Network**: توزيع عالمي تلقائي
- **Caching**: تخزين مؤقت ذكي للملفات الثابتة
- **Compression**: ضغط تلقائي للاستجابات

## 🔒 الأمان

### Headers الأمان

في `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Environment Variables

جميع متغيرات البيئة مشفرة ومحمية في Vercel.

## 🚨 استكشاف الأخطاء

### مشاكل شائعة

1. **Build Failure**
```bash
# فحص لوقات البناء
vercel logs --build

# إعادة النشر
vercel --prod --force
```

2. **Function Timeout**
```json
// في vercel.json
{
  "functions": {
    "api/*.ts": {
      "maxDuration": 30
    }
  }
}
```

3. **Memory Issues**
```json
// في vercel.json
{
  "functions": {
    "api/*.ts": {
      "memory": 512
    }
  }
}
```

### أدوات التشخيص

```bash
# فحص حالة المشروع
vercel inspect

# عرض معلومات المشروع
vercel ls

# فحص الأداء
vercel analytics
```

## 💰 التكلفة والحدود

### الخطة المجانية تشمل:
- 100GB Bandwidth
- 100GB-hrs Serverless Function Execution
- 1000 Serverless Function Invocations
- 10 Custom Domains

### ترقية الخطة:
للمشاريع الأكبر، يمكن ترقية الخطة من لوحة Vercel.

## 🔄 التحديثات التلقائية

### Git Integration

1. **ربط Repository**
```bash
vercel git connect
```

2. **Auto-Deploy**
كل push إلى main branch سينشر تلقائياً.

### Branch Previews

كل branch جديد يحصل على URL للمعاينة.

## 📞 الدعم

### الموارد المفيدة
- **Vercel Docs**: https://vercel.com/docs
- **Community**: https://github.com/vercel/vercel/discussions
- **Status**: https://vercel-status.com

### معلومات الدعم التقني

عند الحاجة للدعم، اجمع هذه المعلومات:
```bash
# معلومات المشروع
vercel inspect

# لوقات الأخطاء
vercel logs --since=1h

# معلومات البناء
vercel logs --build
```

## 🎉 الخلاصة

بعد اتباع هذا الدليل، ستحصل على:

✅ خادم معاذ AI على Vercel مع CDN عالمي
✅ SSL/HTTPS تلقائي
✅ Serverless Functions للـ API
✅ نشر تلقائي من Git
✅ مراقبة وإحصائيات مفصلة
✅ إمكانية استخدام دومين مخصص
✅ قاعدة بيانات سحابية (اختياري)

معاذ AI الآن متاح عالمياً على رابط vercel.app الخاص بك!