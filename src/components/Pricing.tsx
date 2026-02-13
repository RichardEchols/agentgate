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
    href: '/get-started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
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
    href: 'https://buy.stripe.com/5kQ4gzaKH8oddKueHH1Fe07',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/mo',
    description: 'For agencies managing multiple client sites',
    features: [
      'Everything in Pro',
      'Up to 25 websites',
      'API access',
      'Featured directory placement',
      'White-label snippet',
      'Dedicated support',
    ],
    cta: 'Go Enterprise',
    href: 'https://buy.stripe.com/eVq00jdWTdIx35Q6bb1Fe08',
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,220,130,0.04)_0%,transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[12px] font-semibold text-accent uppercase tracking-[0.2em] mb-4 block">Pricing</span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold tracking-[-0.02em] mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Start free. Upgrade when you need more control.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {plan.featured && (
                <div className="absolute -inset-[1px] bg-gradient-to-b from-accent/40 via-accent/20 to-transparent rounded-xl" />
              )}
              <div className={`relative rounded-xl p-7 h-full flex flex-col ${
                plan.featured
                  ? 'bg-bg-secondary shadow-[0_0_40px_rgba(0,220,130,0.08)]'
                  : 'bg-bg-secondary border border-border'
              }`}>
                {plan.featured && (
                  <span className="inline-block text-[11px] font-bold text-accent bg-accent/10 px-3 py-1 rounded-full mb-4 w-fit uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h3 className="text-[20px] font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-[38px] font-extrabold tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-[14px] text-text-tertiary">{plan.period}</span>}
                </div>
                <p className="text-[14px] text-text-secondary mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-accent' : 'text-accent/60'}`} />
                      <span className="text-[14px] text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.href.startsWith('http') ? (
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center px-6 py-3 font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] ${
                      plan.featured
                        ? 'bg-accent hover:bg-accent-hover text-bg-primary shadow-[0_0_20px_rgba(0,220,130,0.2)]'
                        : 'bg-white/5 hover:bg-white/8 text-text-primary border border-border hover:border-accent/20'
                    }`}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <Link
                    href={plan.href}
                    className={`block text-center px-6 py-3 font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] ${
                      plan.featured
                        ? 'bg-accent hover:bg-accent-hover text-bg-primary shadow-[0_0_20px_rgba(0,220,130,0.2)]'
                        : 'bg-white/5 hover:bg-white/8 text-text-primary border border-border hover:border-accent/20'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
