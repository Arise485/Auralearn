import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Calendar as CalendarIcon,
  Clock,
  Target,
  Brain,
  CheckCircle,
  AlertCircle,
  Plus,
  RotateCcw,
  Settings,
  ExternalLink,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Textarea } from "./ui/textarea";

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  date: string;
  time: string;
  duration: number;
  type: "review" | "new" | "practice" | "exam";
  priority: "low" | "medium" | "high";
  completed: boolean;
  notes?: string;
}

interface SpacedRepetition {
  id: string;
  topic: string;
  subject: string;
  nextReview: string;
  interval: number;
  ease: number;
  reviews: number;
}

export function StudyPlanner() {
  const [selectedDate, setSelectedDate] = useState<
    Date | undefined
  >(new Date());
  const [studySessions, setStudySessions] = useState<
    StudySession[]
  >([
    {
      id: "1",
      subject: "Mathematics",
      topic: "Calculus Integration",
      date: "2024-01-15",
      time: "09:00",
      duration: 60,
      type: "review",
      priority: "high",
      completed: false,
    },
    {
      id: "2",
      subject: "Physics",
      topic: "Quantum Mechanics",
      date: "2024-01-15",
      time: "14:00",
      duration: 90,
      type: "new",
      priority: "medium",
      completed: true,
    },
    {
      id: "3",
      subject: "Computer Science",
      topic: "Algorithms Practice",
      date: "2024-01-16",
      time: "10:00",
      duration: 45,
      type: "practice",
      priority: "high",
      completed: false,
    },
  ]);

  const [spacedRepetitions] = useState<SpacedRepetition[]>([
    {
      id: "1",
      topic: "Linear Algebra Basics",
      subject: "Mathematics",
      nextReview: "2024-01-16",
      interval: 3,
      ease: 2.5,
      reviews: 4,
    },
    {
      id: "2",
      topic: "Newton's Laws",
      subject: "Physics",
      nextReview: "2024-01-17",
      interval: 7,
      ease: 2.8,
      reviews: 6,
    },
    {
      id: "3",
      topic: "Data Structures",
      subject: "Computer Science",
      nextReview: "2024-01-15",
      interval: 1,
      ease: 2.0,
      reviews: 2,
    },
  ]);

  const [newSession, setNewSession] = useState({
    subject: "",
    topic: "",
    date: "",
    time: "",
    duration: 60,
    type: "new" as const,
    priority: "medium" as const,
  });

  const [aiPlannerForm, setAiPlannerForm] = useState({
    learningGoals: "",
    studyTime: "",
    knowledgeLevel: "",
  });

  const [isGeneratingPlan, setIsGeneratingPlan] =
    useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<
    StudySession[]
  >([]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "review":
        return "bg-blue-100 text-blue-800";
      case "new":
        return "bg-green-100 text-green-800";
      case "practice":
        return "bg-orange-100 text-orange-800";
      case "exam":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const getIntervalText = (interval: number) => {
    if (interval === 1) return "Tomorrow";
    if (interval < 7) return `${interval} days`;
    if (interval < 30)
      return `${Math.round(interval / 7)} weeks`;
    return `${Math.round(interval / 30)} months`;
  };

  const todaySessions = studySessions.filter(
    (session) =>
      session.date === new Date().toISOString().split("T")[0],
  );

  const upcomingSessions = studySessions
    .filter((session) => new Date(session.date) > new Date())
    .slice(0, 5);

  const generateAIStudyPlan = async () => {
    if (
      !aiPlannerForm.learningGoals ||
      !aiPlannerForm.studyTime ||
      !aiPlannerForm.knowledgeLevel
    ) {
      alert(
        "Please fill in all fields to generate a study plan",
      );
      return;
    }

    setIsGeneratingPlan(true);

    // Simulate AI generation delay
    setTimeout(() => {
      const mockGeneratedSessions: StudySession[] = [
        {
          id: `gen-${Date.now()}-1`,
          subject: "Mathematics",
          topic: "Fundamentals Review",
          date: new Date(Date.now() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          time: "09:00",
          duration: parseInt(aiPlannerForm.studyTime),
          type: "new",
          priority: "high",
          completed: false,
          notes: `Generated based on ${aiPlannerForm.knowledgeLevel} level goals`,
        },
        {
          id: `gen-${Date.now()}-2`,
          subject: "Science",
          topic: "Core Concepts",
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          time: "10:00",
          duration: parseInt(aiPlannerForm.studyTime),
          type: "new",
          priority: "medium",
          completed: false,
          notes:
            "AI-generated study session based on your learning goals",
        },
        {
          id: `gen-${Date.now()}-3`,
          subject: "Review Session",
          topic: "Previous Topics Review",
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          time: "14:00",
          duration: Math.max(
            30,
            parseInt(aiPlannerForm.studyTime) - 30,
          ),
          type: "review",
          priority: "medium",
          completed: false,
          notes: "Spaced repetition review session",
        },
      ];

      setGeneratedPlan(mockGeneratedSessions);
      setStudySessions((prev) => [
        ...prev,
        ...mockGeneratedSessions,
      ]);
      setIsGeneratingPlan(false);

      // Reset form
      setAiPlannerForm({
        learningGoals: "",
        studyTime: "",
        knowledgeLevel: "",
      });
    }, 2000);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="mb-6">
        <h1 className="text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Study Planner
        </h1>
        <p className="text-muted-foreground mt-1">
          Optimize your learning with AI-powered scheduling and
          spaced repetition
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3>Today's Goals</h3>
          </div>
          <div className="text-2xl mb-1">
            {todaySessions.length}
          </div>
          <p className="text-sm text-muted-foreground">
            Study sessions planned
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3>Reviews Due</h3>
          </div>
          <div className="text-2xl mb-1">
            {
              spacedRepetitions.filter(
                (r) => new Date(r.nextReview) <= new Date(),
              ).length
            }
          </div>
          <p className="text-sm text-muted-foreground">
            Topics to review
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-green-600" />
            <h3>Study Time</h3>
          </div>
          <div className="text-2xl mb-1">
            {todaySessions.reduce(
              (acc, session) => acc + session.duration,
              0,
            )}
            m
          </div>
          <p className="text-sm text-muted-foreground">
            Planned for today
          </p>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="spaced">
            Spaced Repetition
          </TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="ai-planner">
            AI Planner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Today's Schedule</h3>
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Session
                </Button>
              </div>

              <div className="space-y-3">
                {todaySessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 border-l-4 ${getPriorityColor(session.priority)} bg-gray-50 rounded-r-lg`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm">
                          {session.topic}
                        </h4>
                        <Badge
                          className={getTypeColor(session.type)}
                        >
                          {session.type}
                        </Badge>
                      </div>
                      {session.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {session.subject} • {session.time} •{" "}
                      {session.duration}min
                    </div>
                  </div>
                ))}

                {todaySessions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No sessions scheduled for today
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm">
                        {session.topic}
                      </h4>
                      <Badge
                        className={getTypeColor(session.type)}
                      >
                        {session.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {session.subject} • {session.date}{" "}
                      {session.time}
                    </div>
                  </div>
                ))}

                {upcomingSessions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming sessions
                  </div>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spaced" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Spaced Repetition Schedule</h3>
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>

            <div className="space-y-3">
              {spacedRepetitions.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm">{item.topic}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.subject}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        {getIntervalText(item.interval)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.reviews} reviews
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        new Date(item.nextReview) <= new Date()
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {new Date(item.nextReview) <= new Date()
                        ? "Due now"
                        : `Due ${item.nextReview}`}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Study Calendar</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Calendar Integration</h3>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </div>

              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm mb-2">
                    Google Calendar
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Sync your study sessions with Google
                    Calendar
                  </p>
                  <Button size="sm" className="w-full">
                    Connect Google
                  </Button>
                </div>

                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm mb-2">
                    Notion Integration
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Export study plans to your Notion workspace
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    Connect Notion
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-planner" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3>AI Study Planner</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="learning-goals">
                  What do you want to learn?
                </Label>
                <Textarea
                  id="learning-goals"
                  placeholder="Describe your learning goals and subjects you want to focus on..."
                  className="mt-1"
                  value={aiPlannerForm.learningGoals}
                  onChange={(e) =>
                    setAiPlannerForm((prev) => ({
                      ...prev,
                      learningGoals: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="study-time">
                    Available study time per day
                  </Label>
                  <Select
                    value={aiPlannerForm.studyTime}
                    onValueChange={(value) =>
                      setAiPlannerForm((prev) => ({
                        ...prev,
                        studyTime: value,
                      }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">
                        30 minutes
                      </SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">
                        2 hours
                      </SelectItem>
                      <SelectItem value="180">
                        3+ hours
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">
                    Current knowledge level
                  </Label>
                  <Select
                    value={aiPlannerForm.knowledgeLevel}
                    onValueChange={(value) =>
                      setAiPlannerForm((prev) => ({
                        ...prev,
                        knowledgeLevel: value,
                      }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">
                        Beginner
                      </SelectItem>
                      <SelectItem value="intermediate">
                        Intermediate
                      </SelectItem>
                      <SelectItem value="advanced">
                        Advanced
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={generateAIStudyPlan}
                disabled={isGeneratingPlan}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              >
                <Brain className="w-4 h-4 mr-2" />
                {isGeneratingPlan
                  ? "Generating Plan..."
                  : "Generate AI Study Plan"}
              </Button>

              {generatedPlan.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="text-green-800 dark:text-green-200">
                      AI Study Plan Generated!
                    </h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                    Your personalized study plan has been
                    created and added to your schedule. Check
                    the Schedule tab to see your new sessions.
                  </p>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    Generated {generatedPlan.length} study
                    sessions based on your preferences.
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}