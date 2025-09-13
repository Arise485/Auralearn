import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Video, 
  Youtube, 
  Instagram, 
  Play, 
  Download,
  Clock,
  FileText,
  Headphones,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface VideoSummary {
  id: string;
  url: string;
  title: string;
  duration: string;
  platform: 'youtube' | 'instagram';
  status: 'processing' | 'completed' | 'error';
  progress: number;
  summary?: string;
  keyPoints?: string[];
  transcript?: string;
  thumbnail?: string;
}

export function VideoSummarizer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [summaries, setSummaries] = useState<VideoSummary[]>([
    {
      id: '1',
      url: 'https://youtube.com/watch?v=example1',
      title: 'Introduction to Machine Learning',
      duration: '15:32',
      platform: 'youtube',
      status: 'completed',
      progress: 100,
      summary: 'This video covers the fundamental concepts of machine learning, including supervised and unsupervised learning, common algorithms, and real-world applications. The presenter explains how ML algorithms learn from data to make predictions or decisions.',
      keyPoints: [
        'Machine learning is a subset of artificial intelligence',
        'Two main types: supervised and unsupervised learning',
        'Common algorithms include linear regression, decision trees, and neural networks',
        'Applications include recommendation systems, image recognition, and natural language processing'
      ],
      transcript: 'Welcome to this introduction to machine learning. Today we\'ll explore the fundamental concepts...'
    },
    {
      id: '2',
      url: 'https://instagram.com/reel/example2',
      title: 'Quick Physics Experiment',
      duration: '0:45',
      platform: 'instagram',
      status: 'processing',
      progress: 65,
    }
  ]);

  const handleVideoSubmit = () => {
    if (!videoUrl.trim()) return;

    const platform = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') 
      ? 'youtube' 
      : videoUrl.includes('instagram.com') 
      ? 'instagram' 
      : 'youtube';

    const newSummary: VideoSummary = {
      id: Date.now().toString(),
      url: videoUrl,
      title: 'Processing video...',
      duration: '--:--',
      platform,
      status: 'processing',
      progress: 0
    };

    setSummaries(prev => [newSummary, ...prev]);
    setVideoUrl('');

    // Simulate processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        clearInterval(interval);
        setSummaries(prev => 
          prev.map(s => s.id === newSummary.id ? {
            ...s,
            status: 'completed',
            progress: 100,
            title: 'New Video Analysis Complete',
            duration: '12:45',
            summary: 'AI-generated summary of the video content with key insights and takeaways.',
            keyPoints: [
              'Key concept 1 from the video',
              'Important insight discussed',
              'Main conclusion or learning objective'
            ]
          } : s)
        );
      } else {
        setSummaries(prev => 
          prev.map(s => s.id === newSummary.id ? { ...s, progress } : s)
        );
      }
    }, 1000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-600" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-600" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: VideoSummary['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-3xl bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Video Summarizer
        </h1>
        <p className="text-muted-foreground mt-1">
          Extract key insights from YouTube and Instagram videos
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Video className="w-6 h-6 text-red-600" />
          <h3>Add Video URL</h3>
        </div>
        
        <div className="flex gap-3">
          <Input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste YouTube or Instagram video URL..."
            className="flex-1"
          />
          <Button 
            onClick={handleVideoSubmit}
            disabled={!videoUrl.trim()}
            className="bg-red-600 hover:bg-red-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            Analyze
          </Button>
        </div>
        
        <div className="flex gap-2 mt-3">
          <Badge variant="outline" className="text-xs">
            <Youtube className="w-3 h-3 mr-1" />
            YouTube
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Instagram className="w-3 h-3 mr-1" />
            Instagram
          </Badge>
        </div>
      </Card>

      <div className="space-y-4">
        {summaries.map((summary) => (
          <Card key={summary.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getPlatformIcon(summary.platform)}
                <div>
                  <h3 className="line-clamp-1">{summary.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Duration: {summary.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(summary.status)}
                <Badge className={
                  summary.status === 'completed' ? 'bg-green-100 text-green-800' :
                  summary.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }>
                  {summary.status}
                </Badge>
              </div>
            </div>

            {summary.status === 'processing' && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Processing video...</span>
                  <span>{Math.round(summary.progress)}%</span>
                </div>
                <Progress value={summary.progress} className="h-2" />
              </div>
            )}

            {summary.status === 'completed' && (
              <Tabs defaultValue="summary" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="keypoints">Key Points</TabsTrigger>
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="mt-4">
                  <div className="space-y-3">
                    <h4>AI Summary</h4>
                    <p className="text-sm text-muted-foreground bg-gray-50 p-4 rounded-lg">
                      {summary.summary}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-2" />
                        Export Summary
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-3 h-3 mr-2" />
                        Create Notes
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="keypoints" className="mt-4">
                  <div className="space-y-3">
                    <h4>Key Points</h4>
                    <ul className="space-y-2">
                      {summary.keyPoints?.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <Button size="sm" variant="outline" className="mt-3">
                      <Download className="w-3 h-3 mr-2" />
                      Export Key Points
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="transcript" className="mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4>Full Transcript</h4>
                      <Button size="sm" variant="outline">
                        <Headphones className="w-3 h-3 mr-2" />
                        Play Audio
                      </Button>
                    </div>
                    <Textarea
                      value={summary.transcript || 'Transcript will appear here...'}
                      readOnly
                      className="min-h-32 text-sm"
                    />
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-2" />
                      Download Transcript
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {summary.status === 'error' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  Failed to process video. Please check the URL and try again.
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  Retry
                </Button>
              </div>
            )}
          </Card>
        ))}

        {summaries.length === 0 && (
          <Card className="p-12 text-center">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg mb-2">No videos analyzed yet</h3>
            <p className="text-muted-foreground">
              Add a YouTube or Instagram video URL above to get started
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}