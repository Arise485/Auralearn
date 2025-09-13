'use client';

import { useState } from "react";
import Link from "next/link";
import { Brain, Upload, FileText, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";

interface UploadedFile {
  id: string;
  filename: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      filename: file.name,
      size: file.size,
      status: 'uploading' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process
    for (const newFile of newFiles) {
      try {
        const formData = new FormData();
        const actualFile = Array.from(fileList).find(f => f.name === newFile.filename);
        if (actualFile) {
          formData.append('file', actualFile);
          
          // Mock API call - replace with actual backend call
          const response = await fetch('http://localhost:8000/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            setFiles(prev => prev.map(f => 
              f.id === newFile.id ? { ...f, status: 'success' as const } : f
            ));
          } else {
            throw new Error('Upload failed');
          }
        }
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === newFile.id ? { ...f, status: 'error' as const } : f
        ));
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
              <h1 className="text-2xl font-bold text-gray-900">Auralearn</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <Upload className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Study Materials</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your documents, videos, notes, and other learning materials. 
            Our AI will analyze them and help create personalized study plans.
          </p>
        </div>

        {/* Upload Area */}
        <div 
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-300 bg-white hover:border-indigo-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-gray-600 mb-4">
            Supports PDF, DOC, TXT, MP4, and other common formats
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".pdf,.doc,.docx,.txt,.mp4,.mp3,.ppt,.pptx"
          />
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            <Upload className="mr-2 h-5 w-5" />
            Select Files
          </button>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h3>
            <div className="bg-white rounded-lg shadow-sm border">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{file.filename}</p>
                      <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'uploading' && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                    )}
                    {file.status === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-sm text-gray-600 capitalize">{file.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        {files.some(f => f.status === 'success') && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-green-900">Files Uploaded Successfully!</h3>
            </div>
            <p className="text-green-700 mb-4">
              Your study materials have been uploaded and analyzed. What would you like to do next?
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/chat"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Start AI Chat
              </Link>
              <Link 
                href="/study-plans"
                className="inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 transition-colors"
              >
                Create Study Plan
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}