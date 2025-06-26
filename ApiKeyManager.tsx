import { useState } from "react";
import { Key, Save, TestTube, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ApiKeyManagerProps {
  onApiKeyUpdated?: () => void;
}

export default function ApiKeyManager({ onApiKeyUpdated }: ApiKeyManagerProps) {
  const [apiKey, setApiKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const updateApiKeyMutation = useMutation({
    mutationFn: async (newApiKey: string) => {
      const response = await apiRequest("POST", "/api/update-api-key", { apiKey: newApiKey });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم تحديث المفتاح بنجاح",
        description: "تم حفظ مفتاح API الجديد وهو جاهز للاستخدام",
      });
      setApiKey("");
      setIsOpen(false);
      if (onApiKeyUpdated) {
        onApiKeyUpdated();
      }
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في تحديث المفتاح",
        description: error.message || "حدث خطأ أثناء تحديث مفتاح API",
        variant: "destructive",
      });
    },
  });

  const testApiKeyMutation = useMutation({
    mutationFn: async (testApiKey: string) => {
      const response = await apiRequest("POST", "/api/test-api-key", { apiKey: testApiKey });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.valid) {
        setTestStatus('success');
        toast({
          title: "المفتاح صالح",
          description: "تم التحقق من صحة مفتاح API بنجاح",
        });
      } else {
        setTestStatus('error');
        toast({
          title: "المفتاح غير صالح",
          description: "مفتاح API غير صحيح أو منتهي الصلاحية",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      setTestStatus('error');
      toast({
        title: "خطأ في الاختبار",
        description: "حدث خطأ أثناء اختبار مفتاح API",
        variant: "destructive",
      });
    },
  });

  const handleTestApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "مفتاح مطلوب",
        description: "يرجى إدخال مفتاح API أولاً",
        variant: "destructive",
      });
      return;
    }
    setTestStatus('testing');
    testApiKeyMutation.mutate(apiKey);
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "مفتاح مطلوب",
        description: "يرجى إدخال مفتاح API صالح",
        variant: "destructive",
      });
      return;
    }
    updateApiKeyMutation.mutate(apiKey);
  };

  const getTestStatusIcon = () => {
    switch (testStatus) {
      case 'testing':
        return <TestTube className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <TestTube className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2 space-x-reverse">
          <Key className="h-4 w-4" />
          <span>إدارة مفتاح API</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-right">إدارة مفتاح Gemini API</DialogTitle>
          <DialogDescription className="text-right">
            قم بتحديث مفتاح API عندما يتوقف المفتاح الحالي عن العمل
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-right block">
              مفتاح Gemini API الجديد
            </Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setTestStatus('idle');
              }}
              placeholder="AIzaSy..."
              className="font-mono text-sm"
              dir="ltr"
            />
            <p className="text-xs text-gray-500 text-right">
              يمكنك الحصول على مفتاح API من 
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mx-1"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          <div className="flex space-x-3 space-x-reverse">
            <Button
              onClick={handleTestApiKey}
              disabled={!apiKey.trim() || testApiKeyMutation.isPending}
              variant="outline"
              className="flex items-center space-x-2 space-x-reverse"
            >
              {getTestStatusIcon()}
              <span>اختبار المفتاح</span>
            </Button>
            
            <Button
              onClick={handleSaveApiKey}
              disabled={!apiKey.trim() || updateApiKeyMutation.isPending || testStatus === 'error'}
              className="flex items-center space-x-2 space-x-reverse"
            >
              <Save className="h-4 w-4" />
              <span>حفظ المفتاح</span>
            </Button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2 text-right">تنبيه مهم:</h4>
            <ul className="text-sm text-yellow-700 space-y-1 text-right">
              <li>• احتفظ بنسخة احتياطية من مفاتيح API القديمة</li>
              <li>• اختبر المفتاح الجديد قبل الحفظ</li>
              <li>• سيتم استخدام المفتاح الجديد فوراً بعد الحفظ</li>
              <li>• يمكنك تغيير المفتاح في أي وقت</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}