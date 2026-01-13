'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Copy,
  Send,
  Eye,
  EyeOff,
  Download,
} from 'lucide-react';
import { useState } from 'react';

interface EmailPreviewData {
  projectName: string;
  clientName: string;
  freelancerName: string;
  description: string;
  estimatedHours: number;
  totalAmount: number;
  benefit?: string;
}

interface EmailPreviewProps {
  data: EmailPreviewData;
  onCopy?: (content: string) => void;
  onSend?: (content: string) => void;
  className?: string;
}

export function EmailPreview({
  data,
  onCopy,
  onSend,
  className
}: EmailPreviewProps) {
  const [showPreview, setShowPreview] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const generateEmailSubject = () => {
    return `Change Order Request - ${data.projectName} - ${data.description.substring(0, 30)}${data.description.length > 30 ? '...' : ''}`;
  };

  const generateEmailBody = () => {
    const benefit = data.benefit || "better meet your project requirements";

    return `Hi ${data.clientName},

I've reviewed your latest request regarding ${data.description.toLowerCase()}. After checking against our original project scope, this falls outside of what we agreed upon.

To accommodate this change, I'm proposing:

**Scope Addition:** ${data.description}
**Estimated Time:** ${data.estimatedHours} hour${data.estimatedHours !== 1 ? 's' : ''}
**Additional Cost:** ${formatCurrency(data.totalAmount)}

This will ensure ${benefit}.

Please let me know if you'd like to proceed with this addition. I'm happy to discuss any questions you might have.

Best regards,
${data.freelancerName}`;
  };

  const emailContent = generateEmailBody();
  const emailSubject = generateEmailSubject();

  const handleCopy = () => {
    const fullEmail = `Subject: ${emailSubject}\n\n${emailContent}`;
    navigator.clipboard.writeText(fullEmail);
    onCopy?.(fullEmail);
  };

  const handleSend = () => {
    onSend?.(emailContent);
  };

  return (
    <Card className={`border-0 shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-blue-100">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Email Preview</CardTitle>
              <CardDescription>
                Professional change order email template
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="text-slate-500"
            >
              {showPreview ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  Show
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {showPreview && (
        <CardContent className="space-y-4">
          {/* Email Header */}
          <div className="p-4 bg-slate-50 rounded-lg border">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-slate-600">To:</span>
                <span className="text-sm text-slate-900">{data.clientName}</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sm font-medium text-slate-600">Subject:</span>
                <span className="text-sm text-slate-900 flex-1">
                  {emailSubject}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Email Body */}
          <div className="p-4 bg-white border rounded-lg">
            <div className="whitespace-pre-line text-sm text-slate-700 leading-relaxed">
              {emailContent}
            </div>
          </div>

          {/* Key Details Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <div className="text-sm font-medium text-blue-900">Estimated Time</div>
              <div className="text-lg font-semibold text-blue-700">
                {data.estimatedHours}h
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <div className="text-sm font-medium text-green-900">Additional Cost</div>
              <div className="text-lg font-semibold text-green-700">
                {formatCurrency(data.totalAmount)}
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-center">
              <div className="text-sm font-medium text-purple-900">Project</div>
              <div className="text-lg font-semibold text-purple-700 truncate">
                {data.projectName}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy to Clipboard
            </Button>

            <Button
              onClick={handleSend}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>

            <Button
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {/* Tips */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="text-sm font-medium text-amber-800 mb-1">💡 Tips for Success</h4>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• Send change orders promptly when scope changes are identified</li>
              <li>• Be specific about deliverables and timeline</li>
              <li>• Maintain a friendly but professional tone</li>
              <li>• Follow up if no response within 48-72 hours</li>
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
}