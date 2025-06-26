import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ChatHeader from "@/components/chat/ChatHeader";
import WelcomeSection from "@/components/chat/WelcomeSection";
import MessagesContainer from "@/components/chat/MessagesContainer";
import InputArea from "@/components/chat/InputArea";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message });
      return response.json();
    },
    onSuccess: (data) => {
      // Add AI response to messages
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: data.response,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    },
    onError: (error) => {
      setIsTyping(false);
      toast({
        title: "خطأ في الإرسال",
        description: error.message || "حدث خطأ أثناء إرسال الرسالة",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim() || chatMutation.isPending) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now(),
      content: messageText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Send to API
    chatMutation.mutate(messageText);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ChatHeader />
      
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {messages.length === 0 ? (
          <WelcomeSection onQuestionClick={handleSuggestedQuestion} />
        ) : (
          <MessagesContainer 
            messages={messages} 
            isTyping={isTyping}
          />
        )}
        
        <InputArea 
          onSendMessage={handleSendMessage}
          isLoading={chatMutation.isPending}
        />
      </main>
    </div>
  );
}
