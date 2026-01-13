'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Shield,
  LayoutDashboard,
  FolderOpen,
  Brain,
  FileText,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: FolderOpen,
  },
  {
    name: 'Scope Analyzer',
    href: '/dashboard/analyze',
    icon: Brain,
  },
  {
    name: 'Change Orders',
    href: '/dashboard/change-orders',
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-4 left-4 z-50"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-slate-900">ScopeShield</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <Separator />
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <nav className="p-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        className={cn(
          'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-40 lg:bg-white lg:border-r lg:border-slate-200 transition-all duration-300',
          collapsed ? 'lg:w-16' : 'lg:w-72',
          className
        )}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">ScopeShield</span>
            </div>
          )}
          {collapsed && (
            <Shield className="h-8 w-8 text-blue-600 mx-auto" />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Separator />

        <ScrollArea className="flex-1">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    collapsed && 'justify-center'
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {!collapsed && (
          <div className="p-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
              <h3 className="text-sm font-semibold">Upgrade to Pro</h3>
              <p className="text-xs mt-1 text-blue-100">
                Unlock advanced AI features and unlimited projects.
              </p>
              <Button
                size="sm"
                className="mt-3 bg-white text-blue-600 hover:bg-blue-50"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}