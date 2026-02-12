import Link from 'next/link'
import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-separator py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-[17px] font-semibold">AgentGate</span>
            </div>
            <p className="text-[15px] text-text-secondary leading-relaxed max-w-sm">
              The first platform to make websites AI-agent ready. Built on Google&apos;s WebMCP standard. Making the future of web interaction accessible to every business.
            </p>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#how-it-works" className="text-[15px] text-text-secondary hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#features" className="text-[15px] text-text-secondary hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-[15px] text-text-secondary hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/directory" className="text-[15px] text-text-secondary hover:text-white transition-colors">Directory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="https://github.com/webmachinelearning/webmcp" className="text-[15px] text-text-secondary hover:text-white transition-colors">WebMCP Spec</Link></li>
              <li><Link href="/get-started" className="text-[15px] text-text-secondary hover:text-white transition-colors">Get Started</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-separator pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-text-tertiary">&copy; {new Date().getFullYear()} AgentGate. A product by RMDW LLC.</p>
          <p className="text-[13px] text-text-tertiary">Built on Google&apos;s WebMCP standard.</p>
        </div>
      </div>
    </footer>
  )
}
