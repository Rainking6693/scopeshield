'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MessageSquare, FileText, Shield, Zap, TrendingUp } from 'lucide-react';

const features = [
  {
    title: 'AI Scope Analyzer',
    description: 'Advanced AI detects potential scope changes in project communications, contracts, and client requests before they impact your budget.',
    icon: Brain,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Communication Monitor',
    description: 'Real-time analysis of emails, Slack messages, and project updates to identify scope creep signals and unauthorized requests.',
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Change Order Generator',
    description: 'Automatically generate professional change orders with accurate pricing, timeline adjustments, and scope documentation.',
    icon: FileText,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
];

const additionalFeatures = [
  {
    title: 'Project Protection',
    description: 'Shield your projects from unauthorized scope changes with intelligent monitoring.',
    icon: Shield,
  },
  {
    title: 'Instant Alerts',
    description: 'Get notified immediately when scope creep is detected in your communications.',
    icon: Zap,
  },
  {
    title: 'Profit Optimization',
    description: 'Protect your margins and increase profitability by catching scope changes early.',
    icon: TrendingUp,
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Protect your projects with AI-powered scope management
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Stop losing money to scope creep. Our AI monitors your projects 24/7 and helps you
            maintain profitable boundaries with clients.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600 leading-7">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional features section */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Why freelancers choose ScopeShield
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {additionalFeatures.map((feature) => (
                <div key={feature.title} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Problem/Solution section */}
        <div id="about" className="mt-20 sm:mt-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-blue-600">The Problem</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Scope creep is killing your profits
                  </p>
                  <p className="mt-6 text-lg leading-8 text-slate-600">
                    On average, freelancers lose 23% of project revenue to uncompensated scope changes.
                    That's thousands of dollars in lost income every year.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-600 lg:max-w-none">
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-slate-900">
                        <span className="absolute left-1 top-1 h-5 w-5 text-red-500">⚠️</span>
                        Hidden scope changes
                      </dt>
                      <dd className="inline ml-1">buried in long email threads and casual conversations</dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-slate-900">
                        <span className="absolute left-1 top-1 h-5 w-5 text-red-500">⚠️</span>
                        Delayed detection
                      </dt>
                      <dd className="inline ml-1">means you're already committed before realizing the scope changed</dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-slate-900">
                        <span className="absolute left-1 top-1 h-5 w-5 text-red-500">⚠️</span>
                        Difficult conversations
                      </dt>
                      <dd className="inline ml-1">about additional fees damage client relationships</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="lg:pl-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-green-600">The Solution</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    AI that protects your projects
                  </p>
                  <p className="mt-6 text-lg leading-8 text-slate-600">
                    ScopeShield's AI monitors all project communications and detects scope changes
                    the moment they happen, giving you the power to protect your profits.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-600 lg:max-w-none">
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-slate-900">
                        <span className="absolute left-1 top-1 h-5 w-5 text-green-500">✅</span>
                        Instant detection
                      </dt>
                      <dd className="inline ml-1">of scope changes in emails, messages, and documents</dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-slate-900">
                        <span className="absolute left-1 top-1 h-5 w-5 text-green-500">✅</span>
                        Automated documentation
                      </dt>
                      <dd className="inline ml-1">generates professional change orders with proper pricing</dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-slate-900">
                        <span className="absolute left-1 top-1 h-5 w-5 text-green-500">✅</span>
                        Professional protection
                      </dt>
                      <dd className="inline ml-1">maintains client relationships while protecting your profits</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}