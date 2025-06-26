import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PasswordProtection from '@/components/auth/PasswordProtection';
import SystemStatusDashboard from '@/components/admin/SystemStatusDashboard';
import TelegramBotControl from '@/components/admin/TelegramBotControl';
import { Shield, Activity, Bot } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-md mx-auto pt-20">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h1 className="text-2xl font-bold">لوحة إدارة معاذ AI</h1>
            <p className="text-muted-foreground mt-2">
              يتطلب كلمة مرور للوصول
            </p>
          </div>
          <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            لوحة إدارة معاذ AI
          </h1>
          <p className="text-muted-foreground mt-2">
            مراقبة والتحكم في جميع خدمات النظام
          </p>
        </div>

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              حالة النظام
            </TabsTrigger>
            <TabsTrigger value="telegram" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              بوت التليجرام
            </TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  مراقبة النظام المباشرة
                </CardTitle>
                <CardDescription>
                  مراقبة شاملة لجميع خدمات معاذ AI والأنظمة الفرعية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SystemStatusDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="telegram" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  إدارة بوت التليجرام
                </CardTitle>
                <CardDescription>
                  التحكم الكامل في بوت التليجرام وإرسال الرسائل للمشرفين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TelegramBotControl />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}