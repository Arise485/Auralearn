import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Settings, 
  Download,
  Upload,
  Minimize2,
  RotateCcw,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Slider } from './ui/slider';

interface CompressionTask {
  id: string;
  fileName: string;
  originalSize: string;
  targetSize: string;
  currentSize: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export function ToolsSection() {
  const [compressionTasks, setCompressionTasks] = useState<CompressionTask[]>([]);
  const [targetSize, setTargetSize] = useState(50);
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const conversionFormats = {
    document: ['PDF', 'DOCX', 'TXT', 'RTF', 'ODT'],
    image: ['JPG', 'PNG', 'WEBP', 'GIF', 'SVG'],
    video: ['MP4', 'AVI', 'MOV', 'WMV', 'MKV']
  };

  const handleFileCompress = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const originalSizeMB = file.size / (1024 * 1024);
      const targetSizeMB = (originalSizeMB * targetSize) / 100;
      
      const task: CompressionTask = {
        id: Date.now().toString() + Math.random(),
        fileName: file.name,
        originalSize: `${originalSizeMB.toFixed(1)} MB`,
        targetSize: `${targetSizeMB.toFixed(1)} MB`,
        currentSize: `${originalSizeMB.toFixed(1)} MB`,
        progress: 0,
        status: 'pending'
      };

      setCompressionTasks(prev => [...prev, task]);

      // Simulate compression process
      setTimeout(() => {
        setCompressionTasks(prev => 
          prev.map(t => t.id === task.id ? { ...t, status: 'processing' } : t)
        );

        // Progress simulation
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress >= 100) {
            clearInterval(interval);
            setCompressionTasks(prev => 
              prev.map(t => t.id === task.id ? { 
                ...t, 
                progress: 100, 
                status: 'completed',
                currentSize: task.targetSize
              } : t)
            );
          } else {
            setCompressionTasks(prev => 
              prev.map(t => t.id === task.id ? { ...t, progress } : t)
            );
          }
        }, 500);
      }, 1000);
    });
  };

  const getStatusIcon = (status: CompressionTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error':
        return <RotateCcw className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: CompressionTask['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-3xl bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
          File Tools & Utilities
        </h1>
        <p className="text-muted-foreground mt-1">
          Convert, compress, and optimize your files
        </p>
      </div>

      <Tabs defaultValue="compress" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compress">Compress Files</TabsTrigger>
          <TabsTrigger value="convert">File Conversion</TabsTrigger>
          <TabsTrigger value="optimize">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="compress" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Minimize2 className="w-6 h-6 text-blue-600" />
              <h3>File Compression</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="target-size">Target Size ({targetSize}% of original)</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      value={[targetSize]}
                      onValueChange={(value) => setTargetSize(value[0])}
                      max={95}
                      min={10}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-16">{targetSize}%</span>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileCompress(e.target.files)}
                    className="hidden"
                    id="compress-upload"
                  />
                  <label htmlFor="compress-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <p>Drop files to compress</p>
                      <p className="text-sm text-muted-foreground">
                        Any file type supported
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <h4>Compression Queue</h4>
                {compressionTasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No files in compression queue
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-auto">
                    {compressionTasks.map((task) => (
                      <div key={task.id} className="p-3 border rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm truncate flex-1">{task.fileName}</span>
                          <Badge className={getStatusColor(task.status)}>
                            {getStatusIcon(task.status)}
                            <span className="ml-1 capitalize">{task.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          {task.originalSize} → {task.targetSize}
                        </div>
                        
                        {task.status === 'processing' && (
                          <Progress value={task.progress} className="h-2" />
                        )}
                        
                        {task.status === 'completed' && (
                          <Button size="sm" variant="outline" className="w-full">
                            <Download className="w-3 h-3 mr-2" />
                            Download ({task.currentSize})
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="convert" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-green-600" />
                <h3>Documents</h3>
              </div>
              
              <div className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Convert to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {conversionFormats.document.map(format => (
                      <SelectItem key={format} value={format.toLowerCase()}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                  <input type="file" className="hidden" id="doc-convert" accept=".pdf,.doc,.docx,.txt,.rtf" />
                  <label htmlFor="doc-convert" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm">Upload document</p>
                  </label>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Convert
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <ImageIcon className="w-6 h-6 text-blue-600" />
                <h3>Images</h3>
              </div>
              
              <div className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Convert to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {conversionFormats.image.map(format => (
                      <SelectItem key={format} value={format.toLowerCase()}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input type="file" className="hidden" id="img-convert" accept="image/*" />
                  <label htmlFor="img-convert" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm">Upload image</p>
                  </label>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Convert
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-6 h-6 text-purple-600" />
                <h3>Videos</h3>
              </div>
              
              <div className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Convert to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {conversionFormats.video.map(format => (
                      <SelectItem key={format} value={format.toLowerCase()}>
                        {format}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                  <input type="file" className="hidden" id="video-convert" accept="video/*" />
                  <label htmlFor="video-convert" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm">Upload video</p>
                  </label>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Convert
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimize" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-orange-600" />
              <h3>File Optimization</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4>Image Optimization</h4>
                <div className="space-y-2">
                  <Label>Quality: 85%</Label>
                  <Slider defaultValue={[85]} max={100} min={10} step={5} />
                </div>
                <div className="space-y-2">
                  <Label>Max Width: 1920px</Label>
                  <Input type="number" defaultValue="1920" />
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Optimize Images
                </Button>
              </div>
              
              <div className="space-y-4">
                <h4>PDF Optimization</h4>
                <div className="space-y-2">
                  <Label>Compression Level</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Better Quality)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="high">High (Smaller Size)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Optimize PDFs
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}