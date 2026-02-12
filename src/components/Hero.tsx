'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Bot, Globe, Zap } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-system-green rounded-full animate-pulse" />
          <span className="text-[13px] font-medium text-accent">Built on Google&apos;s WebMCP Standard</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Make Your Website
          <br />
          <span className="bg-gradient-to-r from-accent via-system-teal to-system-purple bg-clip-text text-transparent">
            AI-Agent Ready
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          One script tag turns your website into a set of tools that AI agents can discover and use.
          No rebuilds. No APIs. Just paste and go.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/get-started"
            className="group px-8 py-4 bg-accent hover:bg-accent-hover text-white text-[17px] font-semibold rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.98] shadow-lg shadow-accent/25 hover:shadow-accent/40 flex items-center gap-2"
          >
            Get Your Snippet
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/directory"
            className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white text-[17px] font-medium rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 active:scale-[0.98]"
          >
            Browse Directory
          </Link>
        </motion.div>

        {/* Visual demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-bg-secondary border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50">
            {/* Before/After flow */}
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* Your Website */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-bg-tertiary rounded-2xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-text-secondary" />
                </div>
                <p className="text-[15px] font-semibold mb-1">Your Website</p>
                <p className="text-[13px] text-text-tertiary">Any site with forms</p>
              </div>

              {/* AgentGate */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-2xl flex items-center justify-center" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <p className="text-[15px] font-semibold text-accent mb-1">AgentGate Snippet</p>
                <p className="text-[13px] text-text-tertiary">One line of code</p>
              </div>

              {/* AI Agents */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-system-green/20 rounded-2xl flex items-center justify-center">
                  <Bot className="w-8 h-8 text-system-green" />
                </div>
                <p className="text-[15px] font-semibold mb-1">AI Agents Find You</p>
                <p className="text-[13px] text-text-tertiary">Automated interactions</p>
              </div>
            </div>

            {/* Code preview */}
            <div className="mt-8 bg-black/50 rounded-xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-system-pink/80" />
                <div className="w-3 h-3 rounded-full bg-system-orange/80" />
                <div className="w-3 h-3 rounded-full bg-system-green/80" />
                <span className="text-[11px] text-text-tertiary ml-2 font-mono">index.html</span>
              </div>
              <pre className="text-[14px] font-mono leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-text-tertiary">{`<!-- Add this one line before </body> -->`}</span>
                  {'\n'}
                  <span className="text-system-pink">&lt;script </span>
                  <span className="text-system-orange">src</span>
                  <span className="text-text-tertiary">=</span>
                  <span className="text-system-green">&quot;https://agentgate.dev/s/YOUR_ID.js&quot;</span>
                  <span className="text-system-pink">&gt;&lt;/script&gt;</span>
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
