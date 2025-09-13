import React from 'react';
import { Button } from './ui/button';
import { 
  BookOpen, 
  Video, 
  Calendar, 
  Presentation, 
  FileText, 
  Settings, 
  BarChart3, 
  Home,
  FolderOpen,
  Brain,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { ActiveFeature } from '../App';
import { UserProfile } from './UserProfile';
import { useTheme } from './ThemeProvider';

interface SidebarProps {
  activeFeature: ActiveFeature;
  setActiveFeature: (feature: ActiveFeature) => void;
}

export function Sidebar({ activeFeature, setActiveFeature }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const menuItems = [
    { 
      id: 'dashboard' as ActiveFeature, 
      label: 'Dashboard', 
      icon: Home, 
      gradient: 'from-blue-500 to-blue-600' 
    },
    { 
      id: 'subjects' as ActiveFeature, 
      label: 'My Subjects', 
      icon: FolderOpen, 
      gradient: 'from-emerald-500 to-emerald-600' 
    },
    { 
      id: 'personalized-learning' as ActiveFeature, 
      label: 'AI Learning', 
      icon: Brain, 
      gradient: 'from-purple-500 to-purple-600' 
    },
    { 
      id: 'video-summarizer' as ActiveFeature, 
      label: 'Video Summarizer', 
      icon: Video, 
      gradient: 'from-red-500 to-red-600' 
    },
    { 
      id: 'study-planner' as ActiveFeature, 
      label: 'Study Planner', 
      icon: Calendar, 
      gradient: 'from-indigo-500 to-indigo-600' 
    },
    { 
      id: 'presentation-creator' as ActiveFeature, 
      label: 'Presentations', 
      icon: Presentation, 
      gradient: 'from-orange-500 to-orange-600' 
    },
    { 
      id: 'document-creator' as ActiveFeature, 
      label: 'Documents', 
      icon: FileText, 
      gradient: 'from-green-500 to-green-600' 
    },
    { 
      id: 'tools' as ActiveFeature, 
      label: 'Tools', 
      icon: Settings, 
      gradient: 'from-gray-500 to-gray-600' 
    },
    { 
      id: 'analytics' as ActiveFeature, 
      label: 'Analytics', 
      icon: BarChart3, 
      gradient: 'from-pink-500 to-pink-600' 
    },
  ];

  return (
    <div className="w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-r border-white/20 dark:border-gray-700/20 shadow-xl flex flex-col">
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AuraLearn
              </h1>
              <p className="text-xs text-muted-foreground">AI Learning Hub</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-8 h-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeFeature === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-12 transition-all duration-200 ${
                  isActive 
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105` 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105'
                }`}
                onClick={() => setActiveFeature(item.id)}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-xl border border-blue-100 dark:border-blue-800/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">AI Assistant Ready</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your personalized learning companion is online and ready to help!
          </p>
        </div>
      </div>
      
      <UserProfile />
    </div>
  );
}