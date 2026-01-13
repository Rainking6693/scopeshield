'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Solo',
    description: 'Perfect for individual freelancers starting their scope protection journey.',
    price: '$29',
    period: 'per month',
    features: [
      'Up to 5 active projects',
      'Email integration',
      'Basic scope detection',
      'Change order templates',
      'Mobile app access',
      'Email support',
    ],
    cta: 'Start Solo Plan',
    popular: false,
  },
  {
    name: 'Team',
    description: 'Ideal for small agencies and teams managing multiple client projects.',
    price: '$49',
    period: 'per month',
    features: [
      'Up to 20 active projects',
      'Email + Slack integration',
      'Advanced AI scope detection',
      'Automated change orders',
      'Team collaboration tools',
      'Priority support',
      'Custom integrations',
      'Advanced analytics',
    ],
    cta: 'Start Team Plan',
    popular: true,
  },
  {
    name: 'Agency',
    description: 'For larger agencies requiring enterprise-level scope protection.',
    price: '$99',
    period: 'per month',
    features: [
      'Unlimited projects',
      'All communication integrations',
      'AI-powered risk assessment',
      'Custom change order workflows',
      'White-label solutions',
      'Dedicated account manager',
      'API access',
      'Custom training sessions',
      'SLA guarantee',
    ],
    cta: 'Start Agency Plan',
    popular: false,
  },
];

const testimonials = [
  {
    quote: "ScopeShield saved me over $15,000 in the first quarter alone. The AI caught scope changes I would have missed completely.",
    author: "Sarah Chen",
    role: "UX Designer",
    company: "Freelance",
  },
  {
    quote: "As an agency, we were losing money on every project due to scope creep. ScopeShield helped us protect our margins and improve client relationships.",
    author: "Michael Rodriguez",
    role: "Creative Director",
    company: "Design Studio Pro",
  },
  {
    quote: "The automated change orders are a game-changer. Professional, accurate, and they maintain great client relationships.",
    author: "Jennifer Walsh",
    role: "Web Developer",
    company: "Walsh Digital",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Pricing header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose your protection level
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Start protecting your projects today. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto mt-16 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative ${tier.popular ? 'border-2 border-blue-600 shadow-xl' : 'border shadow-lg'}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center space-x-1 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-slate-900">{tier.name}</CardTitle>
                <CardDescription className="mt-4 text-slate-600">
                  {tier.description}
                </CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">
                    {tier.price}
                  </span>
                  <span className="text-base font-medium text-slate-500">/{tier.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="ml-3 text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={tier.popular ? 'default' : 'outline'}
                  size="lg"
                >
                  <a href="/signup">
                    {tier.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social proof section */}
        <div className="mt-20 sm:mt-28">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Trusted by thousands of freelancers
            </h3>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              See how ScopeShield is helping freelancers and agencies protect their profits.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg border-0">
                <CardContent className="pt-6">
                  <blockquote className="text-slate-700">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-6">
                    <div className="font-semibold text-slate-900">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Money-back guarantee */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl bg-blue-50 p-8">
              <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2 text-blue-600">
                  <Check className="h-6 w-6" />
                  <span className="font-semibold">30-Day Money-Back Guarantee</span>
                </div>
              </div>
              <p className="text-slate-600">
                Not satisfied with your scope protection? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}