'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FileText,
  Clock,
  DollarSign,
  Calendar,
  Eye,
  Copy,
  Send,
  MoreVertical,
  Edit,
  Download,
  Trash,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ChangeOrder {
  id: string;
  title: string;
  description: string;
  projectName: string;
  projectId: string;
  clientName: string;
  clientAvatar?: string;
  status: 'pending' | 'sent' | 'approved' | 'declined' | 'draft';
  estimatedHours: number;
  hourlyRate: number;
  totalAmount: number;
  createdDate: string;
  sentDate?: string;
  responseDate?: string;
  notes?: string;
}

interface ChangeOrderCardProps {
  order: ChangeOrder;
  onView?: (order: ChangeOrder) => void;
  onEdit?: (order: ChangeOrder) => void;
  onDelete?: (id: string) => void;
  onSend?: (order: ChangeOrder) => void;
  onCopy?: (order: ChangeOrder) => void;
}

export function ChangeOrderCard({
  order,
  onView,
  onEdit,
  onDelete,
  onSend,
  onCopy,
}: ChangeOrderCardProps) {
  const statusConfig = {
    draft: {
      label: 'Draft',
      color: 'bg-slate-100 text-slate-700',
      icon: FileText,
    },
    pending: {
      label: 'Pending',
      color: 'bg-yellow-100 text-yellow-700',
      icon: Clock,
    },
    sent: {
      label: 'Sent',
      color: 'bg-blue-100 text-blue-700',
      icon: Send,
    },
    approved: {
      label: 'Approved',
      color: 'bg-green-100 text-green-700',
      icon: FileText,
    },
    declined: {
      label: 'Declined',
      color: 'bg-red-100 text-red-700',
      icon: FileText,
    },
  };

  const currentStatus = statusConfig[order.status];

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

  const getTimelineText = () => {
    if (order.status === 'draft' || order.status === 'pending') {
      return `Created ${formatDate(order.createdDate)}`;
    }
    if (order.status === 'sent' && order.sentDate) {
      return `Sent ${formatDate(order.sentDate)}`;
    }
    if ((order.status === 'approved' || order.status === 'declined') && order.responseDate) {
      return `${order.status === 'approved' ? 'Approved' : 'Declined'} ${formatDate(order.responseDate)}`;
    }
    return `Created ${formatDate(order.createdDate)}`;
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={order.clientAvatar} alt={order.clientName} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-xs">
                  {order.clientName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-slate-900">{order.title}</h3>
                <p className="text-sm text-slate-500">
                  {order.projectName} • {order.clientName}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">
              {order.description}
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                <span>{order.estimatedHours}h</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <DollarSign className="h-4 w-4" />
                <span>{formatCurrency(order.hourlyRate)}/hr</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-medium text-slate-900">
                <span>Total: {formatCurrency(order.totalAmount)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                <span>{getTimelineText()}</span>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="p-3 bg-slate-50 rounded-md mb-4">
                <p className="text-sm text-slate-600">{order.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Badge className={currentStatus.color} variant="secondary">
                <currentStatus.icon className="h-3 w-3 mr-1" />
                {currentStatus.label}
              </Badge>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView?.(order)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>

                {order.status === 'draft' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit?.(order)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onSend?.(order)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                  </>
                )}

                {order.status === 'sent' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCopy?.(order)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-slate-500"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView?.(order)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(order)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCopy?.(order)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete?.(order.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
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