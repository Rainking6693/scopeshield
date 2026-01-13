'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MessageCircle,
  Shield,
  Zap,
  FileText,
  User,
} from 'lucide-react';

interface ScopeAlert {
  id: string;
  type: 'scope_change' | 'feature_request' | 'timeline_change' | 'budget_impact';
  severity: 'high' | 'medium' | 'low';
  confidence: number;
  message: string;
  suggestedAction: string;
  timestamp: Date;
}

interface CommunicationEntry {
  id: string;
  content: string;
  timestamp: Date;
  source: 'manual' | 'email' | 'slack' | 'call';
  alerts: ScopeAlert[];
}

interface CommunicationMonitorProps {
  projectId: string;
  originalScope?: string[];
}

export function CommunicationMonitor({ projectId, originalScope = [] }: CommunicationMonitorProps) {
  const [newMessage, setNewMessage] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [communications, setCommunications] = useState<CommunicationEntry[]>([
    {
      id: '1',
      content: 'Hi team, I was thinking we could also add a mobile app version alongside the website. What do you think?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      source: 'email',
      alerts: [
        {
          id: '1-1',
          type: 'scope_change',
          severity: 'high',
          confidence: 92,
          message: 'Client requesting mobile app development - this is outside the original web development scope',
          suggestedAction: 'Generate change order for mobile app development ($15,000-$25,000)',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        }
      ],
    },
    {
      id: '2',
      content: 'Could we also integrate with Salesforce for customer data? It would be really helpful for our sales team.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      source: 'slack',
      alerts: [
        {
          id: '2-1',
          type: 'feature_request',
          severity: 'medium',
          confidence: 85,
          message: 'Salesforce integration not in original scope - requires additional API development',
          suggestedAction: 'Clarify integration requirements and estimate effort (8-16 hours)',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        }
      ],
    },
  ]);

  const alertTypeConfig = {
    scope_change: {
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-700',
      label: 'Scope Change',
    },
    feature_request: {
      icon: MessageSquare,
      color: 'bg-orange-100 text-orange-700',
      label: 'Feature Request',
    },
    timeline_change: {
      icon: Clock,
      color: 'bg-blue-100 text-blue-700',
      label: 'Timeline Change',
    },
    budget_impact: {
      icon: Shield,
      color: 'bg-purple-100 text-purple-700',
      label: 'Budget Impact',
    },
  };

  const severityConfig = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-orange-100 text-orange-700 border-orange-200',
    low: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  const sourceConfig = {
    manual: { icon: MessageCircle, label: 'Manual Entry' },
    email: { icon: Mail, label: 'Email' },
    slack: { icon: MessageCircle, label: 'Slack' },
    call: { icon: Phone, label: 'Phone Call' },
  };

  const mockAnalyzeMessage = (content: string): ScopeAlert[] => {
    const alerts: ScopeAlert[] = [];
    const lowerContent = content.toLowerCase();

    // Mock analysis logic
    if (lowerContent.includes('mobile') || lowerContent.includes('app')) {
      alerts.push({
        id: Date.now().toString(),
        type: 'scope_change',
        severity: 'high',
        confidence: 90,
        message: 'Mobile development mentioned - this appears to be outside original scope',
        suggestedAction: 'Review original scope and generate change order if needed',
        timestamp: new Date(),
      });
    }

    if (lowerContent.includes('additional') || lowerContent.includes('also') || lowerContent.includes('extra')) {
      alerts.push({
        id: (Date.now() + 1).toString(),
        type: 'feature_request',
        severity: 'medium',
        confidence: 75,
        message: 'Additional features or changes mentioned',
        suggestedAction: 'Clarify if this is within original scope or requires additional work',
        timestamp: new Date(),
      });
    }

    if (lowerContent.includes('deadline') || lowerContent.includes('rush') || lowerContent.includes('sooner')) {
      alerts.push({
        id: (Date.now() + 2).toString(),
        type: 'timeline_change',
        severity: 'medium',
        confidence: 80,
        message: 'Timeline change detected',
        suggestedAction: 'Assess impact on project timeline and resources',
        timestamp: new Date(),
      });
    }

    return alerts;
  };

  const handleAnalyze = async () => {
    if (!newMessage.trim()) return;

    setAnalyzing(true);

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const alerts = mockAnalyzeMessage(newMessage);

    const newEntry: CommunicationEntry = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      source: 'manual',
      alerts,
    };

    setCommunications(prev => [newEntry, ...prev]);
    setNewMessage('');
    setAnalyzing(false);
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotalAlerts = () => {
    return communications.reduce((total, comm) => total + comm.alerts.length, 0);
  };

  const getHighSeverityAlerts = () => {
    return communications.reduce(
      (total, comm) => total + comm.alerts.filter(alert => alert.severity === 'high').length,
      0
    );
  };

  return (
    <div className="space-y-6">
      {/* Monitor Header */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Communication Monitor</CardTitle>
                <CardDescription>
                  Paste client messages to check for scope changes
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900">{getTotalAlerts()}</div>
                <div className="text-xs text-slate-500">Total Alerts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-red-700">{getHighSeverityAlerts()}</div>
                <div className="text-xs text-slate-500">High Severity</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Paste client emails, Slack messages, or meeting notes here to analyze for scope changes..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[120px] resize-none"
            />

            <div className="flex justify-between items-center">
              <div className="text-xs text-slate-500">
                {newMessage.length} characters • AI will analyze for scope changes
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!newMessage.trim() || analyzing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {analyzing ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Analyze Message
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication History */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Communication History</CardTitle>
          <CardDescription>
            Recent client communications with scope analysis results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-6">
              {communications.map((comm) => {
                const sourceInfo = sourceConfig[comm.source];

                return (
                  <div key={comm.id} className="border border-slate-200 rounded-lg p-4">
                    {/* Communication Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <sourceInfo.icon className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-500">{sourceInfo.label}</span>
                        <span className="text-sm text-slate-400">•</span>
                        <span className="text-sm text-slate-500">{formatTimestamp(comm.timestamp)}</span>
                      </div>

                      {comm.alerts.length > 0 && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          {comm.alerts.length} alert{comm.alerts.length > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>

                    {/* Communication Content */}
                    <div className="p-3 bg-slate-50 rounded-md mb-4">
                      <div className="flex items-start space-x-2">
                        <User className="h-4 w-4 text-slate-400 mt-1" />
                        <p className="text-sm text-slate-700">{comm.content}</p>
                      </div>
                    </div>

                    {/* Alerts */}
                    {comm.alerts.length > 0 && (
                      <div className="space-y-3">
                        {comm.alerts.map((alert) => {
                          const alertType = alertTypeConfig[alert.type];

                          return (
                            <div
                              key={alert.id}
                              className={`p-3 border rounded-lg ${severityConfig[alert.severity]}`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="p-1 rounded">
                                  <alertType.icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Badge className={alertType.color} variant="secondary">
                                      {alertType.label}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {alert.confidence}% confidence
                                    </Badge>
                                  </div>
                                  <p className="text-sm font-medium mb-1">{alert.message}</p>
                                  <p className="text-xs text-slate-600 mb-2">{alert.suggestedAction}</p>

                                  <div className="flex space-x-2">
                                    <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
                                      <FileText className="h-3 w-3 mr-1" />
                                      Generate Change Order
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-7 text-xs">
                                      Mark as False Positive
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {comm.alerts.length === 0 && (
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>No scope issues detected</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {communications.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <MessageSquare className="h-8 w-8 mx-auto mb-3 text-slate-300" />
                  <p>No communications analyzed yet</p>
                  <p className="text-sm">Start by pasting a client message above</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}