import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bot, Send, RotateCcw, Activity, Users, Clock } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface BotStatus {
  isActive: boolean;
  adminCount: number;
  lastActivity: string;
}

export default function TelegramBotControl() {
  const [message, setMessage] = useState('');
  const [apiKey, setApiKey] = useState('');
  const queryClient = useQueryClient();

  // Get bot status
  const { data: status, isLoading } = useQuery<BotStatus>({
    queryKey: ['/api/telegram/status'],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      const response = await fetch('/api/telegram/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText })
      });
      if (!response.ok) throw new Error('Failed to send message');
      return response.json();
    },
    onSuccess: () => {
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['/api/telegram/status'] });
    }
  });

  // Restart bot mutation
  const restartMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/telegram/restart', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to restart bot');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/telegram/status'] });
    }
  });

  // Update API key mutation
  const updateApiKeyMutation = useMutation({
    mutationFn: async (key: string) => {
      const response = await fetch('/api/telegram/update-api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key })
      });
      if (!response.ok) throw new Error('Failed to update API key');
      return response.json();
    },
    onSuccess: () => {
      setApiKey('');
    }
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageMutation.mutate(message.trim());
    }
  };

  const handleRestartBot = () => {
    restartMutation.mutate();
  };

  const handleUpdateApiKey = () => {
    if (apiKey.trim()) {
      updateApiKeyMutation.mutate(apiKey.trim());
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            حالة بوت التليجرام
          </CardTitle>
          <CardDescription>
            مراقبة والتحكم في بوت التليجرام الخاص بمعاذ AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">جاري تحميل حالة البوت...</div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span>حالة البوت:</span>
                </div>
                <Badge variant={status?.isActive ? "default" : "destructive"}>
                  {status?.isActive ? "متصل" : "منقطع"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>عدد المشرفين:</span>
                </div>
                <Badge variant="outline">{status?.adminCount || 0}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>آخر نشاط:</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {status?.lastActivity || 'غير متوفر'}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>إرسال رسالة للمشرفين</CardTitle>
          <CardDescription>
            إرسال تنبيه أو رسالة لجميع مشرفي البوت
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">الرسالة</Label>
            <Textarea
              id="message"
              placeholder="اكتب رسالتك هنا..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim() || sendMessageMutation.isPending}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            {sendMessageMutation.isPending ? 'جاري الإرسال...' : 'إرسال الرسالة'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>تحديث مفتاح API</CardTitle>
          <CardDescription>
            تحديث مفتاح Google AI API من خلال البوت
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">مفتاح API الجديد</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="أدخل مفتاح API الجديد"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleUpdateApiKey}
            disabled={!apiKey.trim() || updateApiKeyMutation.isPending}
            className="w-full"
            variant="outline"
          >
            {updateApiKeyMutation.isPending ? 'جاري التحديث...' : 'تحديث مفتاح API'}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>إعادة تشغيل البوت</CardTitle>
          <CardDescription>
            إعادة تشغيل بوت التليجرام في حالة حدوث مشاكل
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleRestartBot}
            disabled={restartMutation.isPending}
            variant="destructive"
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {restartMutation.isPending ? 'جاري إعادة التشغيل...' : 'إعادة تشغيل البوت'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}