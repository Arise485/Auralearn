import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Upload, 
  FileText, 
  MessageCircle, 
  Brain, 
  FileImage, 
  PresentationChart,
  Zap,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { Textarea } from './ui/textarea';

export function PersonalizedLearning() {
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Calculus_Notes.pdf', type: 'PDF', size: '2.4 MB', status: 'processed' },
    { name: 'Physics_Presentation.pptx', type: 'PPTX', size: '5.1 MB', status: 'processing' },
    { name: 'History_Essay.docx', type: 'DOCX', size: '1.2 MB', status: 'processed' }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'ve analyzed your uploaded materials. What would you like to learn about today?' },
    { role: 'user', content: 'Can you explain the concept of derivatives from my calculus notes?' },
    { role: 'assistant', content: 'Based on your calculus notes, derivatives represent the rate of change of a function. Think of it as the slope of a curve at any given point...' }
  ]);

  const [currentMessage, setCurrentMessage] = useState('');

  const quizzes = [
    { id: 1, title: 'Calculus Fundamentals', questions: 15, completed: true, score: 87 },
    { id: 2, title: 'Physics Mechanics', questions: 20, completed: false, score: null },
    { id: 3, title: 'Historical Events', questions: 12, completed: true, score: 92 }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newFile = {
          name: file.name,
          type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          status: 'processing' as const
        };
        setUploadedFiles(prev => [...prev, newFile]);
        
        // Simulate processing
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => f.name === file.name ? { ...f, status: 'processed' } : f)
          );
        }, 3000);
      });
    }
  };

  const sendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages(prev => [...prev, { role: 'user', content: currentMessage }]);
      setCurrentMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'I understand your question. Let me analyze your materials and provide a comprehensive answer...' 
        }]);
      }, 1000);
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI-Powered Learning
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload your materials and interact with your personalized AI tutor
        </p>
      </div>

      <Tabs defaultValue="materials" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="quiz">Quizzes</TabsTrigger>
          <TabsTrigger value="mindmap">Mind Maps</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Upload className="w-6 h-6 text-purple-600" />
              <h3>Upload Learning Materials</h3>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.pptx,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <div className="space-y-2">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-base">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">
                    PDF, PPTX, DOCX, TXT files supported
                  </p>
                </div>
              </label>
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files to Upload
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Uploaded Materials</h3>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'processed' ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Processed
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Processing
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card className="p-6 h-96 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
              <h3>AI Learning Assistant</h3>
              <Badge className="bg-green-100 text-green-800 ml-auto">Online</Badge>
            </div>
            
            <div className="flex-1 overflow-auto space-y-3 mb-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Ask about your materials..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage} className="bg-purple-600 hover:bg-purple-700">
                <Zap className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3>Knowledge Assessment</h3>
              <Button className="ml-auto bg-purple-600 hover:bg-purple-700">
                Generate New Quiz
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="mb-2">{quiz.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {quiz.questions} questions
                  </p>
                  
                  {quiz.completed ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Score</span>
                        <span>{quiz.score}%</span>
                      </div>
                      <Progress value={quiz.score} className="h-2" />
                      <Button variant="outline" size="sm" className="w-full">
                        Review Answers
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      <Target className="w-4 h-4 mr-2" />
                      Start Quiz
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="mindmap" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileImage className="w-6 h-6 text-purple-600" />
              <h3>Interactive Mind Maps</h3>
              <Button className="ml-auto bg-purple-600 hover:bg-purple-700">
                Create Mind Map
              </Button>
            </div>
            
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Mind map visualization will appear here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Generated from your uploaded materials using AI
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}