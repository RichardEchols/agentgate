'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/70 backdrop-blur-2xl border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-tertiary flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(0,220,130,0.4)]">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 20V10Q7 4 12 4Q17 4 17 10V20" />
              <line x1="12" y1="8" x2="12" y2="16" strokeWidth="2" opacity="0.7" />
            </svg>
          </div>
          <span className="text-[17px] font-bold tracking-tight">
            Agent<span className="text-accent">Gate</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-[14px] text-text-secondary hover:text-accent transition-colors duration-200">How It Works</Link>
          <Link href="#features" className="text-[14px] text-text-secondary hover:text-accent transition-colors duration-200">Features</Link>
          <Link href="#pricing" className="text-[14px] text-text-secondary hover:text-accent transition-colors duration-200">Pricing</Link>
          <Link href="/directory" className="text-[14px] text-text-secondary hover:text-accent transition-colors duration-200">Directory</Link>
          <Link href="/blog" className="text-[14px] text-text-secondary hover:text-accent transition-colors duration-200">Blog</Link>
          <Link
            href="/get-started"
            className="px-5 py-2 bg-accent hover:bg-accent-hover text-bg-primary text-[14px] font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] hover:shadow-[0_0_20px_rgba(0,220,130,0.3)]"
          >
            Get Started
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-text-secondary hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-bg-secondary/95 backdrop-blur-2xl border-t border-border px-6 py-4 space-y-1">
          <Link href="#how-it-works" onClick={() => setOpen(false)} className="block text-[15px] text-text-secondary hover:text-accent py-2.5 transition-colors">How It Works</Link>
          <Link href="#features" onClick={() => setOpen(false)} className="block text-[15px] text-text-secondary hover:text-accent py-2.5 transition-colors">Features</Link>
          <Link href="#pricing" onClick={() => setOpen(false)} className="block text-[15px] text-text-secondary hover:text-accent py-2.5 transition-colors">Pricing</Link>
          <Link href="/directory" onClick={() => setOpen(false)} className="block text-[15px] text-text-secondary hover:text-accent py-2.5 transition-colors">Directory</Link>
          <Link href="/blog" onClick={() => setOpen(false)} className="block text-[15px] text-text-secondary hover:text-accent py-2.5 transition-colors">Blog</Link>
          <Link href="/get-started" onClick={() => setOpen(false)} className="block text-center px-5 py-3 bg-accent text-bg-primary font-semibold rounded-lg mt-3">Get Started</Link>
        </div>
      )}
    </nav>
  )
}
