import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Типы для логов IP Logger
type LogType = "create" | "visit";

interface BaseLog {
  id: string;
  timestamp: string;
  type: LogType;
}

interface CreateLog extends BaseLog {
  type: "create";
  url: string;
  trackedUrl: string;
}

interface VisitLog extends BaseLog {
  type: "visit";
  ip: string;
  userAgent: string;
  location: string;
  url: string;
}

type LogEntry = CreateLog | VisitLog;

// Компоненты для разных частей IPLogger
const TrackedLinkItem = ({
  link,
  onCopy,
  onSimulateVisit,
}: {
  link: string;
  onCopy: (link: string) => void;
  onSimulateVisit: (link: string) => void;
}) => (
  <div className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
    <div className="font-mono text-xs text-green-400 truncate mr-2">{link}</div>
    <div className="flex gap-1 shrink-0">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={() => onCopy(link)}
      >
        <Icon name="Copy" size={14} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-purple-400"
        onClick={() => onSimulateVisit(link)}
      >
        <Icon name="Eye" size={14} />
      </Button>
    </div>
  </div>
);

const LogEntryView = ({ log }: { log: LogEntry }) => (
  <div className="border-b border-gray-800 pb-2">
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
);

// Вспомогательные функции
const generateId = () => Math.random().toString(36).substring(2, 10);
const generateRandomIP = () =>
  `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

const IPLoggerSection = () => {
  const [urlInput, setUrlInput] = useState("");
  const [createdLinks, setCreatedLinks] = useState<string[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateLink = () => {
    if (!urlInput.trim()) return;

    setIsCreating(true);

    // Имитация создания отслеживаемой ссылки с задержкой
    setTimeout(() => {
      const linkId = generateId();
      const trackedUrl = `https://rassvet.io/r/${linkId}`;

      // Добавляем новую ссылку
      setCreatedLinks((prev) => [trackedUrl, ...prev]);

      // Добавляем лог о создании
      const createLog: CreateLog = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        type: "create",
        url: urlInput,
        trackedUrl,
      };

      setLogs((prev) => [createLog, ...prev]);
      setIsCreating(false);
    }, 1500);
  };

  // Копирование ссылки в буфер обмена
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    // Здесь можно добавить уведомление о копировании
  };

  // Имитация получения данных о посещении
  const simulateVisit = (url: string) => {
    const visitLog: VisitLog = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      type: "visit",
      ip: generateRandomIP(),
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      location: "Moscow, Russia",
      url,
    };

    setLogs((prev) => [visitLog, ...prev]);
  };

  const clearLogs = () => setLogs([]);
  const clearUrlInput = () => setUrlInput("");

  return (
    <div className="space-y-6">
      {/* Карточка с IP Logger */}
      <Card className="border-purple-800/30 bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Globe" className="text-purple-500" />
            IP Logger
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Секция создания ссылки */}
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
                  onClick={clearUrlInput}
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

          {/* Секция созданных ссылок */}
          {createdLinks.length > 0 && (
            <div className="pt-2">
              <Label className="text-sm font-medium mb-2 block">
                Созданные ссылки
              </Label>
              <div className="space-y-2 max-h-[120px] overflow-y-auto">
                {createdLinks.map((link, index) => (
                  <TrackedLinkItem
                    key={index}
                    link={link}
                    onCopy={handleCopyLink}
                    onSimulateVisit={simulateVisit}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Секция логов IP Logger */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Логи IP Logger</Label>
              {logs.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearLogs}
                  className="h-8 px-2 text-gray-400"
                >
                  Очистить логи
                </Button>
              )}
            </div>

            <div className="bg-black border border-gray-700 rounded-md p-4 h-[300px] overflow-y-auto font-mono text-sm">
              {logs.length > 0 ? (
                <div className="space-y-2">
                  {logs.map((log) => (
                    <LogEntryView key={log.id} log={log} />
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 h-full flex items-center justify-center">
                  Создайте отслеживаемую ссылку и ожидайте визиты для получения
                  данных
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Карточка с информацией */}
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
                IP Logger позволяет создавать отслеживаемые ссылки для сбора
                данных о посетителях. При переходе по созданной ссылке система
                записывает IP-адрес, информацию о браузере, местоположение и
                другие технические данные.
              </p>
            </TabsContent>
            <TabsContent value="security">
              <p className="text-sm text-gray-400">
                Используйте IP Logger только в исследовательских целях и с
                согласия объекта исследования. Несанкционированный сбор данных
                может нарушать законодательство о приватности.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IPLoggerSection;
