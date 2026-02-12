'use client'

import { motion } from 'framer-motion'
import { Scale, Scissors, Wrench, ShoppingCart, Stethoscope, GraduationCap } from 'lucide-react'

const useCases = [
  {
    icon: Scale,
    title: 'Law Firms',
    tool: 'book_consultation',
    description: 'AI agents book consultations for potential clients 24/7. "Find me a personal injury lawyer in Dallas" → your form, filled and submitted.',
  },
  {
    icon: Scissors,
    title: 'Barbers & Salons',
    tool: 'book_appointment',
    description: '"Book me a haircut this Saturday" → the AI agent finds your shop, picks an available slot, fills the booking form.',
  },
  {
    icon: Wrench,
    title: 'Contractors',
    tool: 'request_quote',
    description: '"I need a bathroom renovation quote" → AI agent fills out your quote request with the homeowner\'s details automatically.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    tool: 'search_products',
    description: '"Find me a blue leather wallet under $50" → AI agent searches your inventory, compares options, adds to cart.',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    tool: 'schedule_visit',
    description: '"Schedule a dentist appointment next Tuesday" → AI agent checks availability and books directly through your site.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    tool: 'enroll_course',
    description: '"Sign me up for the Python bootcamp starting in March" → AI agent handles enrollment forms seamlessly.',
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
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[34px] font-bold tracking-tight mb-4">Every Industry. Every Website.</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            If your website has a form, AgentGate makes it work with AI agents. Here&apos;s what that looks like.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-bg-secondary border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <useCase.icon className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold">{useCase.title}</h3>
                  <span className="text-[12px] font-mono text-accent">{useCase.tool}()</span>
                </div>
              </div>
              <p className="text-[15px] text-text-secondary leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
