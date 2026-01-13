'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CommunicationMonitor } from '@/components/project/communication-monitor';
import { ScopeItemCard, ScopeItem } from '@/components/analyzer/scope-item';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  MessageSquare,
  Settings,
  MoreVertical,
  Edit,
  Share,
  Download,
  Shield,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock project data
const mockProject = {
  id: '1',
  name: 'E-commerce Website Redesign',
  client: 'TechCorp Inc.',
  clientAvatar: '/avatars/techcorp.png',
  status: 'active' as const,
  budget: 15000,
  spent: 8500,
  startDate: '2024-01-15',
  endDate: '2024-03-15',
  progress: 65,
  team: [
    { id: '1', name: 'John Doe', role: 'Lead Developer', avatar: '/avatars/john.png' },
    { id: '2', name: 'Sarah Smith', role: 'UI/UX Designer', avatar: '/avatars/sarah.png' },
    { id: '3', name: 'Mike Johnson', role: 'Backend Developer', avatar: '/avatars/mike.png' },
  ],
  description: 'Complete redesign and development of the e-commerce platform with modern UI, improved performance, and enhanced user experience.',
  originalScope: [
    'User authentication system',
    'Product catalog management',
    'Shopping cart and checkout',
    'Payment gateway integration',
    'Order management system',
    'Admin dashboard',
    'Responsive design',
    'Basic SEO optimization',
  ],
  scopeItems: [
    {
      id: '1',
      title: 'User Authentication System',
      description: 'Login, registration, password recovery, and user profile management',
      category: 'feature' as const,
      status: 'in-scope' as const,
      confidence: 'high' as const,
      estimatedHours: 40,
      estimatedCost: 3200,
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'Native iOS and Android applications',
      category: 'deliverable' as const,
      status: 'out-of-scope' as const,
      confidence: 'high' as const,
      estimatedHours: 200,
      estimatedCost: 16000,
      priority: 'low' as const,
      notes: 'Client requested during project - not in original scope',
    },
    {
      id: '3',
      title: 'Advanced Analytics Dashboard',
      description: 'Real-time analytics with custom reporting',
      category: 'feature' as const,
      status: 'unclear' as const,
      confidence: 'medium' as const,
      estimatedHours: 80,
      estimatedCost: 6400,
      priority: 'medium' as const,
      notes: 'Mentioned briefly, needs clarification',
    },
  ] as ScopeItem[],
  changeOrders: [
    {
      id: '1',
      title: 'Mobile App Development',
      description: 'Native iOS and Android applications',
      amount: 16000,
      status: 'pending' as const,
      createdDate: '2024-01-20',
    },
    {
      id: '2',
      title: 'Additional Payment Methods',
      description: 'Integration with PayPal and Apple Pay',
      amount: 2500,
      status: 'approved' as const,
      createdDate: '2024-01-18',
    },
  ],
  communications: [
    {
      id: '1',
      content: 'The mobile app would really help our business reach more customers...',
      timestamp: '2024-01-20T10:30:00Z',
      source: 'email' as const,
      hasAlert: true,
    },
    {
      id: '2',
      content: 'Could we also add Apple Pay to the payment options?',
      timestamp: '2024-01-18T14:15:00Z',
      source: 'slack' as const,
      hasAlert: false,
    },
  ],
};

const statusConfig = {
  active: {
    label: 'Active',
    color: 'bg-green-100 text-green-700',
    icon: CheckCircle,
  },
  'on-hold': {
    label: 'On Hold',
    color: 'bg-yellow-100 text-yellow-700',
    icon: Clock,
  },
  completed: {
    label: 'Completed',
    color: 'bg-blue-100 text-blue-700',
    icon: CheckCircle,
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'scope' | 'communications' | 'change-orders'>('overview');

  // In a real app, you would fetch project data based on params.id
  const project = mockProject;

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

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getScopeStats = () => {
    const inScope = project.scopeItems.filter(item => item.status === 'in-scope').length;
    const outOfScope = project.scopeItems.filter(item => item.status === 'out-of-scope').length;
    const unclear = project.scopeItems.filter(item => item.status === 'unclear').length;
    return { inScope, outOfScope, unclear, total: project.scopeItems.length };
  };

  const scopeStats = getScopeStats();
  const currentStatus = statusConfig[project.status];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
            <p className="text-slate-500">{project.client}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Project Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <XCircle className="h-4 w-4 mr-2" />
                Archive Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Project Info Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Budget</div>
                <div className="text-lg font-semibold text-slate-900">
                  {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                </div>
                <div className="text-xs text-slate-500">
                  {Math.round((project.spent / project.budget) * 100)}% used
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Timeline</div>
                <div className="text-lg font-semibold text-slate-900">
                  {formatDate(project.endDate)}
                </div>
                <div className="text-xs text-slate-500">Due date</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Progress</div>
                <div className="text-lg font-semibold text-slate-900">{project.progress}%</div>
                <Progress value={project.progress} className="h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-slate-100">
                  <currentStatus.icon className={`h-5 w-5 ${currentStatus.color.includes('green') ? 'text-green-600' : currentStatus.color.includes('yellow') ? 'text-yellow-600' : 'text-blue-600'}`} />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Status</div>
                  <Badge className={currentStatus.color} variant="secondary">
                    {currentStatus.label}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'scope', label: 'Scope Items', icon: Shield },
            { id: 'communications', label: 'Communications', icon: MessageSquare },
            { id: 'change-orders', label: 'Change Orders', icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.id === 'scope' && scopeStats.outOfScope > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {scopeStats.outOfScope}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Project Description */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{project.description}</p>
                </CardContent>
              </Card>

              {/* Original Scope */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Original Scope</CardTitle>
                  <CardDescription>
                    Deliverables defined in the initial project agreement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {project.originalScope.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Team */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.team.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{member.name}</div>
                        <div className="text-xs text-slate-500">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Scope Summary */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Scope Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-green-50">
                      <div className="text-lg font-semibold text-green-700">{scopeStats.inScope}</div>
                      <div className="text-xs text-slate-500">In Scope</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-50">
                      <div className="text-lg font-semibold text-red-700">{scopeStats.outOfScope}</div>
                      <div className="text-xs text-slate-500">Out of Scope</div>
                    </div>
                  </div>
                  {scopeStats.unclear > 0 && (
                    <div className="text-center p-3 rounded-lg bg-yellow-50">
                      <div className="text-lg font-semibold text-yellow-700">{scopeStats.unclear}</div>
                      <div className="text-xs text-slate-500">Unclear</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'scope' && (
          <div className="space-y-4">
            {project.scopeItems.map((item) => (
              <ScopeItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {activeTab === 'communications' && (
          <CommunicationMonitor projectId={project.id} originalScope={project.originalScope} />
        )}

        {activeTab === 'change-orders' && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Change Orders</CardTitle>
              <CardDescription>
                Generated change orders for scope modifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.changeOrders.map((order) => (
                <div key={order.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900">{order.title}</h4>
                      <p className="text-sm text-slate-600">{order.description}</p>
                      <div className="text-xs text-slate-500 mt-1">
                        Created on {formatDate(order.createdDate)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-slate-900">
                        {formatCurrency(order.amount)}
                      </div>
                      <Badge
                        variant={order.status === 'approved' ? 'default' : 'secondary'}
                        className={order.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}