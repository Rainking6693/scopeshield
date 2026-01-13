'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  CheckCircle,
  Calendar,
  Download,
  ExternalLink,
  Crown,
  Zap,
  Building,
  Star
} from 'lucide-react';

interface BillingInfo {
  plan: 'solo' | 'team' | 'agency';
  planName: string;
  price: string;
  billingCycle: 'monthly' | 'yearly';
  nextBilling: string;
  paymentMethod: string;
  lastFour: string;
  status: 'active' | 'past_due' | 'canceled';
}

export function BillingSection() {
  const [billingInfo] = useState<BillingInfo>({
    plan: 'team',
    planName: 'Team Plan',
    price: '$49',
    billingCycle: 'monthly',
    nextBilling: 'March 15, 2024',
    paymentMethod: 'Visa',
    lastFour: '4242',
    status: 'active'
  });

  const plans = [
    {
      id: 'solo',
      name: 'Solo Freelancer',
      price: { monthly: 19, yearly: 190 },
      icon: Star,
      description: 'Perfect for individual freelancers',
      features: [
        '5 active projects',
        'Basic scope analysis',
        'Email notifications',
        'Change order tracking',
        'Client communication tools'
      ],
      current: billingInfo.plan === 'solo'
    },
    {
      id: 'team',
      name: 'Team Plan',
      price: { monthly: 49, yearly: 490 },
      icon: Zap,
      description: 'For small teams and agencies',
      features: [
        '25 active projects',
        'Advanced AI analysis',
        'Team collaboration',
        'Custom integrations',
        'Priority support',
        'Advanced reporting'
      ],
      current: billingInfo.plan === 'team',
      popular: true
    },
    {
      id: 'agency',
      name: 'Agency Plan',
      price: { monthly: 99, yearly: 990 },
      icon: Building,
      description: 'For large agencies and enterprises',
      features: [
        'Unlimited projects',
        'White-label options',
        'Custom workflows',
        'API access',
        'Dedicated support',
        'Advanced analytics',
        'Custom integrations'
      ],
      current: billingInfo.plan === 'agency'
    }
  ];

  const recentInvoices = [
    { id: '1', date: 'Feb 15, 2024', amount: '$49.00', status: 'paid' },
    { id: '2', date: 'Jan 15, 2024', amount: '$49.00', status: 'paid' },
    { id: '3', date: 'Dec 15, 2023', amount: '$49.00', status: 'paid' },
  ];

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Subscription
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {billingInfo.status === 'active' ? 'Active' : billingInfo.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{billingInfo.planName}</h3>
              <p className="text-slate-600">
                {billingInfo.price}/{billingInfo.billingCycle}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Next billing</p>
              <p className="font-medium">{billingInfo.nextBilling}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-slate-500" />
              <span className="text-sm">
                {billingInfo.paymentMethod} •••• {billingInfo.lastFour}
              </span>
            </div>
            <Button variant="outline" size="sm">
              Update Payment Method
            </Button>
          </div>

          <div className="flex space-x-3 pt-2">
            <Button variant="outline">
              Cancel Subscription
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Upgrade or downgrade your plan at any time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative border rounded-lg p-6 ${
                    plan.current
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-slate-200'
                  } ${
                    plan.popular ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                      Most Popular
                    </Badge>
                  )}

                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-sm text-slate-600">{plan.description}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-3xl font-bold">
                        ${plan.price.monthly}
                        <span className="text-sm font-normal text-slate-600">/month</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        or ${plan.price.yearly}/year (save 17%)
                      </p>
                    </div>

                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.current
                          ? 'bg-slate-600 hover:bg-slate-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      disabled={plan.current}
                    >
                      {plan.current ? 'Current Plan' : 'Upgrade Now'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>
            View and download your billing history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-full">
                    <Calendar className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.amount}</p>
                    <p className="text-sm text-slate-600">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Paid
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Button variant="outline" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Invoices
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}