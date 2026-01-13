'use client';

import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              <Shield className="h-4 w-4" />
              <span>AI-Powered Protection</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Stop Losing Money to
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {" "}Scope Creep
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
            Protect your freelance projects with AI that detects scope changes in real-time,
            monitors client communications, and generates professional change orders instantly.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <a href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#features">
                Watch Demo
              </a>
            </Button>
          </div>

          <div className="mt-12 flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-8 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="aspect-video w-full rounded-lg bg-white shadow-2xl ring-1 ring-slate-900/10">
              <div className="flex h-full items-center justify-center text-slate-400">
                <div className="text-center">
                  <Shield className="mx-auto h-16 w-16 mb-4 text-blue-600" />
                  <p className="text-lg font-medium text-slate-600">ScopeShield Dashboard</p>
                  <p className="text-sm">Your projects protected in real-time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-green-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
}