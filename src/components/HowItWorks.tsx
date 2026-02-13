'use client'

import { motion } from 'framer-motion'
import { Code2, Scan, Radio, Search } from 'lucide-react'

const steps = [
  {
    icon: Code2,
    num: '01',
    title: 'Paste One Line',
    description: 'Add a single script tag to your website. Works with any platform — WordPress, Shopify, Squarespace, custom builds.',
    color: 'text-accent',
    borderColor: 'border-accent/20',
    glowColor: 'shadow-accent/5',
  },
  {
    icon: Scan,
    num: '02',
    title: 'Auto-Detection',
    description: 'AgentGate scans your pages and automatically detects forms, buttons, and interactive elements. Turns them into structured tools.',
    color: 'text-system-teal',
    borderColor: 'border-system-teal/20',
    glowColor: 'shadow-system-teal/5',
  },
  {
    icon: Radio,
    num: '03',
    title: 'WebMCP Registration',
    description: 'Your website\'s tools are registered using Google\'s WebMCP standard. AI agents now know exactly how to interact with your site.',
    color: 'text-system-purple',
    borderColor: 'border-system-purple/20',
    glowColor: 'shadow-system-purple/5',
  },
  {
    icon: Search,
    num: '04',
    title: 'Get Discovered',
    description: 'Your tools are listed in the AgentGate Directory. When an AI agent needs a service like yours, it finds you first.',
    color: 'text-system-orange',
    borderColor: 'border-system-orange/20',
    glowColor: 'shadow-system-orange/5',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,220,130,0.03)_0%,transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[12px] font-semibold text-accent uppercase tracking-[0.2em] mb-4 block">How It Works</span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold tracking-[-0.02em] mb-4">
            Four Steps to <span className="text-gradient">AI-Ready</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Five minutes. Your website becomes visible to every AI agent on the internet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-bg-secondary border ${step.borderColor} rounded-xl p-6 hover:shadow-lg ${step.glowColor} transition-all duration-400 group`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <span className={`text-[28px] font-extrabold ${step.color} opacity-20`}>{step.num}</span>
              </div>
              <h3 className="text-[16px] font-bold mb-2">{step.title}</h3>
              <p className="text-[14px] text-text-secondary leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
