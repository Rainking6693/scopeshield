'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  DollarSign,
  Users,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client: string;
  clientAvatar?: string;
  status: 'active' | 'on-hold' | 'completed';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  scopeAlerts: number;
  team: number;
  progress: number;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Website Redesign',
    client: 'TechCorp Inc.',
    clientAvatar: '/avatars/techcorp.png',
    status: 'active',
    budget: 15000,
    spent: 8500,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    scopeAlerts: 2,
    team: 3,
    progress: 65,
  },
  {
    id: '2',
    name: 'Mobile App Development',
    client: 'StartupXYZ',
    status: 'active',
    budget: 25000,
    spent: 12000,
    startDate: '2024-01-01',
    endDate: '2024-04-01',
    scopeAlerts: 1,
    team: 4,
    progress: 40,
  },
  {
    id: '3',
    name: 'Brand Identity Package',
    client: 'Creative Agency',
    status: 'completed',
    budget: 8000,
    spent: 7800,
    startDate: '2023-12-01',
    endDate: '2024-01-31',
    scopeAlerts: 0,
    team: 2,
    progress: 100,
  },
  {
    id: '4',
    name: 'Data Analytics Dashboard',
    client: 'FinanceFlow',
    status: 'on-hold',
    budget: 18000,
    spent: 3600,
    startDate: '2024-01-20',
    endDate: '2024-05-20',
    scopeAlerts: 3,
    team: 2,
    progress: 20,
  },
  {
    id: '5',
    name: 'Marketing Website',
    client: 'GrowthCo',
    status: 'active',
    budget: 12000,
    spent: 9000,
    startDate: '2024-01-10',
    endDate: '2024-02-28',
    scopeAlerts: 1,
    team: 3,
    progress: 75,
  },
];

const statusConfig = {
  active: {
    label: 'Active',
    icon: Clock,
    color: 'bg-green-100 text-green-700 hover:bg-green-200',
  },
  'on-hold': {
    label: 'On Hold',
    icon: AlertTriangle,
    color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  },
};

export function ProjectList() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900">
              Recent Projects
            </CardTitle>
            <CardDescription className="text-slate-500">
              Your most recent project activity
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/projects">
              View All
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockProjects.slice(0, 4).map((project) => {
          const statusInfo = statusConfig[project.status];
          return (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {project.client.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium text-slate-900">
                    {project.name}
                  </h4>
                  <p className="text-sm text-slate-500">{project.client}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="flex items-center text-slate-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{formatCurrency(project.spent)}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    of {formatCurrency(project.budget)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center text-slate-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(project.endDate)}</span>
                  </div>
                  <div className="text-xs text-slate-400">Due date</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center text-slate-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{project.team}</span>
                  </div>
                  <div className="text-xs text-slate-400">Team</div>
                </div>

                {project.scopeAlerts > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {project.scopeAlerts} alert{project.scopeAlerts > 1 ? 's' : ''}
                  </Badge>
                )}

                <Badge className={statusInfo.color} variant="secondary">
                  <statusInfo.icon className="h-3 w-3 mr-1" />
                  {statusInfo.label}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}