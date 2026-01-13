'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Mail,
  MessageSquare,
  Zap,
  Github,
  Trello,
  Calendar,
  FileText,
  Webhook,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'communication' | 'project' | 'automation' | 'development';
  status: 'connected' | 'disconnected' | 'error';
  enabled: boolean;
  lastSync?: string;
  features: string[];
  setupRequired: boolean;
}

export function IntegrationsSection() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Send scope alerts and updates via email',
      icon: Mail,
      category: 'communication',
      status: 'connected',
      enabled: true,
      lastSync: '2 minutes ago',
      features: ['Scope change alerts', 'Weekly reports', 'Client notifications'],
      setupRequired: false
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get instant notifications in your Slack channels',
      icon: MessageSquare,
      category: 'communication',
      status: 'disconnected',
      enabled: false,
      features: ['Real-time alerts', 'Team notifications', 'Custom channels'],
      setupRequired: true
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automate workflows with 5000+ apps',
      icon: Zap,
      category: 'automation',
      status: 'disconnected',
      enabled: false,
      features: ['Custom automations', 'Multi-app workflows', 'Trigger events'],
      setupRequired: true
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Track code changes and project scope',
      icon: Github,
      category: 'development',
      status: 'connected',
      enabled: true,
      lastSync: '1 hour ago',
      features: ['Commit tracking', 'PR analysis', 'Code complexity metrics'],
      setupRequired: false
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Sync project boards and track scope changes',
      icon: Trello,
      category: 'project',
      status: 'error',
      enabled: false,
      features: ['Board synchronization', 'Card tracking', 'Scope monitoring'],
      setupRequired: true
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Schedule scope reviews and client meetings',
      icon: Calendar,
      category: 'project',
      status: 'disconnected',
      enabled: false,
      features: ['Meeting scheduling', 'Deadline tracking', 'Review reminders'],
      setupRequired: true
    }
  ]);

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, enabled: !integration.enabled }
          : integration
      )
    );
  };

  const handleConnect = (id: string) => {
    // Simulate connection
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? {
              ...integration,
              status: 'connected',
              enabled: true,
              lastSync: 'Just now',
              setupRequired: false
            }
          : integration
      )
    );
  };

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
    }
  };

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Connected</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Error</Badge>;
      default:
        return <Badge variant="secondary">Not Connected</Badge>;
    }
  };

  const categories = {
    communication: 'Communication',
    project: 'Project Management',
    automation: 'Automation',
    development: 'Development'
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(categories).map(([key, label]) => {
          const categoryIntegrations = integrations.filter(i => i.category === key);
          const connectedCount = categoryIntegrations.filter(i => i.status === 'connected').length;

          return (
            <Card key={key}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {connectedCount}/{categoryIntegrations.length}
                </div>
                <div className="text-sm text-slate-600">{label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Integrations by Category */}
      {Object.entries(categories).map(([categoryKey, categoryLabel]) => {
        const categoryIntegrations = integrations.filter(i => i.category === categoryKey);

        return (
          <Card key={categoryKey}>
            <CardHeader>
              <CardTitle>{categoryLabel}</CardTitle>
              <CardDescription>
                Connect your favorite {categoryLabel.toLowerCase()} tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryIntegrations.map((integration) => {
                  const Icon = integration.icon;

                  return (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg">
                          <Icon className="h-5 w-5 text-slate-700" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium">{integration.name}</h3>
                            {getStatusIcon(integration.status)}
                            {getStatusBadge(integration.status)}
                          </div>
                          <p className="text-sm text-slate-600 mt-1">
                            {integration.description}
                          </p>

                          {integration.status === 'connected' && integration.lastSync && (
                            <p className="text-xs text-slate-500 mt-1">
                              Last sync: {integration.lastSync}
                            </p>
                          )}

                          {integration.status === 'error' && (
                            <p className="text-xs text-red-600 mt-1">
                              Connection failed. Click reconnect to try again.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {integration.status === 'connected' && (
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={integration.enabled}
                              onCheckedChange={() => handleToggleIntegration(integration.id)}
                            />
                            <span className="text-sm text-slate-600">
                              {integration.enabled ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        )}

                        {integration.status === 'connected' ? (
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                            <Button variant="ghost" size="sm">
                              Disconnect
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleConnect(integration.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {integration.status === 'error' ? 'Reconnect' : 'Connect'}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Custom Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Webhook className="h-5 w-5" />
            <span>Custom Integrations</span>
          </CardTitle>
          <CardDescription>
            Build custom integrations using our API and webhooks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <Webhook className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-medium">Webhooks</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Receive real-time notifications when scope changes occur
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Setup Webhooks
              </Button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="font-medium">API Access</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Build custom applications using our REST API
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                API Documentation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}