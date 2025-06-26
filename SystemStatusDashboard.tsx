import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Activity, Shield, Zap, Monitor } from "lucide-react";

interface SystemStatus {
  service: string;
  status: string;
  uptime: number;
  monitoring: {
    isMonitoring: boolean;
    restartAttempts: number;
    lastHealthCheck: number;
    uptime: number;
    memoryUsage: any;
  };
  externalPing: {
    isActive: boolean;
    activeIntervals: number;
    externalUrls: number;
    lastActivity: string;
  };
  watchdog: {
    isWatching: boolean;
    restartCount: number;
    lastRestartTime: number;
    uptime: number;
    processId: number;
  };
  memory: {
    used: number;
    total: number;
    rss: number;
  };
  performance: any;
  lastUpdate: string;
}

export default function SystemStatusDashboard() {
  const { data: systemStatus, isLoading, refetch } = useQuery<SystemStatus>({
    queryKey: ["/api/system-status"],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">حالة النظام</h2>
          <RefreshCw className="h-6 w-6 animate-spin" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">لوحة مراقبة النظام</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">خدمة معاذ AI - التشغيل المستمر 24/7</p>
        </div>
        <Button 
          onClick={() => refetch()} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          تحديث
        </Button>
      </div>

      {systemStatus && (
        <>
          {/* Main Status Card */}
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <Shield className="h-5 w-5" />
                حالة الخدمة الرئيسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">الحالة</p>
                  <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                    {systemStatus.status === 'operational' ? 'يعمل بشكل طبيعي' : systemStatus.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">وقت التشغيل</p>
                  <p className="font-semibold text-green-800 dark:text-green-200">
                    {formatUptime(systemStatus.uptime)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">الذاكرة المستخدمة</p>
                  <p className="font-semibold text-blue-600 dark:text-blue-400">
                    {systemStatus.memory.used} MB
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">آخر تحديث</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(systemStatus.lastUpdate)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monitoring Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Uptime Monitor */}
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Activity className="h-5 w-5" />
                  مراقب وقت التشغيل
                </CardTitle>
                <CardDescription>
                  مراقبة صحة النظام والتعافي التلقائي
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">الحالة:</span>
                  <Badge variant={systemStatus.monitoring.isMonitoring ? "default" : "destructive"}>
                    {systemStatus.monitoring.isMonitoring ? "نشط" : "متوقف"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">محاولات الإعادة:</span>
                  <span className="font-medium">{systemStatus.monitoring.restartAttempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">استخدام الذاكرة:</span>
                  <span className="font-medium text-blue-600">
                    {Math.round(systemStatus.monitoring.memoryUsage?.heapUsed / 1024 / 1024 || 0)} MB
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* External Ping Service */}
            <Card className="border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <Zap className="h-5 w-5" />
                  خدمة البينق الخارجي
                </CardTitle>
                <CardDescription>
                  منع الإيقاف التلقائي للخدمة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">الحالة:</span>
                  <Badge variant={systemStatus.externalPing.isActive ? "default" : "destructive"}>
                    {systemStatus.externalPing.isActive ? "نشط" : "متوقف"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">المراقبات النشطة:</span>
                  <span className="font-medium">{systemStatus.externalPing.activeIntervals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">آخر نشاط:</span>
                  <span className="text-xs text-purple-600">
                    {formatDate(systemStatus.externalPing.lastActivity)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Process Watchdog */}
            <Card className="border-orange-200 dark:border-orange-800">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <Monitor className="h-5 w-5" />
                  مراقب العمليات
                </CardTitle>
                <CardDescription>
                  الحماية من تعطل العمليات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">الحالة:</span>
                  <Badge variant={systemStatus.watchdog.isWatching ? "default" : "destructive"}>
                    {systemStatus.watchdog.isWatching ? "يراقب" : "متوقف"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">عدد الإعادات:</span>
                  <span className="font-medium">{systemStatus.watchdog.restartCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">معرف العملية:</span>
                  <span className="font-mono text-sm">{systemStatus.watchdog.processId}</span>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Memory and Performance Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Memory Usage */}
            <Card>
              <CardHeader>
                <CardTitle>استخدام الذاكرة</CardTitle>
                <CardDescription>تفاصيل استهلاك ذاكرة النظام</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>المستخدمة:</span>
                    <span className="font-medium">{systemStatus.memory.used} MB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((systemStatus.memory.used / systemStatus.memory.total) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>الإجمالية:</span>
                  <span className="font-medium">{systemStatus.memory.total} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>RSS:</span>
                  <span className="font-medium">{systemStatus.memory.rss} MB</span>
                </div>
              </CardContent>
            </Card>

            {/* System Information */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات النظام</CardTitle>
                <CardDescription>تفاصيل الخدمة والتشغيل</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>اسم الخدمة:</span>
                  <span className="font-medium text-sm">{systemStatus.service}</span>
                </div>
                <div className="flex justify-between">
                  <span>وقت التشغيل الكامل:</span>
                  <span className="font-medium">{formatUptime(systemStatus.uptime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>نوع الخدمة:</span>
                  <Badge variant="secondary">دائمة - 24/7</Badge>
                </div>
                <div className="flex justify-between">
                  <span>الإصدار:</span>
                  <Badge variant="outline">2.0 Permanent</Badge>
                </div>
              </CardContent>
            </Card>

          </div>
        </>
      )}
    </div>
  );
}