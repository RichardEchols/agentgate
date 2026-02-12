'use client'

import { motion } from 'framer-motion'
import { Code2, Scan, Radio, Search } from 'lucide-react'

const steps = [
  {
    icon: Code2,
    title: 'Paste One Line',
    description: 'Add a single script tag to your website. Works with any platform — WordPress, Shopify, Squarespace, custom builds.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Scan,
    title: 'Auto-Detection',
    description: 'AgentGate scans your pages and automatically detects forms, buttons, and interactive elements. Turns them into structured tools.',
    color: 'text-system-green',
    bgColor: 'bg-system-green/10',
  },
  {
    icon: Radio,
    title: 'WebMCP Registration',
    description: 'Your website\'s tools are registered using Google\'s WebMCP standard. AI agents now know exactly how to interact with your site.',
    color: 'text-system-purple',
    bgColor: 'bg-system-purple/10',
  },
  {
    icon: Search,
    title: 'Get Discovered',
    description: 'Your tools are listed in the AgentGate Directory. When an AI agent needs a service like yours, it finds you first.',
    color: 'text-system-orange',
    bgColor: 'bg-system-orange/10',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-[34px] font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Four steps. Five minutes. Your website becomes visible to every AI agent on the internet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-bg-secondary border border-white/10 rounded-2xl p-6 hover:bg-bg-tertiary hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${step.bgColor} flex items-center justify-center`}>
                  <step.icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <span className="text-[13px] font-mono text-text-tertiary">Step {i + 1}</span>
              </div>
              <h3 className="text-[17px] font-semibold mb-2">{step.title}</h3>
              <p className="text-[15px] text-text-secondary leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
