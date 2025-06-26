import { MoreVertical, Info, HelpCircle, Shield, Copyright, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MoreOptionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-right">المزيد</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <a href="/admin" className="flex items-center">
            <Settings className="ml-2 h-4 w-4" />
            <span>لوحة الإدارة</span>
          </a>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Info className="ml-2 h-4 w-4" />
              <span>حول معاذ AI</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-right">حول معاذ AI</DialogTitle>
              <DialogDescription className="text-right">
                معلومات حول المساعد الذكي
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">م</span>
                </div>
                <h3 className="text-lg font-semibold">معاذ AI</h3>
                <p className="text-sm text-gray-600">مساعد ذكي متقدم</p>
              </div>
              <div className="space-y-2 text-sm text-right">
                <p><strong>الإصدار:</strong> 1.0.0</p>
                <p><strong>التقنية:</strong> مدعوم بالذكاء الاصطناعي</p>
                <p><strong>اللغة:</strong> العربية</p>
                <p><strong>الحالة:</strong> متصل ونشط</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <HelpCircle className="ml-2 h-4 w-4" />
              <span>المساعدة</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-right">كيفية استخدام معاذ AI</DialogTitle>
              <DialogDescription className="text-right">
                دليل سريع للاستفادة القصوى من المساعد الذكي
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 text-right">
              <div>
                <h4 className="font-semibold mb-2">الأوامر الأساسية:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• اكتب سؤالك مباشرة في حقل النص</li>
                  <li>• اضغط Enter أو زر الإرسال</li>
                  <li>• جرب الأسئلة المقترحة للبدء</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">نصائح للاستخدام:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• كن واضحاً في أسئلتك</li>
                  <li>• يمكنك السؤال عن أي موضوع</li>
                  <li>• معاذ AI يفهم العربية بطلاقة</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Shield className="ml-2 h-4 w-4" />
              <span>سياسة الخصوصية</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-right">سياسة الخصوصية</DialogTitle>
              <DialogDescription className="text-right">
                كيف نحمي بياناتك وخصوصيتك
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 text-right text-sm">
              <div>
                <h4 className="font-semibold mb-2">التزامنا بالخصوصية:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• لا نحتفظ برسائلك الشخصية</li>
                  <li>• لا نشارك معلوماتك مع أطراف ثالثة</li>
                  <li>• جميع المحادثات محمية ومشفرة</li>
                  <li>• يمكنك حذف بياناتك في أي وقت</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">البيانات المستخدمة:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• نستخدم الرسائل فقط لتقديم الردود</li>
                  <li>• لا نجمع معلومات شخصية إضافية</li>
                  <li>• البيانات محفوظة محلياً على جهازك</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenuSeparator />
        
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Copyright className="ml-2 h-4 w-4" />
              <span>كل الحقوق محفوظة لدى معاذ</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-right">حقوق الملكية</DialogTitle>
              <DialogDescription className="text-right">
                معلومات حقوق الطبع والنشر
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 text-right">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Copyright className="text-white" size={24} />
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-center font-semibold text-lg">
                  © 2025 معاذ AI
                </p>
                <p className="text-center text-gray-600">
                  جميع الحقوق محفوظة
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>• تم تطوير هذا التطبيق بواسطة معاذ</p>
                  <p>• محمي بموجب قوانين حقوق الطبع والنشر</p>
                  <p>• استخدام التقنيات المتقدمة في الذكاء الاصطناعي</p>
                  <p>• مصمم خصيصاً للمستخدمين العرب</p>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-center text-gray-500">
                    هذا التطبيق محمي بحقوق الملكية الفكرية.<br/>
                    أي استخدام غير مصرح به ممنوع قانونياً.
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}