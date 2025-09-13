import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Plus, 
  BookOpen, 
  Edit, 
  Trash2, 
  FileText, 
  Video, 
  Calendar,
  MoreVertical
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Subject {
  id: string;
  name: string;
  description: string;
  color: string;
  progress: number;
  materialsCount: number;
  notesCount: number;
  lastActivity: string;
}

export function SubjectManager() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Mathematics',
      description: 'Calculus, Algebra, and Statistics',
      color: 'blue',
      progress: 75,
      materialsCount: 12,
      notesCount: 8,
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Physics',
      description: 'Mechanics, Thermodynamics, and Quantum',
      color: 'purple',
      progress: 60,
      materialsCount: 8,
      notesCount: 15,
      lastActivity: '1 day ago'
    },
    {
      id: '3',
      name: 'Computer Science',
      description: 'Algorithms, Data Structures, and Programming',
      color: 'green',
      progress: 90,
      materialsCount: 20,
      notesCount: 25,
      lastActivity: '30 minutes ago'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: '',
    description: '',
    color: 'blue'
  });

  const colors = [
    { value: 'blue', label: 'Blue', class: 'from-blue-500 to-blue-600' },
    { value: 'purple', label: 'Purple', class: 'from-purple-500 to-purple-600' },
    { value: 'green', label: 'Green', class: 'from-green-500 to-green-600' },
    { value: 'red', label: 'Red', class: 'from-red-500 to-red-600' },
    { value: 'orange', label: 'Orange', class: 'from-orange-500 to-orange-600' },
    { value: 'pink', label: 'Pink', class: 'from-pink-500 to-pink-600' },
  ];

  const handleCreateSubject = () => {
    if (newSubject.name.trim()) {
      const subject: Subject = {
        id: Date.now().toString(),
        name: newSubject.name,
        description: newSubject.description,
        color: newSubject.color,
        progress: 0,
        materialsCount: 0,
        notesCount: 0,
        lastActivity: 'Just created'
      };
      
      setSubjects([...subjects, subject]);
      setNewSubject({ name: '', description: '', color: 'blue' });
      setIsCreateDialogOpen(false);
    }
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const getColorClass = (color: string) => {
    const colorObj = colors.find(c => c.value === color);
    return colorObj?.class || 'from-blue-500 to-blue-600';
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            My Subjects
          </h1>
          <p className="text-muted-foreground mt-1">
            Organize your learning materials by subject
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Subject</DialogTitle>
              <DialogDescription>
                Add a new subject to organize your learning materials and track your progress.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject-name">Subject Name</Label>
                <Input
                  id="subject-name"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                  placeholder="e.g., Mathematics, Physics, History..."
                />
              </div>
              <div>
                <Label htmlFor="subject-description">Description</Label>
                <Textarea
                  id="subject-description"
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({...newSubject, description: e.target.value})}
                  placeholder="Brief description of what this subject covers..."
                />
              </div>
              <div>
                <Label htmlFor="subject-color">Color Theme</Label>
                <Select value={newSubject.color} onValueChange={(color) => setNewSubject({...newSubject, color})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded bg-gradient-to-r ${color.class}`}></div>
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateSubject} className="flex-1">
                  Create Subject
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.id} className="p-6 hover:shadow-lg transition-all duration-200 hover:scale-105">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getColorClass(subject.color)} rounded-xl flex items-center justify-center`}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <h3 className="mb-2">{subject.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{subject.description}</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${getColorClass(subject.color)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>{subject.materialsCount} materials</span>
                </div>
                <div className="flex items-center gap-1">
                  <Edit className="w-4 h-4" />
                  <span>{subject.notesCount} notes</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {subject.lastActivity}
                </Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    <Video className="w-3 h-3 mr-1" />
                    Study
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteSubject(subject.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}