'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { ProjectList } from '@/components/dashboard/project-list';
import { AlertFeed } from '@/components/dashboard/alert-feed';
import {
  Plus,
  Upload,
  Scan,
  FileText,
  Clock,
  TrendingUp,
  Shield,
  Brain,
  Zap,
} from 'lucide-react';

const quickActions = [
  {
    title: 'New Project',
    description: 'Start monitoring a new project for scope creep',
    icon: Plus,
    href: '/dashboard/projects/new',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    title: 'Upload Documents',
    description: 'Upload contracts, emails, or project files for analysis',
    icon: Upload,
    href: '/dashboard/scope-analyzer/upload',
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'Run Scope Scan',
    description: 'Analyze recent communications for scope changes',
    icon: Scan,
    href: '/dashboard/scope-analyzer',
    color: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    title: 'Generate Change Order',
    description: 'Create a professional change order document',
    icon: FileText,
    href: '/dashboard/change-orders/new',
    color: 'bg-orange-600 hover:bg-orange-700',
  },
];

const recentActivity = [
  {
    id: '1',
    type: 'scope_alert',
    title: 'New scope change detected',
    description: 'TechCorp project - Additional features requested',
    time: '2 hours ago',
    icon: Shield,
    iconColor: 'text-orange-600 bg-orange-100',
  },
  {
    id: '2',
    type: 'change_order',
    title: 'Change order generated',
    description: 'StartupXYZ project - Mobile app features ($4,500)',
    time: '4 hours ago',
    icon: FileText,
    iconColor: 'text-green-600 bg-green-100',
  },
  {
    id: '3',
    type: 'ai_analysis',
    title: 'AI analysis completed',
    description: 'Processed 15 emails and 8 Slack messages',
    time: '6 hours ago',
    icon: Brain,
    iconColor: 'text-blue-600 bg-blue-100',
  },
  {
    id: '4',
    type: 'project_update',
    title: 'Project milestone reached',
    description: 'Marketing Website - 75% completion',
    time: '1 day ago',
    icon: TrendingUp,
    iconColor: 'text-purple-600 bg-purple-100',
  },
  {
    id: '5',
    type: 'protection',
    title: 'Revenue protected',
    description: 'Saved $2,300 from potential scope creep',
    time: '2 days ago',
    icon: Shield,
    iconColor: 'text-green-600 bg-green-100',
  },
];

export default function DashboardPage() {
  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">
          Welcome back! Here's an overview of your project protection activity.
        </p>
      </div>

      {/* Stats cards */}
      <StatsCards />

      {/* Quick actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
            Quick Actions
          </CardTitle>
          <CardDescription className="text-slate-500">
            Common tasks to help you protect your projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                asChild
              >
                <Link href={action.href}>
                  <div className={`p-2 rounded-md ${action.color}`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-900">{action.title}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {action.description}
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main content grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Projects and Activity */}
        <div className="lg:col-span-2 space-y-8">
          <ProjectList />

          {/* Recent Activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-slate-500">
                Your latest protection activity across all projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${activity.iconColor}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-900">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {activity.description}
                      </p>
                    </div>
                    <div className="text-xs text-slate-400">
                      {formatTime(activity.time)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <AlertFeed />

          {/* AI Insights */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                AI Insights
              </CardTitle>
              <CardDescription className="text-slate-500">
                Smart recommendations from our AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-blue-600">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">
                      Proactive Monitoring
                    </h4>
                    <p className="text-xs text-blue-700 mt-1">
                      Consider setting up real-time email monitoring for your TechCorp project to catch scope changes instantly.
                    </p>
                    <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                      Set Up Monitoring
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-green-600">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-green-900">
                      Revenue Opportunity
                    </h4>
                    <p className="text-xs text-green-700 mt-1">
                      You have 3 pending scope changes worth $8,200. Generate change orders to capture this revenue.
                    </p>
                    <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
                      Review Changes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}