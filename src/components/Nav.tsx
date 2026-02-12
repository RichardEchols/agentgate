'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Zap } from 'lucide-react'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-separator">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:shadow-[0_0_20px_rgba(10,132,255,0.5)]">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-[17px] font-semibold tracking-tight">AgentGate</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-[15px] text-text-secondary hover:text-white transition-colors duration-200">How It Works</Link>
          <Link href="#features" className="text-[15px] text-text-secondary hover:text-white transition-colors duration-200">Features</Link>
          <Link href="#pricing" className="text-[15px] text-text-secondary hover:text-white transition-colors duration-200">Pricing</Link>
          <Link href="/directory" className="text-[15px] text-text-secondary hover:text-white transition-colors duration-200">Directory</Link>
          <Link
            href="/get-started"
            className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-[15px] font-semibold rounded-xl transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/70 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-bg-secondary border-t border-separator px-6 py-4 space-y-3">
          <Link href="#how-it-works" onClick={() => setOpen(false)} className="block text-[15px] text-text-secondary hover:text-white py-2">How It Works</Link>
          <Link href="#features" onClick={() => setOpen(false)} className="block text-[15px] text-text-secondary hover:text-white py-2">Features</Link>
          <Link href="#pricing" onClick={() => setOpen(false)} className="block text-[15px] text-text-secondary hover:text-white py-2">Pricing</Link>
          <Link href="/directory" onClick={() => setOpen(false)} className="block text-[15px] text-text-secondary hover:text-white py-2">Directory</Link>
          <Link href="/get-started" onClick={() => setOpen(false)} className="block text-center px-5 py-3 bg-accent text-white font-semibold rounded-xl mt-2">Get Started</Link>
        </div>
      )}
    </nav>
  )
}
