
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

const SearchSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchInput.trim()) return;

    setIsSearching(true);
    // Имитация поиска
    setSearchResults([
      `[${new Date().toLocaleTimeString()}] Начат поиск по запросу: ${searchInput}`,
      `[${new Date().toLocaleTimeString()}] Поиск в открытых источниках...`,
      `[${new Date().toLocaleTimeString()}] Анализ социальных сетей...`,
    ]);

    // Имитация получения результатов через задержку
    setTimeout(() => {
      setSearchResults(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Найдено 3 результата по запросу "${searchInput}"`,
        `[${new Date().toLocaleTimeString()}] Аккаунт Twitter: @${searchInput.toLowerCase().replace(/\s+/g, "_")}`,
        `[${new Date().toLocaleTimeString()}] Email: ${searchInput.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        `[${new Date().toLocaleTimeString()}] Поиск завершен`
      ]);
      setIsSearching(false);
    }, 2000);
  };

  const clearResults = () => {
    setSearchResults([]);
    setSearchInput("");
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-800/30 bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Search" className="text-purple-500" />
            Поиск информации
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Введите имя, email, ник или другой идентификатор..."
                className="pr-8 bg-gray-800 border-gray-700"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {searchInput && (
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setSearchInput("")}
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSearching ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Поиск...
                </>
              ) : (
                "Искать"
              )}
            </Button>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Консоль вывода</Label>
              {searchResults.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearResults} 
                  className="h-8 px-2 text-gray-400"
                >
                  Очистить
                </Button>
              )}
            </div>
            
            <div className="bg-black border border-gray-700 rounded-md p-4 h-[300px] overflow-y-auto font-mono text-sm">
              {searchResults.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map((result, index) => (
                    <div 
                      key={index} 
                      className={`${
                        result.includes("Найдено") ? "text-green-500" : 
                        result.includes("Начат поиск") ? "text-blue-400" : 
                        result.includes("завершен") ? "text-purple-400" : 
                        "text-gray-300"
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 h-full flex items-center justify-center">
                  Введите поисковый запрос и нажмите "Искать"
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-800/30 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-sm">Рекомендации по поиску</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" className="h-4 w-4 text-purple-500 mt-0.5" />
              <span>Используйте конкретную информацию (имя, ник, email) для точных результатов</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" className="h-4 w-4 text-purple-500 mt-0.5" />
              <span>Для поиска по социальным сетям используйте префикс "social:"</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" className="h-4 w-4 text-purple-500 mt-0.5" />
              <span>Для поиска по email используйте префикс "email:"</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchSection;
