import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { 
  Presentation, 
  Sparkles, 
  Eye, 
  Download,
  Edit,
  Copy,
  Settings,
  Play,
  Palette,
  Layout,
  Type
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PresentationTemplate {
  id: string;
  name: string;
  description: string;
  color: string;
  preview: string;
}

interface CreatedPresentation {
  id: string;
  title: string;
  slides: number;
  template: string;
  createdAt: string;
  lastModified: string;
  status: 'draft' | 'completed';
}

export function PresentationCreator() {
  const [presentationTopic, setPresentationTopic] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [presentationLength, setPresentationLength] = useState('medium');
  const [audienceLevel, setAudienceLevel] = useState('general');

  const templates: PresentationTemplate[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and minimalist design',
      color: 'blue',
      preview: 'gradient-to-br from-blue-500 to-blue-600'
    },
    {
      id: 'academic',
      name: 'Academic',
      description: 'Professional academic style',
      color: 'purple',
      preview: 'gradient-to-br from-purple-500 to-purple-600'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Vibrant and artistic design',
      color: 'pink',
      preview: 'gradient-to-br from-pink-500 to-pink-600'
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Corporate and professional',
      color: 'gray',
      preview: 'gradient-to-br from-gray-500 to-gray-600'
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Technical and data-focused',
      color: 'green',
      preview: 'gradient-to-br from-green-500 to-green-600'
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Learning-focused design',
      color: 'orange',
      preview: 'gradient-to-br from-orange-500 to-orange-600'
    }
  ];

  const [presentations] = useState<CreatedPresentation[]>([
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      slides: 24,
      template: 'Academic',
      createdAt: '2024-01-14',
      lastModified: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Quantum Physics Fundamentals',
      slides: 18,
      template: 'Science',
      createdAt: '2024-01-13',
      lastModified: '1 day ago',
      status: 'draft'
    },
    {
      id: '3',
      title: 'Data Structures Overview',
      slides: 32,
      template: 'Modern',
      createdAt: '2024-01-12',
      lastModified: '3 days ago',
      status: 'completed'
    }
  ]);

  const handleCreatePresentation = () => {
    if (!presentationTopic.trim() || !selectedTemplate) return;
    
    // Simulate AI generation
    console.log('Creating presentation:', {
      topic: presentationTopic,
      template: selectedTemplate,
      length: presentationLength,
      audience: audienceLevel
    });
    
    // Reset form
    setPresentationTopic('');
    setSelectedTemplate('');
  };

  return (
    <div className="h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Presentation Creator
        </h1>
        <p className="text-muted-foreground mt-1">
          Generate beautiful presentations from your content using AI
        </p>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="library">My Presentations</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-orange-600" />
                <h3>AI Presentation Generator</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="topic">Presentation Topic</Label>
                  <Textarea
                    id="topic"
                    value={presentationTopic}
                    onChange={(e) => setPresentationTopic(e.target.value)}
                    placeholder="Enter your presentation topic or describe what you want to present..."
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="length">Presentation Length</Label>
                    <Select value={presentationLength} onValueChange={setPresentationLength}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (5-10 slides)</SelectItem>
                        <SelectItem value="medium">Medium (10-20 slides)</SelectItem>
                        <SelectItem value="long">Long (20+ slides)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="audience">Audience Level</Label>
                    <Select value={audienceLevel} onValueChange={setAudienceLevel}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>Content Source (Optional)</Label>
                  <div className="mt-2 space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Copy className="w-4 h-4 mr-2" />
                      Import from Personalized Learning
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Copy className="w-4 h-4 mr-2" />
                      Import from Documents
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Select Template</h3>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                      selectedTemplate === template.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className={`w-full h-16 bg-${template.preview} rounded-md mb-2`}></div>
                    <h4 className="text-sm">{template.name}</h4>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                onClick={handleCreatePresentation}
                disabled={!presentationTopic.trim() || !selectedTemplate}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Presentation
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
                <div className={`w-full h-32 bg-${template.preview} rounded-lg mb-4 flex items-center justify-center`}>
                  <Presentation className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-3 h-3 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Use Template
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-orange-600" />
              <h3>Customize Templates</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Color Scheme</Label>
                <div className="flex gap-2 mt-2">
                  <div className="w-8 h-8 bg-blue-500 rounded cursor-pointer"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded cursor-pointer"></div>
                  <div className="w-8 h-8 bg-green-500 rounded cursor-pointer"></div>
                  <div className="w-8 h-8 bg-orange-500 rounded cursor-pointer"></div>
                </div>
              </div>
              
              <div>
                <Label>Typography</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Font style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern Sans</SelectItem>
                    <SelectItem value="classic">Classic Serif</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Layout Style</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="content-heavy">Content Heavy</SelectItem>
                    <SelectItem value="visual">Visual Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <div className="space-y-4">
            {presentations.map((presentation) => (
              <Card key={presentation.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <Presentation className="w-6 h-6 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="mb-1">{presentation.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{presentation.slides} slides</span>
                        <span>{presentation.template} template</span>
                        <span>Modified {presentation.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={
                      presentation.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }>
                      {presentation.status}
                    </Badge>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3 mr-2" />
                        Present
                      </Button>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Download className="w-3 h-3 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {presentations.length === 0 && (
            <Card className="p-12 text-center">
              <Presentation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg mb-2">No presentations yet</h3>
              <p className="text-muted-foreground">
                Create your first AI-generated presentation to get started
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}