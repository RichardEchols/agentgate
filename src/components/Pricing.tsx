'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Get started with basic WebMCP tools',
    features: [
      'Auto-detect up to 3 forms',
      'Basic WebMCP registration',
      'Directory listing',
      'Community support',
    ],
    cta: 'Start Free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Full control with analytics and priority listing',
    features: [
      'Unlimited form detection',
      'Custom tool definitions',
      'Agent analytics dashboard',
      'Priority directory listing',
      'Custom tool descriptions',
      'Email support',
    ],
    cta: 'Go Pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For agencies managing multiple client sites',
    features: [
      'Everything in Pro',
      'Up to 25 websites',
      'API access',
      'Featured directory placement',
      'White-label snippet',
      'Dedicated support',
    ],
    cta: 'Contact Us',
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,132,255,0.06)_0%,transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[34px] font-bold tracking-tight mb-4">Simple Pricing</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Start free. Upgrade when you need more control over how AI agents interact with your site.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl p-8 transition-all duration-300 ${
                plan.featured
                  ? 'bg-gradient-to-b from-accent/20 to-bg-secondary border-2 border-accent/40 shadow-[0_0_40px_rgba(10,132,255,0.15)]'
                  : 'bg-bg-secondary border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.featured && (
                <span className="inline-block text-[12px] font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-[22px] font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[40px] font-bold tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-[15px] text-text-tertiary">{plan.period}</span>}
              </div>
              <p className="text-[15px] text-text-secondary mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-accent' : 'text-system-green'}`} />
                    <span className="text-[15px] text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/get-started"
                className={`block text-center px-6 py-3 font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] ${
                  plan.featured
                    ? 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
