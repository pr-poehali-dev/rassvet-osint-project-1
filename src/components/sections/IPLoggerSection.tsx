
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IPLoggerSection = () => {
  const [urlInput, setUrlInput] = useState("");
  const [createdLinks, setCreatedLinks] = useState<string[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateLink = () => {
    if (!urlInput.trim()) return;

    setIsCreating(true);
    // Имитация создания отслеживаемой ссылки
    setTimeout(() => {
      const trackedUrl = `https://rassvet.io/r/${Math.random().toString(36).substring(2, 10)}`;
      setCreatedLinks([trackedUrl, ...createdLinks]);
      
      // Добавляем лог о создании
      setLogs(prev => [
        {
          timestamp: new Date().toISOString(),
          type: "create",
          url: urlInput,
          trackedUrl: trackedUrl
        },
        ...prev
      ]);
      
      setIsCreating(false);
      // Не очищаем поле ввода чтобы пользователь видел что было создано
    }, 1500);
  };

  // Имитация получения логов
  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const simulateVisit = (url: string) => {
    const newLog = {
      timestamp: new Date().toISOString(),
      type: "visit",
      ip: generateRandomIP(),
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      location: "Moscow, Russia",
      url: url
    };
    
    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-800/30 bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Globe" className="text-purple-500" />
            IP Logger
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Вставьте URL для создания отслеживаемой ссылки..."
                className="pr-8 bg-gray-800 border-gray-700"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateLink()}
              />
              {urlInput && (
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setUrlInput("")}
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
            <Button 
              onClick={handleCreateLink} 
              disabled={isCreating || !urlInput.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isCreating ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Создание...
                </>
              ) : (
                "Создать ссылку"
              )}
            </Button>
          </div>

          {createdLinks.length > 0 && (
            <div className="pt-2">
              <Label className="text-sm font-medium mb-2 block">Созданные ссылки</Label>
              <div className="space-y-2 max-h-[120px] overflow-y-auto">
                {createdLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
                    <div className="font-mono text-xs text-green-400 truncate mr-2">{link}</div>
                    <div className="flex gap-1 shrink-0">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => {
                          navigator.clipboard.writeText(link);
                          // Можно добавить тост уведомление
                        }}
                      >
                        <Icon name="Copy" size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-purple-400"
                        onClick={() => simulateVisit(link)}
                      >
                        <Icon name="Eye" size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Логи IP Logger</Label>
              {logs.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setLogs([])} 
                  className="h-8 px-2 text-gray-400"
                >
                  Очистить логи
                </Button>
              )}
            </div>
            
            <div className="bg-black border border-gray-700 rounded-md p-4 h-[300px] overflow-y-auto font-mono text-sm">
              {logs.length > 0 ? (
                <div className="space-y-2">
                  {logs.map((log, index) => (
                    <div key={index} className="border-b border-gray-800 pb-2">
                      <div className="text-gray-500 text-xs">
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                      
                      {log.type === "create" ? (
                        <div>
                          <span className="text-blue-500">Создана ссылка: </span>
                          <span className="text-green-400">{log.trackedUrl}</span>
                          <div className="text-gray-500 text-xs">Исходный URL: {log.url}</div>
                        </div>
                      ) : (
                        <div>
                          <span className="text-yellow-500">Зафиксирован визит: </span>
                          <div className="grid grid-cols-2 gap-1 mt-1">
                            <div className="text-gray-400">IP:</div>
                            <div className="text-white">{log.ip}</div>
                            
                            <div className="text-gray-400">Местоположение:</div>
                            <div className="text-white">{log.location}</div>
                            
                            <div className="text-gray-400 truncate">Браузер:</div>
                            <div className="text-white truncate">{log.userAgent}</div>
                            
                            <div className="text-gray-400">Ссылка:</div>
                            <div className="text-green-400 truncate">{log.url}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 h-full flex items-center justify-center">
                  Создайте отслеживаемую ссылку и ожидайте визиты для получения данных
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-800/30 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-sm">Информация об IP Logger</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="about">
            <TabsList className="mb-2">
              <TabsTrigger value="about">О функции</TabsTrigger>
              <TabsTrigger value="security">Безопасность</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <p className="text-sm text-gray-400">
                IP Logger позволяет создавать отслеживаемые ссылки для сбора данных о посетителях.
                При переходе по созданной ссылке система записывает IP-адрес, информацию о браузере,
                местоположение и другие технические данные.
              </p>
            </TabsContent>
            <TabsContent value="security">
              <p className="text-sm text-gray-400">
                Используйте IP Logger только в исследовательских целях и с согласия объекта исследования.
                Несанкционированный сбор данных может нарушать законодательство о приватности.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IPLoggerSection;
