import { MessageCircle, Zap, Shield, Bot, Smile, User, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeSectionProps {
  onQuestionClick: (question: string) => void;
}

export default function WelcomeSection({ onQuestionClick }: WelcomeSectionProps) {
  const suggestedQuestions = [
    { text: "من هو Moaaz AI؟", icon: User },
    { text: "ما هي خبرة Moaaz AI؟", icon: MessageCircle },
    { text: "كيف طور Moaaz AI هذا النظام؟", icon: HelpCircle },
    { text: "ما مشاريع Moaaz AI الأخرى؟", icon: Smile },
  ];

  return (
    <div className="flex-1 px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="text-white text-3xl" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">مرحباً بك في معاذ AI</h2>
        <p className="text-gray-600 text-lg">مساعدك الذكي الشخصي المطور بتقنية معاذ AI</p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="text-primary" size={20} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">تقنية معاذ AI</h3>
            <p className="text-gray-600 text-sm">ذكاء اصطناعي متطور طوره Moaaz AI للتفاعل باللغة العربية</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-green-600" size={20} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">خبرة Moaaz AI</h3>
            <p className="text-gray-600 text-sm">مطور متخصص في تقنيات الذكاء الاصطناعي والبرمجة</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-purple-600" size={20} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">تطوير Moaaz AI</h3>
            <p className="text-gray-600 text-sm">مشروع متطور من Moaaz AI باستخدام أحدث التقنيات</p>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Message */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-3">ابدأ محادثتك الآن</h3>
          <p className="text-gray-600">
            اكتب رسالتك في الحقل أدناه وستحصل على إجابة ذكية من معاذ AI المطور بواسطة Moaaz AI
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
