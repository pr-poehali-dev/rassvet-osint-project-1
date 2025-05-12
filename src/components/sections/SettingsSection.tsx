
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsSection = () => {
  // Настройки темы
  const [theme, setTheme] = useState<"system" | "dark" | "light" | "cyberpunk">("dark");
  
  // Статистика
  const [stats, setStats] = useState({
    searchCount: 15,
    iploggerCount: 8,
    totalVisits: 37,
    daysActive: 5
  });
  
  // Настройки приватности
  const [privacySettings, setPrivacySettings] = useState({
    saveHistory: true,
    anonymizeResults: false,
    useEncryption: true
  });
  
  // Уведомления
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: false,
    browserNotifications: true,
    soundAlerts: false
  });

  // Обработчик изменения темы
  const handleThemeChange = (newTheme: "system" | "dark" | "light" | "cyberpunk") => {
    setTheme(newTheme);
    // В реальном приложении здесь была бы логика смены темы
    // например: document.documentElement.classList.toggle('dark');
  };

  // Обработчик изменения настроек приватности
  const handlePrivacyChange = (setting: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting]
    });
  };

  // Обработчик изменения настроек уведомлений
  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  // Имитация сброса настроек
  const handleResetSettings = () => {
    setTheme("dark");
    setPrivacySettings({
      saveHistory: true,
      anonymizeResults: false,
      useEncryption: true
    });
    setNotificationSettings({
      emailNotifications: false,
      browserNotifications: true,
      soundAlerts: false
    });
  };

  return (
    <div className="space-y-6">
      {/* Карточка с основными настройками */}
      <Card className="border-purple-800/30 bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" className="text-purple-500" />
            Настройки приложения
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="appearance">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Icon name="Palette" size={15} />
                <span>Внешний вид</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Icon name="Shield" size={15} />
                <span>Приватность</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Icon name="Bell" size={15} />
                <span>Уведомления</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Настройки внешнего вида */}
            <TabsContent value="appearance" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Тема оформления</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div 
                      className={`
                        rounded-md border p-2 flex flex-col items-center cursor-pointer transition-all
                        ${theme === 'system' ? 'border-purple-500 bg-gray-800' : 'border-gray-700 hover:border-gray-600'}
                      `}
                      onClick={() => handleThemeChange('system')}
                    >
                      <div className="h-12 w-12 rounded-full mb-2 flex items-center justify-center bg-gray-700">
                        <Icon name="Monitor" className="h-6 w-6 text-gray-300" />
                      </div>
                      <span className="text-xs">Системная</span>
                    </div>
                    
                    <div 
                      className={`
                        rounded-md border p-2 flex flex-col items-center cursor-pointer transition-all
                        ${theme === 'dark' ? 'border-purple-500 bg-gray-800' : 'border-gray-700 hover:border-gray-600'}
                      `}
                      onClick={() => handleThemeChange('dark')}
                    >
                      <div className="h-12 w-12 rounded-full mb-2 bg-gray-900 flex items-center justify-center">
                        <Icon name="Moon" className="h-6 w-6 text-gray-300" />
                      </div>
                      <span className="text-xs">Тёмная</span>
                    </div>
                    
                    <div 
                      className={`
                        rounded-md border p-2 flex flex-col items-center cursor-pointer transition-all
                        ${theme === 'light' ? 'border-purple-500 bg-gray-800' : 'border-gray-700 hover:border-gray-600'}
                      `}
                      onClick={() => handleThemeChange('light')}
                    >
                      <div className="h-12 w-12 rounded-full mb-2 bg-gray-200 flex items-center justify-center">
                        <Icon name="Sun" className="h-6 w-6 text-gray-700" />
                      </div>
                      <span className="text-xs">Светлая</span>
                    </div>
                    
                    <div 
                      className={`
                        rounded-md border p-2 flex flex-col items-center cursor-pointer transition-all
                        ${theme === 'cyberpunk' ? 'border-purple-500 bg-gray-800' : 'border-gray-700 hover:border-gray-600'}
                      `}
                      onClick={() => handleThemeChange('cyberpunk')}
                    >
                      <div className="h-12 w-12 rounded-full mb-2 bg-[#7928CA] bg-gradient-to-br from-[#FF0080] to-[#7928CA] flex items-center justify-center">
                        <Icon name="Zap" className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs">Киберпанк</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Размер шрифта</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Выберите размер шрифта" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Маленький</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="large">Большой</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Подсветка консоли</Label>
                  <Select defaultValue="monokai">
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Выберите стиль подсветки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Стандартная</SelectItem>
                      <SelectItem value="monokai">Monokai</SelectItem>
                      <SelectItem value="dracula">Dracula</SelectItem>
                      <SelectItem value="github">GitHub</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            {/* Настройки приватности */}
            <TabsContent value="privacy" className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Сохранять историю</Label>
                    <div className="text-xs text-gray-400">Сохранять поисковые запросы и результаты</div>
                  </div>
                  <Switch 
                    checked={privacySettings.saveHistory}
                    onCheckedChange={() => handlePrivacyChange('saveHistory')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Анонимизировать результаты</Label>
                    <div className="text-xs text-gray-400">Скрывать личные данные в результатах поиска</div>
                  </div>
                  <Switch 
                    checked={privacySettings.anonymizeResults}
                    onCheckedChange={() => handlePrivacyChange('anonymizeResults')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Использовать шифрование</Label>
                    <div className="text-xs text-gray-400">Шифровать все запросы и результаты поиска</div>
                  </div>
                  <Switch 
                    checked={privacySettings.useEncryption}
                    onCheckedChange={() => handlePrivacyChange('useEncryption')}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Настройки уведомлений */}
            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Email-уведомления</Label>
                    <div className="text-xs text-gray-400">Получать уведомления на email</div>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationChange('emailNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Браузерные уведомления</Label>
                    <div className="text-xs text-gray-400">Показывать уведомления в браузере</div>
                  </div>
                  <Switch 
                    checked={notificationSettings.browserNotifications}
                    onCheckedChange={() => handleNotificationChange('browserNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Звуковые оповещения</Label>
                    <div className="text-xs text-gray-400">Проигрывать звук при получении результатов</div>
                  </div>
                  <Switch 
                    checked={notificationSettings.soundAlerts}
                    onCheckedChange={() => handleNotificationChange('soundAlerts')}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 pt-4 border-t border-gray-800 flex justify-end">
            <Button
              variant="destructive"
              onClick={handleResetSettings}
              className="bg-red-900 hover:bg-red-800"
            >
              <Icon name="RotateCcw" className="h-4 w-4 mr-2" />
              Сбросить настройки
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Карточка со статистикой */}
      <Card className="border-purple-800/30 bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart" className="text-purple-500" />
            Статистика использования
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-md p-4 flex flex-col items-center">
              <Icon name="Search" className="h-8 w-8 text-blue-400 mb-2" />
              <div className="text-2xl font-bold">{stats.searchCount}</div>
              <div className="text-xs text-gray-400">Поисковых запросов</div>
            </div>
            
            <div className="bg-gray-800 rounded-md p-4 flex flex-col items-center">
              <Icon name="Globe" className="h-8 w-8 text-green-400 mb-2" />
              <div className="text-2xl font-bold">{stats.iploggerCount}</div>
              <div className="text-xs text-gray-400">Созданных IP-логгеров</div>
            </div>
            
            <div className="bg-gray-800 rounded-md p-4 flex flex-col items-center">
              <Icon name="Eye" className="h-8 w-8 text-yellow-400 mb-2" />
              <div className="text-2xl font-bold">{stats.totalVisits}</div>
              <div className="text-xs text-gray-400">Зафиксированных визитов</div>
            </div>
            
            <div className="bg-gray-800 rounded-md p-4 flex flex-col items-center">
              <Icon name="Calendar" className="h-8 w-8 text-purple-400 mb-2" />
              <div className="text-2xl font-bold">{stats.daysActive}</div>
              <div className="text-xs text-gray-400">Дней активности</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;
