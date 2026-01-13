'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ScopeItemCard, ScopeItem } from './scope-item';
import {
  Brain,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Filter,
  Download,
  Save,
  BarChart3,
  FileText,
  Clock,
  DollarSign,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

interface ScopeAnalysisResult {
  projectName: string;
  analysisDate: Date;
  confidence: number;
  totalItems: number;
  inScopeItems: number;
  outOfScopeItems: number;
  unclearItems: number;
  estimatedTotalHours: number;
  estimatedTotalCost: number;
  items: ScopeItem[];
}

interface ScopeResultsProps {
  result: ScopeAnalysisResult;
  onSaveProject?: (result: ScopeAnalysisResult) => void;
  onItemEdit?: (item: ScopeItem) => void;
  onItemDelete?: (id: string) => void;
  onItemStatusChange?: (id: string, status: ScopeItem['status']) => void;
}

export function ScopeResults({
  result,
  onSaveProject,
  onItemEdit,
  onItemDelete,
  onItemStatusChange,
}: ScopeResultsProps) {
  const [filters, setFilters] = useState({
    status: [] as ScopeItem['status'][],
    confidence: [] as ScopeItem['confidence'][],
    category: [] as ScopeItem['category'][],
    priority: [] as ScopeItem['priority'][],
  });

  const filteredItems = result.items.filter((item) => {
    if (filters.status.length > 0 && !filters.status.includes(item.status)) {
      return false;
    }
    if (filters.confidence.length > 0 && !filters.confidence.includes(item.confidence)) {
      return false;
    }
    if (filters.category.length > 0 && !filters.category.includes(item.category)) {
      return false;
    }
    if (filters.priority.length > 0 && !filters.priority.includes(item.priority)) {
      return false;
    }
    return true;
  });

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const currentValues = prev[type] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [type]: newValues
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      status: [],
      confidence: [],
      category: [],
      priority: [],
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((sum, filterArray) => sum + filterArray.length, 0);
  };

  return (
    <div className="space-y-6">
      {/* Analysis Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-blue-100">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Analysis Complete</CardTitle>
              <CardDescription>
                {result.projectName} • {result.analysisDate.toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Confidence */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Analysis Confidence</span>
              <span className="text-sm text-slate-500">{result.confidence}%</span>
            </div>
            <Progress value={result.confidence} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-slate-50">
              <FileText className="h-5 w-5 text-slate-600 mx-auto mb-1" />
              <div className="text-lg font-semibold text-slate-900">{result.totalItems}</div>
              <div className="text-xs text-slate-500">Total Items</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1" />
              <div className="text-lg font-semibold text-green-700">{result.inScopeItems}</div>
              <div className="text-xs text-slate-500">In Scope</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600 mx-auto mb-1" />
              <div className="text-lg font-semibold text-red-700">{result.outOfScopeItems}</div>
              <div className="text-xs text-slate-500">Out of Scope</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-50">
              <XCircle className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
              <div className="text-lg font-semibold text-yellow-700">{result.unclearItems}</div>
              <div className="text-xs text-slate-500">Unclear</div>
            </div>
          </div>

          {/* Estimates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-semibold text-blue-900">{result.estimatedTotalHours} hours</div>
                <div className="text-xs text-blue-700">Estimated work</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-semibold text-green-900">{formatCurrency(result.estimatedTotalCost)}</div>
                <div className="text-xs text-green-700">Estimated cost</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              onClick={() => onSaveProject?.(result)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save as Project
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scope Items */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Scope Items</CardTitle>
              <CardDescription>
                Detailed breakdown of identified scope elements
              </CardDescription>
            </div>

            {/* Filters */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={filters.status.includes('in-scope')}
                  onCheckedChange={() => toggleFilter('status', 'in-scope')}
                >
                  In Scope
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.status.includes('out-of-scope')}
                  onCheckedChange={() => toggleFilter('status', 'out-of-scope')}
                >
                  Out of Scope
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.status.includes('unclear')}
                  onCheckedChange={() => toggleFilter('status', 'unclear')}
                >
                  Unclear
                </DropdownMenuCheckboxItem>

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Confidence</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={filters.confidence.includes('high')}
                  onCheckedChange={() => toggleFilter('confidence', 'high')}
                >
                  High
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.confidence.includes('medium')}
                  onCheckedChange={() => toggleFilter('confidence', 'medium')}
                >
                  Medium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.confidence.includes('low')}
                  onCheckedChange={() => toggleFilter('confidence', 'low')}
                >
                  Low
                </DropdownMenuCheckboxItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearAllFilters}>
                  Clear All Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <ScopeItemCard
                    key={item.id}
                    item={item}
                    onEdit={onItemEdit}
                    onDelete={onItemDelete}
                    onStatusChange={onItemStatusChange}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-slate-400 mb-2">No items match the current filters</div>
                  <Button variant="outline" size="sm" onClick={clearAllFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}