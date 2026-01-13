'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Clock,
  DollarSign,
  Edit,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ScopeItem {
  id: string;
  title: string;
  description: string;
  category: 'feature' | 'deliverable' | 'timeline' | 'budget' | 'requirement';
  status: 'in-scope' | 'out-of-scope' | 'unclear';
  confidence: 'high' | 'medium' | 'low';
  estimatedHours?: number;
  estimatedCost?: number;
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

interface ScopeItemProps {
  item: ScopeItem;
  onEdit?: (item: ScopeItem) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: ScopeItem['status']) => void;
}

export function ScopeItemCard({
  item,
  onEdit,
  onDelete,
  onStatusChange
}: ScopeItemProps) {
  const statusConfig = {
    'in-scope': {
      icon: CheckCircle,
      color: 'bg-green-100 text-green-700',
      borderColor: 'border-green-200',
      label: 'In Scope',
    },
    'out-of-scope': {
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-700',
      borderColor: 'border-red-200',
      label: 'Out of Scope',
    },
    'unclear': {
      icon: XCircle,
      color: 'bg-yellow-100 text-yellow-700',
      borderColor: 'border-yellow-200',
      label: 'Unclear',
    },
  };

  const confidenceConfig = {
    high: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-red-100 text-red-700',
  };

  const priorityConfig = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-blue-100 text-blue-700',
  };

  const categoryConfig = {
    feature: { icon: FileText, label: 'Feature' },
    deliverable: { icon: CheckCircle, label: 'Deliverable' },
    timeline: { icon: Clock, label: 'Timeline' },
    budget: { icon: DollarSign, label: 'Budget' },
    requirement: { icon: AlertTriangle, label: 'Requirement' },
  };

  const currentStatus = statusConfig[item.status];
  const CategoryIcon = categoryConfig[item.category].icon;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className={`border-l-4 ${currentStatus.borderColor} hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-1 rounded-md bg-slate-100">
                <CategoryIcon className="h-4 w-4 text-slate-600" />
              </div>
              <Badge variant="outline" className="text-xs">
                {categoryConfig[item.category].label}
              </Badge>
              <Badge className={confidenceConfig[item.confidence]} variant="secondary">
                {item.confidence.toUpperCase()}
              </Badge>
              <Badge className={priorityConfig[item.priority]} variant="secondary">
                {item.priority.toUpperCase()}
              </Badge>
            </div>

            {/* Title and Description */}
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              {item.description}
            </p>

            {/* Estimates */}
            {(item.estimatedHours || item.estimatedCost) && (
              <div className="flex items-center space-x-4 mb-3 text-xs text-slate-500">
                {item.estimatedHours && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.estimatedHours}h</span>
                  </div>
                )}
                {item.estimatedCost && (
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span>{formatCurrency(item.estimatedCost)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Notes */}
            {item.notes && (
              <div className="p-2 bg-slate-50 rounded-md mb-3">
                <p className="text-xs text-slate-600">{item.notes}</p>
              </div>
            )}

            {/* Status */}
            <div className="flex items-center justify-between">
              <Badge className={currentStatus.color} variant="secondary">
                <currentStatus.icon className="h-3 w-3 mr-1" />
                {currentStatus.label}
              </Badge>

              {/* Quick actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit?.(item)}
                  className="h-6 px-2 text-slate-500 hover:text-slate-700"
                >
                  <Edit className="h-3 w-3" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-slate-500 hover:text-slate-700"
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onStatusChange?.(item.id, 'in-scope')}>
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Mark as In Scope
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange?.(item.id, 'out-of-scope')}>
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                      Mark as Out of Scope
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange?.(item.id, 'unclear')}>
                      <XCircle className="h-4 w-4 mr-2 text-yellow-600" />
                      Mark as Unclear
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete?.(item.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      Delete Item
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}