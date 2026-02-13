import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-tertiary flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 20V10Q7 4 12 4Q17 4 17 10V20" />
                  <line x1="12" y1="8" x2="12" y2="16" strokeWidth="2" opacity="0.7" />
                </svg>
              </div>
              <span className="text-[17px] font-bold tracking-tight">
                Agent<span className="text-accent">Gate</span>
              </span>
            </div>
            <p className="text-[14px] text-text-secondary leading-relaxed max-w-sm">
              The first platform to make websites AI-agent ready. Built on Google&apos;s WebMCP standard. Making the future of web interaction accessible to every business.
            </p>
          </div>

          <div>
            <h4 className="text-[12px] font-bold text-text-tertiary uppercase tracking-[0.15em] mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#how-it-works" className="text-[14px] text-text-secondary hover:text-accent transition-colors">How It Works</Link></li>
              <li><Link href="#features" className="text-[14px] text-text-secondary hover:text-accent transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-[14px] text-text-secondary hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link href="/directory" className="text-[14px] text-text-secondary hover:text-accent transition-colors">Directory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-bold text-text-tertiary uppercase tracking-[0.15em] mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="https://github.com/nicolo-ribaudo/tc39-proposal-webmcp" className="text-[14px] text-text-secondary hover:text-accent transition-colors">WebMCP Spec</Link></li>
              <li><Link href="/get-started" className="text-[14px] text-text-secondary hover:text-accent transition-colors">Get Started</Link></li>
              <li><Link href="/blog" className="text-[14px] text-text-secondary hover:text-accent transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-text-tertiary">&copy; {new Date().getFullYear()} AgentGate. A product by RMDW LLC.</p>
          <p className="text-[12px] text-text-tertiary">Built on Google&apos;s WebMCP standard.</p>
        </div>
      </div>
    </footer>
  )
}
