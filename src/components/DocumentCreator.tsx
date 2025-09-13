import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { 
  FileText, 
  Sparkles, 
  Eye, 
  Download,
  Edit,
  Copy,
  Settings,
  BookOpen,
  FileEdit,
  FileCheck
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: React.ReactNode;
}

interface CreatedDocument {
  id: string;
  title: string;
  type: string;
  pages: number;
  createdAt: string;
  lastModified: string;
  status: 'draft' | 'completed';
  wordCount: number;
}

export function DocumentCreator() {
  const [documentTopic, setDocumentTopic] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [documentLength, setDocumentLength] = useState('medium');
  const [writingStyle, setWritingStyle] = useState('academic');

  const templates: DocumentTemplate[] = [
    {
      id: 'essay',
      name: 'Academic Essay',
      description: 'Structured academic paper with citations',
      type: 'essay',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: 'report',
      name: 'Research Report',
      description: 'Comprehensive research document',
      type: 'report',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 'summary',
      name: 'Study Summary',
      description: 'Concise summary of key concepts',
      type: 'summary',
      icon: <FileEdit className="w-6 h-6" />
    },
    {
      id: 'notes',
      name: 'Study Notes',
      description: 'Organized notes with bullet points',
      type: 'notes',
      icon: <Edit className="w-6 h-6" />
    },
    {
      id: 'outline',
      name: 'Topic Outline',
      description: 'Structured outline for any topic',
      type: 'outline',
      icon: <FileCheck className="w-6 h-6" />
    },
    {
      id: 'review',
      name: 'Literature Review',
      description: 'Academic literature review format',
      type: 'review',
      icon: <BookOpen className="w-6 h-6" />
    }
  ];

  const [documents] = useState<CreatedDocument[]>([
    {
      id: '1',
      title: 'Machine Learning Fundamentals Essay',
      type: 'Academic Essay',
      pages: 8,
      createdAt: '2024-01-14',
      lastModified: '2 hours ago',
      status: 'completed',
      wordCount: 2850
    },
    {
      id: '2',
      title: 'Quantum Physics Study Notes',
      type: 'Study Notes',
      pages: 12,
      createdAt: '2024-01-13',
      lastModified: '1 day ago',
      status: 'draft',
      wordCount: 1650
    },
    {
      id: '3',
      title: 'Data Structures Research Report',
      type: 'Research Report',
      pages: 15,
      createdAt: '2024-01-12',
      lastModified: '3 days ago',
      status: 'completed',
      wordCount: 4200
    }
  ]);

  const handleCreateDocument = () => {
    if (!documentTopic.trim() || !selectedTemplate) return;
    
    // Simulate AI generation
    console.log('Creating document:', {
      topic: documentTopic,
      template: selectedTemplate,
      length: documentLength,
      style: writingStyle
    });
    
    // Reset form
    setDocumentTopic('');
    setSelectedTemplate('');
  };

  return (
    <div className="h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-3xl bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Document Creator
        </h1>
        <p className="text-muted-foreground mt-1">
          Generate comprehensive study documents and reports with AI
        </p>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="library">My Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
                <h3>AI Document Generator</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="topic">Document Topic</Label>
                  <Textarea
                    id="topic"
                    value={documentTopic}
                    onChange={(e) => setDocumentTopic(e.target.value)}
                    placeholder="Enter your document topic or describe what you want to write about..."
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="length">Document Length</Label>
                    <Select value={documentLength} onValueChange={setDocumentLength}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (1-3 pages)</SelectItem>
                        <SelectItem value="medium">Medium (3-8 pages)</SelectItem>
                        <SelectItem value="long">Long (8+ pages)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="style">Writing Style</Label>
                    <Select value={writingStyle} onValueChange={setWritingStyle}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
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
                      Import from Video Summaries
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Select Document Type</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                      selectedTemplate === template.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-green-600">
                        {template.icon}
                      </div>
                      <div>
                        <h4 className="text-sm">{template.name}</h4>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
                onClick={handleCreateDocument}
                disabled={!documentTopic.trim() || !selectedTemplate}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Document
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
                <div className="w-full h-32 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-green-600">
                    {template.icon}
                  </div>
                </div>
                
                <h3 className="mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-3 h-3 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                    Use Template
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-green-600" />
              <h3>Document Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Citation Style</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Citation format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apa">APA Style</SelectItem>
                    <SelectItem value="mla">MLA Style</SelectItem>
                    <SelectItem value="chicago">Chicago Style</SelectItem>
                    <SelectItem value="harvard">Harvard Style</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Font Style</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="times">Times New Roman</SelectItem>
                    <SelectItem value="arial">Arial</SelectItem>
                    <SelectItem value="calibri">Calibri</SelectItem>
                    <SelectItem value="georgia">Georgia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Export Format</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="docx">Microsoft Word (.docx)</SelectItem>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="txt">Plain Text (.txt)</SelectItem>
                    <SelectItem value="rtf">Rich Text Format (.rtf)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <div className="space-y-4">
            {documents.map((document) => (
              <Card key={document.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="mb-1">{document.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{document.pages} pages</span>
                        <span>{document.wordCount} words</span>
                        <span>{document.type}</span>
                        <span>Modified {document.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={
                      document.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }>
                      {document.status}
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
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Download className="w-3 h-3 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {documents.length === 0 && (
            <Card className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg mb-2">No documents yet</h3>
              <p className="text-muted-foreground">
                Create your first AI-generated document to get started
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}