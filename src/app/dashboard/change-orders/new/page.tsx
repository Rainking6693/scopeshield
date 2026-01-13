'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChangeOrderForm } from '@/components/change-order/order-form';
import { EmailPreview } from '@/components/change-order/email-preview';
import { ArrowLeft, Save, Send, CheckCircle, Copy } from 'lucide-react';

// Mock user data - would come from auth/user context
const mockUserData = {
  name: 'John Doe',
  email: 'john@freelancer.com',
};

export default function NewChangeOrderPage() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedOrderId, setSavedOrderId] = useState<string | null>(null);

  // Mock projects data - would come from API
  const getProjectData = (projectId: string) => {
    const projects: { [key: string]: { name: string; client: string } } = {
      '1': { name: 'E-commerce Website Redesign', client: 'TechCorp Inc.' },
      '2': { name: 'Mobile App Development', client: 'StartupXYZ' },
      '3': { name: 'Brand Identity Package', client: 'Creative Agency' },
      '4': { name: 'Marketing Website', client: 'GrowthCo' },
    };
    return projects[projectId] || { name: 'Unknown Project', client: 'Unknown Client' };
  };

  const handleSave = async (data: any) => {
    setIsLoading(true);
    try {
      // Mock API call to save change order
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate mock ID
      const orderId = `co_${Date.now()}`;
      setSavedOrderId(orderId);

      console.log('Saving change order:', data);

      // In real app, would save to backend and redirect
      // router.push(`/dashboard/change-orders/${orderId}`);

    } catch (error) {
      console.error('Error saving change order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = (data: any) => {
    setFormData(data);
    setShowPreview(true);
  };

  const handleSendEmail = async (emailContent: string) => {
    setIsLoading(true);
    try {
      // Mock API call to send email
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Sending email:', emailContent);

      // Would integrate with email service
      alert('Change order email sent successfully!');

      // Save as sent and redirect
      router.push('/dashboard/change-orders');

    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = (emailContent: string) => {
    navigator.clipboard.writeText(emailContent);
    alert('Email content copied to clipboard!');
  };

  const goBack = () => {
    if (showPreview) {
      setShowPreview(false);
    } else {
      router.push('/dashboard/change-orders');
    }
  };

  const getEmailPreviewData = () => {
    if (!formData) return null;

    const project = getProjectData(formData.projectId);

    return {
      projectName: project.name,
      clientName: project.client,
      freelancerName: mockUserData.name,
      description: formData.description,
      estimatedHours: formData.estimatedHours,
      totalAmount: formData.estimatedHours * formData.hourlyRate,
      benefit: formData.benefit,
    };
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            {showPreview ? 'Back to Form' : 'Back to Change Orders'}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {showPreview ? 'Review Change Order' : 'Create New Change Order'}
            </h1>
            <p className="text-slate-500">
              {showPreview
                ? 'Review and send your professional change order email'
                : 'Generate a professional change order for scope modifications'
              }
            </p>
          </div>
        </div>

        {savedOrderId && (
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Saved as draft</span>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center space-x-4">
        <div className={`flex items-center space-x-2 ${
          !showPreview ? 'text-blue-600' : 'text-green-600'
        }`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            !showPreview
              ? 'border-blue-600 bg-blue-50'
              : 'border-green-600 bg-green-600 text-white'
          }`}>
            {!showPreview ? '1' : <CheckCircle className="h-4 w-4" />}
          </div>
          <span className="font-medium">Create Order</span>
        </div>

        <div className="flex-1 h-px bg-slate-200"></div>

        <div className={`flex items-center space-x-2 ${
          showPreview ? 'text-blue-600' : 'text-slate-400'
        }`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            showPreview
              ? 'border-blue-600 bg-blue-50'
              : 'border-slate-300'
          }`}>
            2
          </div>
          <span className="font-medium">Review & Send</span>
        </div>
      </div>

      {/* Content */}
      {!showPreview ? (
        <div className="max-w-2xl">
          <ChangeOrderForm
            onSave={handleSave}
            onPreview={handlePreview}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form Summary */}
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border">
              <h3 className="font-medium text-slate-900 mb-3">Change Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Project:</span>
                  <span className="font-medium">{getProjectData(formData.projectId).name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Client:</span>
                  <span className="font-medium">{getProjectData(formData.projectId).client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Title:</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Hours:</span>
                  <span className="font-medium">{formData.estimatedHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Rate:</span>
                  <span className="font-medium">
                    ${formData.hourlyRate}/hr
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-slate-900 font-medium">Total:</span>
                  <span className="text-lg font-bold text-slate-900">
                    ${(formData.estimatedHours * formData.hourlyRate).toLocaleString()}
                  </span>
                </div>
              </div>

              {formData.notes && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <h4 className="text-sm font-medium text-amber-800">Internal Notes:</h4>
                  <p className="text-sm text-amber-700 mt-1">{formData.notes}</p>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(false)}
                className="flex-1"
              >
                Edit Details
              </Button>

              <Button
                onClick={() => handleSave(formData)}
                disabled={isLoading}
                variant="outline"
                className="flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>

          {/* Email Preview */}
          <div>
            <EmailPreview
              data={getEmailPreviewData()!}
              onCopy={handleCopyToClipboard}
              onSend={handleSendEmail}
            />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {showPreview && (
        <div className="fixed bottom-6 right-6 flex space-x-3">
          <Button
            variant="outline"
            onClick={() => handleCopyToClipboard(
              `Subject: Change Order Request - ${getProjectData(formData.projectId).name} - ${formData.title}\n\n${getEmailPreviewData()}`
            )}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>

          <Button
            onClick={() => handleSendEmail('email content')}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? 'Sending...' : 'Send Email'}
          </Button>
        </div>
      )}
    </div>
  );
}