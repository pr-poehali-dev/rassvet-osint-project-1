
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Типы записей для библиотеки
type ActivityRecord = {
  id: string;
  type: 'search' | 'iplogger' | 'settings';
  timestamp: string;
  description: string;
  details?: any;
};

const LibrarySection = () => {
  // Имитация истории действий
  const [activities, setActivities] = useState<ActivityRecord[]>([
    {
      id: '1',
      type: 'search',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      description: 'Поиск информации по запросу "John Doe"',
      details: {
        query: 'John Doe',
        results: 5
      }
    },
    {
      id: '2',
      type: 'iplogger',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      description: 'Создана отслеживаемая ссылка',
      details: {
        url: 'https://example.com',
        trackedUrl: 'https://rassvet.io/r/a1b2c3d4'
      }
    },
    {
      id: '3',
      type: 'iplogger',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      description: 'Зафиксирован визит на отслеживаемую ссылку',
      details: {
        ip: '192.168.1.1',
        location: 'Moscow, Russia',
        url: 'https://rassvet.io/r/a1b2c3d4'
      }
    },
    {
      id: '4',
      type: 'settings',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      description: 'Изменена тема оформления',
      details: {
        from: 'light',
        to: 'dark'
      }
    },
    {
      id: '5',
      type: 'search',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      description: 'Поиск информации по запросу "email:user@example.com"',
      details: {
        query: 'email:user@example.com',
        results: 3
      }
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'search' | 'iplogger' | 'settings'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация и поиск
  const filteredActivities = activities
    .filter(activity => filter === 'all' || activity.type === filter)
    .filter(activity => {
      if (!searchQuery.trim()) return true;
      return activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    });

  // Получение иконки для типа активности
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'search': return 'Search';
      case 'iplogger': return 'Globe';
      case 'settings': return 'Settings';
      default: return 'Activity';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-800/30 bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Library" className="text-purple-500" />
              Библиотека активности
            </div>
            <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="hidden sm:block">
              <TabsList>
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="search">Поиск</TabsTrigger>
                <TabsTrigger value="iplogger">IP Logger</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="sm:hidden">
            <Label htmlFor="mobile-filter" className="sr-only">Фильтр</Label>
            <select
              id="mobile-filter"
              className="w-full bg-gray-800 border-gray-700 rounded-md p-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">Все записи</option>
              <option value="search">Поиск</option>
              <option value="iplogger">IP Logger</option>
              <option value="settings">Настройки</option>
            </select>
          </div>

          <div className="relative">
            <Input
              placeholder="Поиск по записям..."
              className="pr-8 bg-gray-800 border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setSearchQuery("")}
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          <div className="bg-black border border-gray-700 rounded-md p-4 h-[400px] overflow-y-auto">
            {filteredActivities.length > 0 ? (
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="border border-gray-800 rounded-md p-3 hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className={`
                        p-2 rounded-md mr-3 
                        ${activity.type === 'search' ? 'bg-blue-900/30 text-blue-400' : 
                          activity.type === 'iplogger' ? 'bg-green-900/30 text-green-400' : 
                          'bg-purple-900/30 text-purple-400'}
                      `}>
                        <Icon name={getActivityIcon(activity.type)} />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">{activity.description}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>

                        <div className="mt-2 text-sm text-gray-400">
                          {activity.type === 'search' && (
                            <div className="flex items-center gap-2">
                              <span className="text-blue-400">Запрос:</span> 
                              <code className="bg-gray-800 px-1 rounded">{activity.details.query}</code>
                              <span className="text-gray-500">|</span>
                              <span className="text-blue-400">Результатов:</span> 
                              <span>{activity.details.results}</span>
                            </div>
                          )}

                          {activity.type === 'iplogger' && activity.details.ip && (
                            <div className="flex items-center gap-2">
                              <span className="text-green-400">IP:</span> 
                              <code className="bg-gray-800 px-1 rounded">{activity.details.ip}</code>
                              <span className="text-gray-500">|</span>
                              <span className="text-green-400">Локация:</span> 
                              <span>{activity.details.location}</span>
                            </div>
                          )}

                          {activity.type === 'iplogger' && activity.details.trackedUrl && (
                            <div className="flex items-center gap-2">
                              <span className="text-green-400">URL:</span> 
                              <code className="bg-gray-800 px-1 rounded truncate max-w-[200px]">
                                {activity.details.trackedUrl}
                              </code>
                            </div>
                          )}

                          {activity.type === 'settings' && (
                            <div className="flex items-center gap-2">
                              <span className="text-purple-400">Изменение:</span> 
                              <code className="bg-gray-800 px-1 rounded">{activity.details.from}</code>
                              <span>→</span>
                              <code className="bg-gray-800 px-1 rounded">{activity.details.to}</code>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 h-full flex items-center justify-center">
                {searchQuery 
                  ? "Нет записей, соответствующих запросу" 
                  : "Нет записей активности"}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-800/30 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-sm">Статистика активности</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-md p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {activities.filter(a => a.type === 'search').length}
              </div>
              <div className="text-xs text-gray-400">Поисковых запросов</div>
            </div>
            
            <div className="bg-gray-800 rounded-md p-3 text-center">
              <div className="text-2xl font-bold text-green-400">
                {activities.filter(a => a.type === 'iplogger').length}
              </div>
              <div className="text-xs text-gray-400">IP Logger операций</div>
            </div>
            
            <div className="bg-gray-800 rounded-md p-3 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {activities.filter(a => a.type === 'settings').length}
              </div>
              <div className="text-xs text-gray-400">Изменений настроек</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibrarySection;
