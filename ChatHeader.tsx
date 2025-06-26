import { Bot } from "lucide-react";
import SettingsDialog from "./SettingsDialog";
import MoreOptionsMenu from "./MoreOptionsMenu";
import ApiStatusIndicator from "./ApiStatusIndicator";

export default function ChatHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">معاذ AI</h1>
              <div className="flex items-center space-x-2 space-x-reverse">
                <p className="text-sm text-gray-600">
                  مساعد ذكي • <span className="text-green-600">متصل</span>
                </p>
                <ApiStatusIndicator />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <SettingsDialog />
            <MoreOptionsMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
