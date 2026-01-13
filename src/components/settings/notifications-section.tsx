'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Bell,
  Mail,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';

interface NotificationSettings {
  email: {
    scopeAlerts: boolean;
    weeklyReports: boolean;
    changeOrders: boolean;
    clientMessages: boolean;
    teamUpdates: boolean;
    billing: boolean;
    security: boolean;
  };
  push: {
    scopeAlerts: boolean;
    urgentOnly: boolean;
    quietHours: boolean;
    quietStart: string;
    quietEnd: string;
  };
  frequency: {
    scopeAlerts: 'immediate' | 'hourly' | 'daily';
    reports: 'weekly' | 'monthly' | 'never';
  };
}

export function NotificationsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      scopeAlerts: true,
      weeklyReports: true,
      changeOrders: true,
      clientMessages: true,
      teamUpdates: false,
      billing: true,
      security: true,
    },
    push: {
      scopeAlerts: true,
      urgentOnly: false,
      quietHours: true,
      quietStart: '22:00',
      quietEnd: '08:00',
    },
    frequency: {
      scopeAlerts: 'immediate',
      reports: 'weekly',
    },
  });

  const updateEmailSetting = (key: keyof NotificationSettings['email'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      email: { ...prev.email, [key]: value }
    }));
  };

  const updatePushSetting = (key: keyof NotificationSettings['push'], value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      push: { ...prev.push, [key]: value }
    }));
  };

  const updateFrequencySetting = (key: keyof NotificationSettings['frequency'], value: string) => {
    setSettings(prev => ({
      ...prev,
      frequency: { ...prev.frequency, [key]: value }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Notification settings saved:', settings);
    setIsLoading(false);
  };

  const notificationTypes = [
    {
      category: 'Scope & Project Alerts',
      icon: AlertTriangle,
      color: 'text-orange-600 bg-orange-100',
      description: 'Notifications about scope changes and project updates',
      items: [
        {
          key: 'scopeAlerts',
          label: 'Scope Change Alerts',
          description: 'Get notified when potential scope changes are detected',
          email: settings.email.scopeAlerts,
          push: settings.push.scopeAlerts,
        },
        {
          key: 'changeOrders',
          label: 'Change Order Updates',
          description: 'Notifications about change order status and approvals',
          email: settings.email.changeOrders,
          push: false,
        },
      ],
    },
    {
      category: 'Communication',
      icon: Users,
      color: 'text-blue-600 bg-blue-100',
      description: 'Client and team communication notifications',
      items: [
        {
          key: 'clientMessages',
          label: 'Client Messages',
          description: 'New messages from clients requiring your attention',
          email: settings.email.clientMessages,
          push: false,
        },
        {
          key: 'teamUpdates',
          label: 'Team Updates',
          description: 'Updates from team members and collaborators',
          email: settings.email.teamUpdates,
          push: false,
        },
      ],
    },
    {
      category: 'Reports & Analytics',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100',
      description: 'Regular reports and performance insights',
      items: [
        {
          key: 'weeklyReports',
          label: 'Weekly Reports',
          description: 'Summary of scope changes and project progress',
          email: settings.email.weeklyReports,
          push: false,
        },
      ],
    },
    {
      category: 'Account & Billing',
      icon: DollarSign,
      color: 'text-purple-600 bg-purple-100',
      description: 'Account, billing, and security notifications',
      items: [
        {
          key: 'billing',
          label: 'Billing & Payments',
          description: 'Invoice notifications, payment confirmations, and billing issues',
          email: settings.email.billing,
          push: false,
        },
        {
          key: 'security',
          label: 'Security Alerts',
          description: 'Login attempts, password changes, and security events',
          email: settings.email.security,
          push: false,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Notification Types */}
      {notificationTypes.map((category, categoryIndex) => {
        const Icon = category.icon;

        return (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span>{category.category}</span>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Label className="text-base font-medium">{item.label}</Label>
                      <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                    </div>

                    <div className="flex items-center space-x-6 ml-6">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <Switch
                          checked={item.email}
                          onCheckedChange={(checked) =>
                            updateEmailSetting(item.key as keyof NotificationSettings['email'], checked)
                          }
                        />
                      </div>

                      {item.push !== undefined && (
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4 text-slate-500" />
                          <Switch
                            checked={item.push}
                            onCheckedChange={(checked) =>
                              updatePushSetting('scopeAlerts', checked)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {itemIndex < category.items.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      {/* Frequency Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-slate-100">
              <Clock className="h-4 w-4 text-slate-600" />
            </div>
            <span>Notification Frequency</span>
          </CardTitle>
          <CardDescription>
            Control how often you receive different types of notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Scope Alert Frequency</Label>
              <Select
                value={settings.frequency.scopeAlerts}
                onValueChange={(value) => updateFrequencySetting('scopeAlerts', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly digest</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">How often to send scope change alerts</p>
            </div>

            <div className="space-y-2">
              <Label>Report Frequency</Label>
              <Select
                value={settings.frequency.reports}
                onValueChange={(value) => updateFrequencySetting('reports', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">How often to send summary reports</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Push Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Bell className="h-4 w-4 text-blue-600" />
            </div>
            <span>Push Notification Settings</span>
          </CardTitle>
          <CardDescription>
            Configure push notifications and quiet hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Urgent Alerts Only</Label>
              <p className="text-sm text-slate-600">Only send push notifications for urgent scope changes</p>
            </div>
            <Switch
              checked={settings.push.urgentOnly}
              onCheckedChange={(checked) => updatePushSetting('urgentOnly', checked)}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Quiet Hours</Label>
                <p className="text-sm text-slate-600">Don't send push notifications during these hours</p>
              </div>
              <Switch
                checked={settings.push.quietHours}
                onCheckedChange={(checked) => updatePushSetting('quietHours', checked)}
              />
            </div>

            {settings.push.quietHours && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div className="space-y-2">
                  <Label className="text-sm">Start time</Label>
                  <Select
                    value={settings.push.quietStart}
                    onValueChange={(value) => updatePushSetting('quietStart', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">End time</Label>
                  <Select
                    value={settings.push.quietEnd}
                    onValueChange={(value) => updatePushSetting('quietEnd', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </div>
  );
}