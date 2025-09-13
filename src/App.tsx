import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PersonalizedLearning } from './components/PersonalizedLearning';
import { VideoSummarizer } from './components/VideoSummarizer';
import { StudyPlanner } from './components/StudyPlanner';
import { PresentationCreator } from './components/PresentationCreator';
import { DocumentCreator } from './components/DocumentCreator';
import { ToolsSection } from './components/ToolsSection';
import { Analytics } from './components/Analytics';
import { SubjectManager } from './components/SubjectManager';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { SignInPage } from './components/SignInPage';

export type ActiveFeature = 
  | 'dashboard' 
  | 'personalized-learning' 
  | 'video-summarizer' 
  | 'study-planner' 
  | 'presentation-creator' 
  | 'document-creator' 
  | 'tools' 
  | 'analytics'
  | 'subjects';

function MainApp() {
  const [activeFeature, setActiveFeature] = useState<ActiveFeature>('dashboard');

  const renderContent = () => {
    switch (activeFeature) {
      case 'personalized-learning':
        return <PersonalizedLearning />;
      case 'video-summarizer':
        return <VideoSummarizer />;
      case 'study-planner':
        return <StudyPlanner />;
      case 'presentation-creator':
        return <PresentationCreator />;
      case 'document-creator':
        return <DocumentCreator />;
      case 'tools':
        return <ToolsSection />;
      case 'analytics':
        return <Analytics />;
      case 'subjects':
        return <SubjectManager />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      <Sidebar activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
      <main className="flex-1 p-6">
        <div className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <SignInPage />;
  }
  
  return <MainApp />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

function DashboardHome() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="mb-8">
        <h1 className="text-4xl mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome to AuraLearn
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Your personalized AI learning hub. Select a feature from the sidebar to get started on your learning journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
        <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-xl border border-blue-200 dark:border-blue-700/50">
          <div className="text-3xl mb-3">🧠</div>
          <h3 className="mb-2">Personalized Learning</h3>
          <p className="text-sm text-muted-foreground">Upload your study materials and get AI-powered insights</p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-xl border border-purple-200 dark:border-purple-700/50">
          <div className="text-3xl mb-3">📹</div>
          <h3 className="mb-2">Video Summarizer</h3>
          <p className="text-sm text-muted-foreground">Get key points from YouTube and Instagram videos</p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/50 dark:to-pink-800/50 rounded-xl border border-pink-200 dark:border-pink-700/50">
          <div className="text-3xl mb-3">📅</div>
          <h3 className="mb-2">Study Planner</h3>
          <p className="text-sm text-muted-foreground">Create optimized study schedules with spaced repetition</p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 rounded-xl border border-green-200 dark:border-green-700/50">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="mb-2">Presentation Creator</h3>
          <p className="text-sm text-muted-foreground">Generate beautiful presentations from your content</p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/50 dark:to-yellow-800/50 rounded-xl border border-yellow-200 dark:border-yellow-700/50">
          <div className="text-3xl mb-3">📝</div>
          <h3 className="mb-2">Document Creator</h3>
          <p className="text-sm text-muted-foreground">Create comprehensive study documents and reports</p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 rounded-xl border border-indigo-200 dark:border-indigo-700/50">
          <div className="text-3xl mb-3">🛠️</div>
          <h3 className="mb-2">Tools & Analytics</h3>
          <p className="text-sm text-muted-foreground">File conversion, compression, and progress tracking</p>
        </div>
      </div>
    </div>
  );
}