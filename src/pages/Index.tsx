
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Компоненты разделов приложения
import SearchSection from "@/components/sections/SearchSection";
import IPLoggerSection from "@/components/sections/IPLoggerSection";
import LibrarySection from "@/components/sections/LibrarySection";
import SettingsSection from "@/components/sections/SettingsSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Хедер */}
      <header className="border-b border-gray-800 p-4 flex justify-between items-center bg-[#1A1F2C]">
        <div className="flex items-center gap-2">
          <Icon name="Sunrise" size={24} className="text-purple-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            RASSVET
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Icon name="Info" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="User" size={20} />
          </Button>
        </div>
      </header>

      {/* Основной контент */}
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        <Tabs
          defaultValue="search"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Icon name="Search" size={16} />
              <span>Поиск</span>
            </TabsTrigger>
            <TabsTrigger value="iplogger" className="flex items-center gap-2">
              <Icon name="Globe" size={16} />
              <span>IP Logger</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Icon name="Library" size={16} />
              <span>Библиотека</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Icon name="Settings" size={16} />
              <span>Настройки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <SearchSection />
          </TabsContent>

          <TabsContent value="iplogger">
            <IPLoggerSection />
          </TabsContent>

          <TabsContent value="library">
            <LibrarySection />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsSection />
          </TabsContent>
        </Tabs>
      </main>

      {/* Футер */}
      <footer className="border-t border-gray-800 p-4 text-center text-sm text-gray-500 bg-[#1A1F2C]">
        <div>Rassvet OSINT платформа &copy; {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
};

export default Index;
