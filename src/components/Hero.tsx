'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Terminal } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,220,130,0.07)_0%,transparent_50%)]" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/3 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/3 rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent/8 border border-accent/15 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="text-[12px] font-medium text-accent tracking-wide uppercase">Built on Google&apos;s WebMCP Standard</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-[72px] font-extrabold tracking-[-0.03em] leading-[1.05] mb-7"
        >
          Make Your Website
          <br />
          <span className="text-gradient">AI-Agent Ready</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          One script tag turns your website into a set of tools that AI agents
          can discover and use. No rebuilds. No APIs. Just paste and go.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            href="/get-started"
            className="group px-8 py-3.5 bg-accent hover:bg-accent-hover text-bg-primary text-[16px] font-semibold rounded-xl transition-all duration-300 active:scale-[0.97] shadow-[0_0_30px_rgba(0,220,130,0.2)] hover:shadow-[0_0_40px_rgba(0,220,130,0.35)] flex items-center gap-2"
          >
            Get Your Snippet
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/directory"
            className="px-8 py-3.5 bg-white/5 hover:bg-white/8 text-text-primary text-[16px] font-medium rounded-xl border border-border hover:border-accent/20 transition-all duration-300 active:scale-[0.97]"
          >
            Browse Directory
          </Link>
        </motion.div>

        {/* Code demo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Glow behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-tertiary/20 to-secondary/20 rounded-2xl blur-xl opacity-50" />

          <div className="relative bg-bg-secondary border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            {/* Terminal header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-bg-tertiary/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-system-pink/70" />
                <div className="w-3 h-3 rounded-full bg-system-orange/70" />
                <div className="w-3 h-3 rounded-full bg-accent/70" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <Terminal className="w-3.5 h-3.5 text-text-tertiary" />
                <span className="text-[12px] text-text-tertiary font-mono">index.html</span>
              </div>
            </div>

            {/* Code content */}
            <div className="p-6">
              <pre className="text-[14px] md:text-[15px] font-mono leading-[1.8] text-left overflow-x-auto">
                <code>
                  <span className="text-text-tertiary select-none">{'  '}</span>
                  <span className="text-text-tertiary">{`<!-- Add before </body> -->`}</span>
                  {'\n'}
                  <span className="text-text-tertiary select-none">{'  '}</span>
                  <span className="text-system-pink">&lt;script</span>
                  {'\n'}
                  <span className="text-text-tertiary select-none">{'    '}</span>
                  <span className="text-system-orange">src</span>
                  <span className="text-text-tertiary">=</span>
                  <span className="text-accent">&quot;https://getagentgate.com/s/YOUR_ID.js&quot;</span>
                  {'\n'}
                  <span className="text-text-tertiary select-none">{'    '}</span>
                  <span className="text-system-orange">defer</span>
                  {'\n'}
                  <span className="text-text-tertiary select-none">{'  '}</span>
                  <span className="text-system-pink">&gt;&lt;/script&gt;</span>
                </code>
              </pre>
            </div>

            {/* Bottom status bar */}
            <div className="px-5 py-2.5 border-t border-border bg-bg-tertiary/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-[11px] text-accent font-mono">WebMCP Ready</span>
              </div>
              <span className="text-[11px] text-text-tertiary font-mono">1 line &middot; 0 dependencies</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
