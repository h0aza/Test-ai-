import { useState, useEffect } from "react";
import { Cpu, Zap, Brain, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ApiStatusIndicator() {
  const { data: apiStatus, refetch } = useQuery({
    queryKey: ['/api/ai-status'],
    refetchInterval: 30000, // Check every 30 seconds
  });

  const getStatusInfo = () => {
    if (!apiStatus) {
      return {
        icon: <Cpu className="w-3 h-3 animate-pulse" />,
        text: "جاري الفحص...",
        color: "text-gray-500",
        bgColor: "bg-gray-100"
      };
    }

    if (apiStatus?.ai_enabled) {
      return {
        icon: <Brain className="w-3 h-3" />,
        text: "مدعوم بتقنية معاذ AI من Moaaz AI",
        color: "text-green-600",
        bgColor: "bg-green-100"
      };
    } else {
      return {
        icon: <AlertTriangle className="w-3 h-3" />,
        text: "يحتاج مفتاح API",
        color: "text-orange-600",
        bgColor: "bg-orange-100"
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`inline-flex items-center space-x-1 space-x-reverse px-2 py-1 rounded-full text-xs ${statusInfo.bgColor} ${statusInfo.color}`}>
      {statusInfo.icon}
      <span>{statusInfo.text}</span>
    </div>
  );
}