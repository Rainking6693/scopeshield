'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChangeOrderCard, ChangeOrder } from '@/components/change-order/order-card';
import {
  Plus,
  Search,
  Filter,
  Download,
  FileText,
  Clock,
  Send,
  CheckCircle,
  XCircle,
} from 'lucide-react';

// Mock data
const mockChangeOrders: ChangeOrder[] = [
  {
    id: '1',
    title: 'Mobile App Development',
    description: 'Native iOS and Android applications with user authentication, push notifications, and offline functionality',
    projectName: 'E-commerce Website Redesign',
    projectId: '1',
    clientName: 'TechCorp Inc.',
    status: 'pending',
    estimatedHours: 200,
    hourlyRate: 85,
    totalAmount: 17000,
    createdDate: '2024-01-20',
    notes: 'Client expressed urgent need for mobile presence',
  },
  {
    id: '2',
    title: 'Advanced Analytics Dashboard',
    description: 'Real-time analytics with custom reporting, data visualization, and automated insights',
    projectName: 'E-commerce Website Redesign',
    projectId: '1',
    clientName: 'TechCorp Inc.',
    status: 'sent',
    estimatedHours: 80,
    hourlyRate: 85,
    totalAmount: 6800,
    createdDate: '2024-01-18',
    sentDate: '2024-01-19',
    notes: 'Waiting for client approval',
  },
  {
    id: '3',
    title: 'Salesforce Integration',
    description: 'Two-way integration with Salesforce CRM for customer data synchronization',
    projectName: 'Mobile App Development',
    projectId: '2',
    clientName: 'StartupXYZ',
    status: 'approved',
    estimatedHours: 40,
    hourlyRate: 95,
    totalAmount: 3800,
    createdDate: '2024-01-15',
    sentDate: '2024-01-16',
    responseDate: '2024-01-17',
  },
  {
    id: '4',
    title: 'Additional Payment Methods',
    description: 'Integration with PayPal, Apple Pay, and Google Pay payment options',
    projectName: 'E-commerce Website Redesign',
    projectId: '1',
    clientName: 'TechCorp Inc.',
    status: 'approved',
    estimatedHours: 25,
    hourlyRate: 85,
    totalAmount: 2125,
    createdDate: '2024-01-10',
    sentDate: '2024-01-11',
    responseDate: '2024-01-12',
  },
  {
    id: '5',
    title: 'SEO Enhancement Package',
    description: 'Advanced SEO optimization including technical SEO, content optimization, and schema markup',
    projectName: 'Marketing Website',
    projectId: '4',
    clientName: 'GrowthCo',
    status: 'declined',
    estimatedHours: 30,
    hourlyRate: 80,
    totalAmount: 2400,
    createdDate: '2024-01-08',
    sentDate: '2024-01-09',
    responseDate: '2024-01-11',
    notes: 'Client wants to handle SEO internally',
  },
  {
    id: '6',
    title: 'Multi-language Support',
    description: 'Internationalization support for English, Spanish, and French languages',
    projectName: 'Marketing Website',
    projectId: '4',
    clientName: 'GrowthCo',
    status: 'draft',
    estimatedHours: 60,
    hourlyRate: 80,
    totalAmount: 4800,
    createdDate: '2024-01-22',
    notes: 'Need to clarify translation requirements',
  },
];

type FilterTab = 'all' | 'draft' | 'pending' | 'sent' | 'approved' | 'declined';

const filterTabs: { id: FilterTab; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All', icon: FileText },
  { id: 'draft', label: 'Draft', icon: FileText },
  { id: 'pending', label: 'Pending', icon: Clock },
  { id: 'sent', label: 'Sent', icon: Send },
  { id: 'approved', label: 'Approved', icon: CheckCircle },
  { id: 'declined', label: 'Declined', icon: XCircle },
];

export default function ChangeOrdersPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<ChangeOrder[]>(mockChangeOrders);

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    const matchesSearch =
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getTabCount = (tabId: FilterTab) => {
    if (tabId === 'all') return orders.length;
    return orders.filter(order => order.status === tabId).length;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTotalValue = (status?: string) => {
    const relevantOrders = status && status !== 'all'
      ? orders.filter(order => order.status === status)
      : orders;

    return relevantOrders.reduce((total, order) => {
      if (status === 'approved' && order.status === 'approved') {
        return total + order.totalAmount;
      }
      if (!status || status === 'all') {
        return total + order.totalAmount;
      }
      return total;
    }, 0);
  };

  const handleView = (order: ChangeOrder) => {
    console.log('Viewing order:', order);
    // Navigate to order detail page
  };

  const handleEdit = (order: ChangeOrder) => {
    console.log('Editing order:', order);
    // Navigate to edit page
  };

  const handleDelete = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const handleSend = (order: ChangeOrder) => {
    console.log('Sending order:', order);
    // Update order status to sent
    setOrders(prev => prev.map(o =>
      o.id === order.id
        ? { ...o, status: 'sent' as const, sentDate: new Date().toISOString() }
        : o
    ));
  };

  const handleCopy = (order: ChangeOrder) => {
    // Generate email content and copy to clipboard
    const emailContent = `Subject: Change Order Request - ${order.projectName} - ${order.title}

Hi ${order.clientName},

I've reviewed your latest request regarding ${order.description.toLowerCase()}. After checking against our original project scope, this falls outside of what we agreed upon.

To accommodate this change, I'm proposing:

**Scope Addition:** ${order.description}
**Estimated Time:** ${order.estimatedHours} hours
**Additional Cost:** ${formatCurrency(order.totalAmount)}

This will ensure better project outcomes.

Please let me know if you'd like to proceed with this addition.

Best regards,
[Your Name]`;

    navigator.clipboard.writeText(emailContent);
    // Show toast notification
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Change Orders</h1>
          <p className="text-slate-500">
            Manage and track your scope change requests
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button asChild>
            <Link href="/dashboard/change-orders/new">
              <Plus className="h-4 w-4 mr-2" />
              New Change Order
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-slate-100">
              <FileText className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Total Orders</div>
              <div className="text-xl font-semibold text-slate-900">{orders.length}</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Approved</div>
              <div className="text-xl font-semibold text-green-700">{getTabCount('approved')}</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Send className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Pending</div>
              <div className="text-xl font-semibold text-blue-700">
                {getTabCount('pending') + getTabCount('sent')}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-100">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Approved Value</div>
              <div className="text-xl font-semibold text-purple-700">
                {formatCurrency(getTotalValue('approved'))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search change orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {getTabCount(tab.id) > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {getTabCount(tab.id)}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Change Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <ChangeOrderCard
                  key={order.id}
                  order={order}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSend={handleSend}
                  onCopy={handleCopy}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {searchQuery ? 'No matching change orders' : 'No change orders yet'}
            </h3>
            <p className="text-slate-500 mb-6">
              {searchQuery
                ? 'Try adjusting your search terms or filters'
                : 'Create your first change order to get started'
              }
            </p>
            {!searchQuery && (
              <Button asChild>
                <Link href="/dashboard/change-orders/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Change Order
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}