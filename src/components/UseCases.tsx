'use client'

import { motion } from 'framer-motion'
import { Scale, Scissors, Wrench, ShoppingCart, Stethoscope, GraduationCap } from 'lucide-react'

const useCases = [
  {
    icon: Scale,
    title: 'Law Firms',
    tool: 'book_consultation',
    prompt: '"Find me a personal injury lawyer in Dallas"',
    result: 'AI agent fills your contact form with the client\'s details.',
  },
  {
    icon: Scissors,
    title: 'Barbers & Salons',
    tool: 'book_appointment',
    prompt: '"Book me a haircut this Saturday"',
    result: 'AI agent finds your shop, picks a slot, and books it.',
  },
  {
    icon: Wrench,
    title: 'Contractors',
    tool: 'request_quote',
    prompt: '"I need a bathroom renovation quote"',
    result: 'AI agent fills your quote form with homeowner details.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    tool: 'search_products',
    prompt: '"Find me a blue leather wallet under $50"',
    result: 'AI agent searches inventory, compares, and adds to cart.',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    tool: 'schedule_visit',
    prompt: '"Schedule a dentist appointment next Tuesday"',
    result: 'AI agent checks availability and books directly.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    tool: 'enroll_course',
    prompt: '"Sign me up for the Python bootcamp"',
    result: 'AI agent handles enrollment forms seamlessly.',
  },
]

export function UseCases() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[12px] font-semibold text-system-teal uppercase tracking-[0.2em] mb-4 block">Use Cases</span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold tracking-[-0.02em] mb-4">
            Every Industry. Every Website.
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            If your website has a form, AgentGate makes it work with AI agents.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent/15 transition-all duration-400 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center">
                  <useCase.icon className="w-5 h-5 text-text-tertiary group-hover:text-accent transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold leading-tight">{useCase.title}</h3>
                  <span className="text-[11px] font-mono text-accent/70">{useCase.tool}()</span>
                </div>
              </div>
              <div className="bg-bg-tertiary/50 rounded-lg px-3 py-2 mb-3">
                <p className="text-[13px] text-text-secondary italic font-mono leading-snug">{useCase.prompt}</p>
              </div>
              <p className="text-[13px] text-text-tertiary leading-relaxed">{useCase.result}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
