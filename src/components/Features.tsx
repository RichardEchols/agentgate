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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(191,90,242,0.05)_0%,transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[34px] font-bold tracking-tight mb-4">Built for the AI Era</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Everything you need to make your website the first stop for AI agents looking for businesses like yours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-bg-secondary border border-white/10 rounded-2xl p-6 hover:bg-bg-tertiary hover:border-white/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-text-secondary group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-[17px] font-semibold mb-2">{feature.title}</h3>
              <p className="text-[15px] text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
