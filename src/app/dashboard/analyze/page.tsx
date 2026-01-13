'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { UploadZone } from '@/components/analyzer/upload-zone';
import { ScopeResults } from '@/components/analyzer/scope-results';
import { ScopeItem } from '@/components/analyzer/scope-item';
import {
  Brain,
  FileText,
  Type,
  Loader,
  CheckCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

// Mock data for demonstration
const mockAnalysisResult = {
  projectName: 'E-commerce Website Analysis',
  analysisDate: new Date(),
  confidence: 87,
  totalItems: 12,
  inScopeItems: 8,
  outOfScopeItems: 3,
  unclearItems: 1,
  estimatedTotalHours: 320,
  estimatedTotalCost: 24000,
  items: [
    {
      id: '1',
      title: 'User Authentication System',
      description: 'Implement login, registration, and password recovery functionality',
      category: 'feature' as const,
      status: 'in-scope' as const,
      confidence: 'high' as const,
      estimatedHours: 40,
      estimatedCost: 3200,
      priority: 'high' as const,
      notes: 'Clearly defined in requirements document',
    },
    {
      id: '2',
      title: 'Payment Gateway Integration',
      description: 'Integrate Stripe payment processing with multiple payment methods',
      category: 'feature' as const,
      status: 'in-scope' as const,
      confidence: 'high' as const,
      estimatedHours: 60,
      estimatedCost: 4800,
      priority: 'high' as const,
    },
    {
      id: '3',
      title: 'Advanced Analytics Dashboard',
      description: 'Real-time analytics with custom reporting and data visualization',
      category: 'feature' as const,
      status: 'out-of-scope' as const,
      confidence: 'medium' as const,
      estimatedHours: 80,
      estimatedCost: 6400,
      priority: 'medium' as const,
      notes: 'Not mentioned in original scope, likely additional request',
    },
    {
      id: '4',
      title: 'Mobile App Development',
      description: 'Native iOS and Android applications',
      category: 'deliverable' as const,
      status: 'out-of-scope' as const,
      confidence: 'high' as const,
      estimatedHours: 200,
      estimatedCost: 16000,
      priority: 'low' as const,
      notes: 'Clearly beyond original web development scope',
    },
    {
      id: '5',
      title: 'SEO Optimization',
      description: 'Basic on-page SEO implementation and meta tags',
      category: 'feature' as const,
      status: 'unclear' as const,
      confidence: 'low' as const,
      estimatedHours: 20,
      estimatedCost: 1600,
      priority: 'medium' as const,
      notes: 'Mentioned briefly, needs clarification',
    },
    {
      id: '6',
      title: 'Product Catalog Management',
      description: 'CRUD operations for products, categories, and inventory',
      category: 'feature' as const,
      status: 'in-scope' as const,
      confidence: 'high' as const,
      estimatedHours: 50,
      estimatedCost: 4000,
      priority: 'high' as const,
    },
    {
      id: '7',
      title: 'Shopping Cart & Checkout',
      description: 'Add to cart functionality and checkout process',
      category: 'feature' as const,
      status: 'in-scope' as const,
      confidence: 'high' as const,
      estimatedHours: 45,
      estimatedCost: 3600,
      priority: 'high' as const,
    },
    {
      id: '8',
      title: 'Admin Panel',
      description: 'Backend administration interface for content management',
      category: 'deliverable' as const,
      status: 'in-scope' as const,
      confidence: 'high' as const,
      estimatedHours: 35,
      estimatedCost: 2800,
      priority: 'medium' as const,
    },
  ] as ScopeItem[],
};

type AnalysisStep = 'upload' | 'analyzing' | 'results';

export default function AnalyzePage() {
  const [currentStep, setCurrentStep] = useState<AnalysisStep>('upload');
  const [textContent, setTextContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(mockAnalysisResult);

  const canAnalyze = textContent.trim().length > 0 || uploadedFiles.length > 0;

  const handleAnalyze = async () => {
    setCurrentStep('analyzing');
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setCurrentStep('results');
          }, 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 300);
  };

  const handleSaveProject = (result: typeof mockAnalysisResult) => {
    console.log('Saving project:', result);
    // Here you would typically save to your backend
  };

  const handleItemEdit = (item: ScopeItem) => {
    console.log('Editing item:', item);
    // Here you would open an edit dialog
  };

  const handleItemDelete = (id: string) => {
    setAnalysisResult(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const handleItemStatusChange = (id: string, status: ScopeItem['status']) => {
    setAnalysisResult(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, status } : item
      ),
    }));
  };

  const resetAnalysis = () => {
    setCurrentStep('upload');
    setAnalysisProgress(0);
    setTextContent('');
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Scope Analyzer</h1>
        <p className="text-slate-500">
          Upload documents or paste text to analyze project scope with AI
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center space-x-4">
        <div className={`flex items-center space-x-2 ${
          currentStep === 'upload' ? 'text-blue-600' : 'text-slate-400'
        }`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            currentStep !== 'upload' ? 'bg-blue-600 border-blue-600 text-white' : 'border-blue-600'
          }`}>
            {currentStep !== 'upload' ? <CheckCircle className="h-4 w-4" /> : '1'}
          </div>
          <span className="font-medium">Upload</span>
        </div>

        <div className="flex-1 h-px bg-slate-200"></div>

        <div className={`flex items-center space-x-2 ${
          currentStep === 'analyzing' ? 'text-blue-600' :
          currentStep === 'results' ? 'text-green-600' : 'text-slate-400'
        }`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            currentStep === 'results' ? 'bg-green-600 border-green-600 text-white' :
            currentStep === 'analyzing' ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
          }`}>
            {currentStep === 'results' ? <CheckCircle className="h-4 w-4" /> :
             currentStep === 'analyzing' ? <Loader className="h-4 w-4 animate-spin" /> : '2'}
          </div>
          <span className="font-medium">Analyze</span>
        </div>

        <div className="flex-1 h-px bg-slate-200"></div>

        <div className={`flex items-center space-x-2 ${
          currentStep === 'results' ? 'text-green-600' : 'text-slate-400'
        }`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            currentStep === 'results' ? 'bg-green-600 border-green-600 text-white' : 'border-slate-300'
          }`}>
            {currentStep === 'results' ? <CheckCircle className="h-4 w-4" /> : '3'}
          </div>
          <span className="font-medium">Results</span>
        </div>
      </div>

      {/* Upload Step */}
      {currentStep === 'upload' && (
        <div className="grid gap-8 lg:grid-cols-2">
          {/* File Upload */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Upload Documents</CardTitle>
              </div>
              <CardDescription>
                Upload contracts, proposals, or scope documents for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadZone
                onFilesUploaded={setUploadedFiles}
                maxFiles={5}
                maxSize={10}
              />
            </CardContent>
          </Card>

          {/* Text Input */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Type className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Paste Text Content</CardTitle>
              </div>
              <CardDescription>
                Copy and paste scope documents, emails, or requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your project scope, requirements, or communication here..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
                <span>{textContent.length} characters</span>
                <span>Supports plain text, markdown, and email threads</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analyzing Step */}
      {currentStep === 'analyzing' && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="p-4 rounded-full bg-blue-100 w-16 h-16 mx-auto flex items-center justify-center">
                <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Analyzing Your Scope
                </h3>
                <p className="text-slate-500">
                  Our AI is processing your documents to identify scope elements...
                </p>
              </div>

              <div className="space-y-2">
                <Progress value={analysisProgress} className="h-3" />
                <div className="text-sm text-slate-500">
                  {Math.round(analysisProgress)}% complete
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto text-xs">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Sparkles className="h-4 w-4" />
                  <span>Extracting features</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Classifying scope</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Detecting risks</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Step */}
      {currentStep === 'results' && (
        <ScopeResults
          result={analysisResult}
          onSaveProject={handleSaveProject}
          onItemEdit={handleItemEdit}
          onItemDelete={handleItemDelete}
          onItemStatusChange={handleItemStatusChange}
        />
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div>
          {currentStep === 'results' && (
            <Button
              variant="outline"
              onClick={resetAnalysis}
            >
              Analyze New Scope
            </Button>
          )}
        </div>

        <div className="flex space-x-4">
          {currentStep === 'upload' && (
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Brain className="h-4 w-4 mr-2" />
              Analyze Scope
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}