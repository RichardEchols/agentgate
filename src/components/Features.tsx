'use client'

import { motion } from 'framer-motion'
import { Shield, Gauge, Eye, Layers, BarChart3, Plug } from 'lucide-react'

const features = [
  {
    icon: Gauge,
    title: 'Zero Performance Impact',
    description: 'Lightweight snippet loads asynchronously. Your site stays fast. No layout shifts, no blocking scripts.',
  },
  {
    icon: Eye,
    title: 'Smart Form Detection',
    description: 'Automatically identifies contact forms, booking forms, search bars, and checkout flows. No manual config needed.',
  },
  {
    icon: Shield,
    title: 'User Stays in Control',
    description: 'AI agents fill forms, but users confirm submissions. WebMCP requires user approval before any action completes.',
  },
  {
    icon: Layers,
    title: 'Works With Any Stack',
    description: 'WordPress, Shopify, Squarespace, Next.js, custom HTML — if it has forms, AgentGate makes them AI-compatible.',
  },
  {
    icon: BarChart3,
    title: 'Agent Analytics',
    description: 'See which AI agents are discovering and using your tools. Track how many automated interactions your site receives.',
  },
  {
    icon: Plug,
    title: 'Directory Listing',
    description: 'Your tools are automatically listed in the AgentGate Directory — the first search engine built for AI agents.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(123,97,255,0.04)_0%,transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[12px] font-semibold text-secondary uppercase tracking-[0.2em] mb-4 block">Features</span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold tracking-[-0.02em] mb-4">
            Built for the <span className="text-gradient">AI Era</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Everything you need to make your website the first stop for AI agents looking for businesses like yours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent/15 transition-all duration-400 group"
            >
              <div className="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-text-tertiary group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-[16px] font-bold mb-2">{feature.title}</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
