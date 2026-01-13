'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  DollarSign,
  Clock,
  Calculator,
  AlertCircle,
  CheckCircle,
  Save,
  Send,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client: string;
  hourlyRate: number;
  status: 'active' | 'on-hold' | 'completed';
}

interface ChangeOrderFormData {
  projectId: string;
  title: string;
  description: string;
  estimatedHours: number;
  hourlyRate: number;
  benefit: string;
  notes: string;
}

interface ChangeOrderFormProps {
  initialData?: Partial<ChangeOrderFormData>;
  onSave?: (data: ChangeOrderFormData) => void;
  onPreview?: (data: ChangeOrderFormData) => void;
  isLoading?: boolean;
  className?: string;
}

// Mock projects data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Website Redesign',
    client: 'TechCorp Inc.',
    hourlyRate: 85,
    status: 'active',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    client: 'StartupXYZ',
    hourlyRate: 95,
    status: 'active',
  },
  {
    id: '3',
    name: 'Brand Identity Package',
    client: 'Creative Agency',
    hourlyRate: 75,
    status: 'completed',
  },
  {
    id: '4',
    name: 'Marketing Website',
    client: 'GrowthCo',
    hourlyRate: 80,
    status: 'active',
  },
];

export function ChangeOrderForm({
  initialData,
  onSave,
  onPreview,
  isLoading = false,
  className
}: ChangeOrderFormProps) {
  const [formData, setFormData] = useState<ChangeOrderFormData>({
    projectId: '',
    title: '',
    description: '',
    estimatedHours: 0,
    hourlyRate: 0,
    benefit: '',
    notes: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ChangeOrderFormData, string>>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (formData.projectId) {
      const project = mockProjects.find(p => p.id === formData.projectId);
      if (project) {
        setSelectedProject(project);
        setFormData(prev => ({ ...prev, hourlyRate: project.hourlyRate }));
      }
    }
  }, [formData.projectId]);

  const calculateTotal = () => {
    return formData.estimatedHours * formData.hourlyRate;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ChangeOrderFormData, string>> = {};

    if (!formData.projectId) newErrors.projectId = 'Please select a project';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.estimatedHours <= 0) newErrors.estimatedHours = 'Hours must be greater than 0';
    if (formData.hourlyRate <= 0) newErrors.hourlyRate = 'Rate must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ChangeOrderFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave?.(formData);
    }
  };

  const handlePreview = () => {
    if (validateForm()) {
      onPreview?.(formData);
    }
  };

  const isFormValid = () => {
    return formData.projectId &&
           formData.title.trim() &&
           formData.description.trim() &&
           formData.estimatedHours > 0 &&
           formData.hourlyRate > 0;
  };

  const activeProjects = mockProjects.filter(p => p.status === 'active');

  return (
    <Card className={`border-0 shadow-sm ${className}`}>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-blue-100">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg">Create Change Order</CardTitle>
            <CardDescription>
              Generate a professional change order for scope modifications
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Project Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Project *
          </label>
          <Select
            value={formData.projectId}
            onValueChange={(value) => handleInputChange('projectId', value)}
          >
            <SelectTrigger className={errors.projectId ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {activeProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{project.name}</span>
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge variant="secondary" className="text-xs">
                        {project.client}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {formatCurrency(project.hourlyRate)}/hr
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.projectId && (
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.projectId}
            </p>
          )}
        </div>

        {/* Project Info */}
        {selectedProject && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-900">{selectedProject.name}</h4>
                <p className="text-sm text-blue-700">{selectedProject.client}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-blue-900">
                  {formatCurrency(selectedProject.hourlyRate)}/hour
                </div>
                <Badge className="bg-green-100 text-green-700" variant="secondary">
                  Active Project
                </Badge>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Change Order Details */}
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Change Order Title *
            </label>
            <Input
              placeholder="e.g., Mobile App Development, Additional Features"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Scope Addition Description *
            </label>
            <Textarea
              placeholder="Describe the additional work, features, or changes being requested..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Time and Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Estimated Hours *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.estimatedHours || ''}
                  onChange={(e) => handleInputChange('estimatedHours', parseFloat(e.target.value) || 0)}
                  className={`pl-10 ${errors.estimatedHours ? 'border-red-500' : ''}`}
                  min="0"
                  step="0.5"
                />
              </div>
              {errors.estimatedHours && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.estimatedHours}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Hourly Rate *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.hourlyRate || ''}
                  onChange={(e) => handleInputChange('hourlyRate', parseFloat(e.target.value) || 0)}
                  className={`pl-10 ${errors.hourlyRate ? 'border-red-500' : ''}`}
                  min="0"
                />
              </div>
              {errors.hourlyRate && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.hourlyRate}
                </p>
              )}
            </div>
          </div>

          {/* Total Calculation */}
          {formData.estimatedHours > 0 && formData.hourlyRate > 0 && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Total Cost</span>
                </div>
                <div className="text-xl font-bold text-green-700">
                  {formatCurrency(calculateTotal())}
                </div>
              </div>
              <div className="text-sm text-green-700 mt-1">
                {formData.estimatedHours} hours × {formatCurrency(formData.hourlyRate)}/hour
              </div>
            </div>
          )}

          {/* Client Benefit */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Benefit to Client (Optional)
            </label>
            <Input
              placeholder="e.g., improve user experience, increase conversion rates"
              value={formData.benefit}
              onChange={(e) => handleInputChange('benefit', e.target.value)}
            />
            <p className="text-xs text-slate-500">
              This will be included in the email: "This will ensure [benefit]"
            </p>
          </div>

          {/* Internal Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Internal Notes (Optional)
            </label>
            <Textarea
              placeholder="Internal notes for your reference (won't be included in client email)..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={isLoading || !isFormValid()}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>

          <Button
            onClick={handlePreview}
            disabled={isLoading || !isFormValid()}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Preview & Send
          </Button>
        </div>

        {/* Form Status */}
        {isFormValid() ? (
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Ready to generate change order</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <AlertCircle className="h-4 w-4" />
            <span>Please complete all required fields</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}