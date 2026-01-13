'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FolderOpen,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: {
    value: string;
    type: 'up' | 'down';
  };
  color: 'blue' | 'orange' | 'green' | 'purple';
}

const statsData: StatCard[] = [
  {
    title: 'Active Projects',
    value: '12',
    description: '3 new this month',
    icon: FolderOpen,
    trend: {
      value: '+15%',
      type: 'up',
    },
    color: 'blue',
  },
  {
    title: 'Scope Alerts',
    value: '8',
    description: '4 requires attention',
    icon: AlertTriangle,
    trend: {
      value: '-12%',
      type: 'down',
    },
    color: 'orange',
  },
  {
    title: 'Change Orders Generated',
    value: '24',
    description: 'This month',
    icon: FileText,
    trend: {
      value: '+8%',
      type: 'up',
    },
    color: 'green',
  },
  {
    title: 'Revenue Protected',
    value: '$47,250',
    description: 'Total saved from scope creep',
    icon: DollarSign,
    trend: {
      value: '+24%',
      type: 'up',
    },
    color: 'purple',
  },
];

const colorClasses = {
  blue: {
    icon: 'text-blue-600 bg-blue-100',
    trend: 'text-blue-600 bg-blue-50',
  },
  orange: {
    icon: 'text-orange-600 bg-orange-100',
    trend: 'text-orange-600 bg-orange-50',
  },
  green: {
    icon: 'text-green-600 bg-green-100',
    trend: 'text-green-600 bg-green-50',
  },
  purple: {
    icon: 'text-purple-600 bg-purple-100',
    trend: 'text-purple-600 bg-purple-50',
  },
};

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <Card key={stat.title} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.title}
            </CardTitle>
            <div
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                colorClasses[stat.color].icon
              }`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-slate-500">{stat.description}</p>
              {stat.trend && (
                <Badge
                  variant="secondary"
                  className={`${colorClasses[stat.color].trend} border-0`}
                >
                  {stat.trend.type === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.trend.value}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}