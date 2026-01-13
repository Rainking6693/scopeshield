'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertTriangle,
  Clock,
  ExternalLink,
  MessageSquare,
  FileText,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface ScopeAlert {
  id: string;
  type: 'scope_change' | 'communication' | 'budget_risk' | 'timeline_risk';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  projectName: string;
  timestamp: string;
  status: 'new' | 'acknowledged' | 'resolved';
  source: string;
}

const mockAlerts: ScopeAlert[] = [
  {
    id: '1',
    type: 'scope_change',
    priority: 'high',
    title: 'New feature request detected',
    description: 'Client mentioned adding user authentication system in email thread',
    projectName: 'E-commerce Website Redesign',
    timestamp: '2024-01-13T10:30:00Z',
    status: 'new',
    source: 'email',
  },
  {
    id: '2',
    type: 'communication',
    priority: 'medium',
    title: 'Additional design revisions requested',
    description: 'Client requested 3 additional homepage design variations',
    projectName: 'Mobile App Development',
    timestamp: '2024-01-13T09:15:00Z',
    status: 'acknowledged',
    source: 'slack',
  },
  {
    id: '3',
    type: 'budget_risk',
    priority: 'high',
    title: 'Budget threshold exceeded',
    description: 'Project spending is 85% of budget with 40% work remaining',
    projectName: 'Data Analytics Dashboard',
    timestamp: '2024-01-13T08:45:00Z',
    status: 'new',
    source: 'system',
  },
  {
    id: '4',
    type: 'timeline_risk',
    priority: 'medium',
    title: 'Potential timeline extension',
    description: 'Client mentioned needing more time for content review',
    projectName: 'Marketing Website',
    timestamp: '2024-01-12T16:20:00Z',
    status: 'resolved',
    source: 'meeting_notes',
  },
  {
    id: '5',
    type: 'scope_change',
    priority: 'low',
    title: 'Minor feature addition suggested',
    description: 'Client suggested adding social media share buttons',
    projectName: 'Brand Identity Package',
    timestamp: '2024-01-12T14:10:00Z',
    status: 'acknowledged',
    source: 'email',
  },
  {
    id: '6',
    type: 'communication',
    priority: 'high',
    title: 'Urgent change request',
    description: 'Client requesting complete redesign of landing page layout',
    projectName: 'E-commerce Website Redesign',
    timestamp: '2024-01-12T11:30:00Z',
    status: 'new',
    source: 'phone_call',
  },
];

const alertTypeConfig = {
  scope_change: {
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    label: 'Scope Change',
  },
  communication: {
    icon: MessageSquare,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    label: 'Communication',
  },
  budget_risk: {
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    label: 'Budget Risk',
  },
  timeline_risk: {
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    label: 'Timeline Risk',
  },
};

const priorityConfig = {
  high: 'border-l-red-500 bg-red-50',
  medium: 'border-l-orange-500 bg-orange-50',
  low: 'border-l-blue-500 bg-blue-50',
};

const statusConfig = {
  new: {
    icon: AlertTriangle,
    color: 'bg-red-100 text-red-700',
    label: 'New',
  },
  acknowledged: {
    icon: CheckCircle,
    color: 'bg-blue-100 text-blue-700',
    label: 'Acknowledged',
  },
  resolved: {
    icon: CheckCircle,
    color: 'bg-green-100 text-green-700',
    label: 'Resolved',
  },
};

const sourceConfig = {
  email: { icon: Mail, label: 'Email' },
  slack: { icon: MessageSquare, label: 'Slack' },
  system: { icon: Shield, label: 'System' },
  meeting_notes: { icon: FileText, label: 'Meeting' },
  phone_call: { icon: MessageSquare, label: 'Call' },
};

export function AlertFeed() {
  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900">
              Scope Alerts
            </CardTitle>
            <CardDescription className="text-slate-500">
              Recent scope change detections and risks
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/scope-analyzer">
              View All
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {mockAlerts.map((alert) => {
              const typeInfo = alertTypeConfig[alert.type];
              const statusInfo = statusConfig[alert.status];
              const sourceInfo = sourceConfig[alert.source as keyof typeof sourceConfig];

              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${priorityConfig[alert.priority]} hover:shadow-sm transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${typeInfo.bgColor}`}>
                        <typeInfo.icon className={`h-4 w-4 ${typeInfo.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium text-slate-900">
                            {alert.title}
                          </h4>
                          <Badge className={statusInfo.color} variant="secondary">
                            <statusInfo.icon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          {alert.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span className="font-medium">{alert.projectName}</span>
                          <div className="flex items-center space-x-1">
                            <sourceInfo.icon className="h-3 w-3" />
                            <span>{sourceInfo.label}</span>
                          </div>
                          <span>{formatTimestamp(alert.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {alert.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}