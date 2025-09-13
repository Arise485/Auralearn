import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target,
  Brain,
  BookOpen,
  Award,
  Calendar,
  Activity,
  Zap,
  RotateCcw,
  FileText
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30days');

  const studyTimeData = [
    { date: 'Jan 1', hours: 2.5, efficiency: 85 },
    { date: 'Jan 2', hours: 3.2, efficiency: 78 },
    { date: 'Jan 3', hours: 1.8, efficiency: 92 },
    { date: 'Jan 4', hours: 4.1, efficiency: 88 },
    { date: 'Jan 5', hours: 2.9, efficiency: 91 },
    { date: 'Jan 6', hours: 3.5, efficiency: 83 },
    { date: 'Jan 7', hours: 2.2, efficiency: 89 }
  ];

  const quizScoresData = [
    { subject: 'Math', score: 87, attempts: 15 },
    { subject: 'Physics', score: 92, attempts: 12 },
    { subject: 'CS', score: 78, attempts: 18 },
    { subject: 'Chemistry', score: 85, attempts: 10 },
    { subject: 'Biology', score: 91, attempts: 8 }
  ];

  const learningProgressData = [
    { week: 'Week 1', completed: 12, planned: 15 },
    { week: 'Week 2', completed: 18, planned: 20 },
    { week: 'Week 3', completed: 14, planned: 16 },
    { week: 'Week 4', completed: 22, planned: 25 }
  ];

  const subjectDistribution = [
    { name: 'Mathematics', value: 35, color: '#8884d8' },
    { name: 'Physics', value: 25, color: '#82ca9d' },
    { name: 'Computer Science', value: 30, color: '#ffc658' },
    { name: 'Chemistry', value: 10, color: '#ff7300' }
  ];

  const stats = [
    {
      title: 'Total Study Time',
      value: '127.5h',
      change: '+12%',
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Learning Efficiency',
      value: '87.2%',
      change: '+5%',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Quiz Average',
      value: '86.6%',
      change: '+3%',
      icon: Target,
      color: 'purple'
    },
    {
      title: 'Topics Mastered',
      value: '42',
      change: '+8',
      icon: Brain,
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      type: 'quiz',
      subject: 'Mathematics',
      action: 'Completed Calculus Quiz',
      score: '92%',
      time: '2 hours ago'
    },
    {
      type: 'study',
      subject: 'Physics',
      action: 'Studied Quantum Mechanics',
      duration: '1.5h',
      time: '5 hours ago'
    },
    {
      type: 'review',
      subject: 'Computer Science',
      action: 'Reviewed Data Structures',
      efficiency: '89%',
      time: '1 day ago'
    },
    {
      type: 'document',
      subject: 'Chemistry',
      action: 'Created Study Notes',
      pages: '8 pages',
      time: '2 days ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'study': return <BookOpen className="w-4 h-4" />;
      case 'review': return <RotateCcw className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Learning Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your progress and optimize your learning journey
          </p>
        </div>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 3 months</SelectItem>
            <SelectItem value="1year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 bg-gradient-to-r ${getStatColor(stat.color)} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Study Time & Efficiency</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={studyTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="hours" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="efficiency" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Learning Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={learningProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#8884d8" />
                  <Bar dataKey="planned" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 lg:col-span-2">
              <h3 className="mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-purple-600">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.subject} • {activity.time}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        {activity.score || activity.duration || activity.efficiency || activity.pages}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Subject Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {subjectDistribution.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: subject.color }}></div>
                      <span>{subject.name}</span>
                    </div>
                    <span>{subject.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-4">Quiz Performance by Subject</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={quizScoresData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <h3>Best Performance</h3>
              </div>
              <div className="text-2xl mb-1">Physics</div>
              <p className="text-sm text-muted-foreground">92% average score</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3>Most Improved</h3>
              </div>
              <div className="text-2xl mb-1">Computer Science</div>
              <p className="text-sm text-muted-foreground">+15% this month</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h3>Focus Area</h3>
              </div>
              <div className="text-2xl mb-1">Mathematics</div>
              <p className="text-sm text-muted-foreground">Needs attention</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizScoresData.map((subject, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3>{subject.subject}</h3>
                  <Badge className="bg-blue-100 text-blue-800">
                    {subject.score}% avg
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Quiz Average</span>
                    <span>{subject.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Total Attempts</span>
                    <span>{subject.attempts}</span>
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full">
                    View Detailed Analytics
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-4">Detailed Activity Log</h3>
            <div className="space-y-4">
              {recentActivities.concat(recentActivities).map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-purple-600">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm">{activity.action}</h4>
                    <p className="text-xs text-muted-foreground">{activity.subject}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm">
                      {activity.score || activity.duration || activity.efficiency || activity.pages}
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}