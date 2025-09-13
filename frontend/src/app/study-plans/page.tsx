'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Brain, Plus, Calendar, Edit, Trash2, CheckCircle, ArrowLeft, Clock, BookOpen } from "lucide-react";

interface StudyPlan {
  id: string;
  title: string;
  description: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export default function StudyPlansPage() {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topics, setTopics] = useState<string[]>(['']);

  useEffect(() => {
    fetchStudyPlans();
  }, []);

  const fetchStudyPlans = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/study-plans');
      if (response.ok) {
        const data = await response.json();
        setStudyPlans(data.study_plans || []);
      }
    } catch (error) {
      console.error('Error fetching study plans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const newPlan = {
      title: title.trim(),
      description: description.trim(),
      topics: topics.filter(topic => topic.trim() !== ''),
    };

    try {
      const response = await fetch('http://localhost:8000/api/study-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlan),
      });

      if (response.ok) {
        await fetchStudyPlans();
        resetForm();
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error creating study plan:', error);
    }
  };

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingPlan || !title.trim()) return;

    const updatedPlan = {
      ...editingPlan,
      title: title.trim(),
      description: description.trim(),
      topics: topics.filter(topic => topic.trim() !== ''),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/study-plans/${editingPlan.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlan),
      });

      if (response.ok) {
        await fetchStudyPlans();
        resetForm();
        setEditingPlan(null);
      }
    } catch (error) {
      console.error('Error updating study plan:', error);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this study plan?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/study-plans/${planId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchStudyPlans();
      }
    } catch (error) {
      console.error('Error deleting study plan:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTopics(['']);
  };

  const handleEditPlan = (plan: StudyPlan) => {
    setEditingPlan(plan);
    setTitle(plan.title);
    setDescription(plan.description);
    setTopics(plan.topics.length > 0 ? plan.topics : ['']);
  };

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const addTopic = () => {
    setTopics([...topics, '']);
  };

  const removeTopic = (index: number) => {
    if (topics.length > 1) {
      setTopics(topics.filter((_, i) => i !== index));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const Modal = ({ isOpen, onClose, title, children }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <span className="text-gray-400">|</span>
              <Brain className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Study Plans</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Plan
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading study plans...</p>
          </div>
        ) : studyPlans.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Study Plans Yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first study plan to organize your learning journey.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Plan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {plan.title}
                    </h3>
                    <div className="flex space-x-1 ml-2">
                      <button
                        onClick={() => handleEditPlan(plan)}
                        className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {plan.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {plan.description}
                    </p>
                  )}

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Topics ({plan.topics.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {plan.topics.slice(0, 3).map((topic, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-md"
                        >
                          {topic}
                        </span>
                      ))}
                      {plan.topics.length > 3 && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                          +{plan.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    Created {formatDate(plan.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showCreateModal || editingPlan !== null}
        onClose={() => {
          setShowCreateModal(false);
          setEditingPlan(null);
          resetForm();
        }}
        title={editingPlan ? 'Edit Study Plan' : 'Create New Study Plan'}
      >
        <form onSubmit={editingPlan ? handleUpdatePlan : handleCreatePlan}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Plan Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Advanced JavaScript Concepts"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your study plan..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topics to Study
              </label>
              {topics.map((topic, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => handleTopicChange(index, e.target.value)}
                    placeholder={`Topic ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  {topics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTopic(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTopic}
                className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                + Add Topic
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={() => {
                setShowCreateModal(false);
                setEditingPlan(null);
                resetForm();
              }}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              {editingPlan ? 'Update Plan' : 'Create Plan'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}