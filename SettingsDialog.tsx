import { useState } from "react";
import { Settings, LogOut, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import ApiKeyManager from "./ApiKeyManager";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface SettingsDialogProps {
  onLogout?: () => void;
}

export default function SettingsDialog({ onLogout }: SettingsDialogProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Clear any stored data and refresh page
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }
  };

  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">الإعدادات</DialogTitle>
          <DialogDescription className="text-right">
            قم بتخصيص تجربتك مع معاذ AI
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Theme Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-right">المظهر</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <Label htmlFor="dark-mode" className="text-sm">
                  {darkMode ? "الوضع المظلم" : "الوضع المضيء"}
                </Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </div>

          <Separator />

          {/* Sound Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-right">الصوت</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                <Label htmlFor="sound" className="text-sm">أصوات التنبيه</Label>
              </div>
              <Switch
                id="sound"
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
          </div>

          <Separator />

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-right">الإشعارات</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-sm">إشعارات الرسائل</Label>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>

          <Separator />

          {/* API Management */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-right">إدارة الذكاء الاصطناعي</h3>
            <ApiKeyManager />
          </div>

          <Separator />

          {/* Account Actions */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-right">الحساب</h3>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full justify-center space-x-2 space-x-reverse"
            >
              <LogOut className="h-4 w-4" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}