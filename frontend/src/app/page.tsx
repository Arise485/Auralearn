'use client';

import Link from "next/link";
import { BookOpen, Brain, Calendar, Upload, MessageCircle, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Auralearn</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/upload" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Upload Materials
              </Link>
              <Link href="/chat" className="text-gray-600 hover:text-indigo-600 transition-colors">
                AI Tutor
              </Link>
              <Link href="/study-plans" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Study Plans
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Personalized Learning
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your study materials, interact with an AI tutor, create structured study plans, 
            and access powerful productivity tools - all in one unified digital workspace.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Link href="/upload" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group-hover:scale-105 transform duration-200">
              <div className="flex items-center mb-4">
                <Upload className="h-8 w-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Upload Materials</h3>
              </div>
              <p className="text-gray-600">
                Upload your study materials, videos, documents, and notes. 
                Our AI will analyze and help you organize your learning content.
              </p>
            </div>
          </Link>

          <Link href="/chat" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group-hover:scale-105 transform duration-200">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">AI Tutor</h3>
              </div>
              <p className="text-gray-600">
                Chat with your personal AI tutor for explanations, practice questions, 
                and personalized learning guidance based on your materials.
              </p>
            </div>
          </Link>

          <Link href="/study-plans" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group-hover:scale-105 transform duration-200">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Study Plans</h3>
              </div>
              <p className="text-gray-600">
                Create and manage structured study plans tailored to your learning goals 
                and schedule for optimal progress tracking.
              </p>
            </div>
          </Link>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-orange-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Smart Notes</h3>
            </div>
            <p className="text-gray-600">
              Automatically generated notes and summaries from your uploaded materials 
              with key concepts highlighted and organized.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-red-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Practice Quizzes</h3>
            </div>
            <p className="text-gray-600">
              AI-generated practice questions and quizzes based on your study materials 
              to test your understanding and retention.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Brain className="h-8 w-8 text-teal-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Analytics</h3>
            </div>
            <p className="text-gray-600">
              Track your learning progress, identify strengths and weaknesses, 
              and get insights to optimize your study habits.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link 
            href="/upload"
            className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <Upload className="mr-2 h-5 w-5" />
            Start Learning Today
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Auralearn. Revolutionizing personalized learning with AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
