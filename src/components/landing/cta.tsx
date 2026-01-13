'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';

export function CTA() {
  return (
    <section className="bg-blue-600">
      <div className="px-6 py-20 mx-auto max-w-7xl lg:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Shield className="mx-auto h-16 w-16 text-blue-200 mb-8" />
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to protect your profits?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Join thousands of freelancers who have saved millions in lost revenue with ScopeShield's
            AI-powered scope protection.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
            >
              <a href="/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-200 text-white hover:bg-blue-500"
            >
              <a href="#contact">
                Schedule Demo
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-blue-200">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}