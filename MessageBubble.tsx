import { Bot, User } from "lucide-react";
import type { Message } from "@/pages/chat";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className="flex items-end space-x-2 space-x-reverse max-w-xs lg:max-w-md">
        {!isUser && (
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <Bot className="text-white" size={14} />
          </div>
        )}
        
        <div className={`${
          isUser 
            ? 'bg-primary text-white' 
            : 'bg-white border border-gray-200'
        } rounded-2xl px-4 py-3 shadow-sm`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="text-gray-600" size={14} />
          </div>
        )}
      </div>
    </div>
  );
}
