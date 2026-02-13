'use client'

import { useState } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Copy, Check, Zap, ArrowRight, Globe, Bot, Terminal } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function GetStarted() {
  const [step, setStep] = useState(1)
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [email, setEmail] = useState('')
  const [snippetId, setSnippetId] = useState('')
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)

  const categories = [
    'Law Firm', 'Barbershop / Salon', 'Contractor', 'Restaurant',
    'Healthcare', 'E-Commerce', 'Education', 'Real Estate',
    'Fitness / Gym', 'Auto / Mechanic', 'Other',
  ]

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const id = 'ag_' + Math.random().toString(36).substring(2, 10)

    const { error } = await supabase.from('agentgate_sites').insert({
      snippet_id: id,
      url: url.startsWith('http') ? url : `https://${url}`,
      name,
      category,
      email,
      tools: [],
    })

    if (error) {
      console.error('Supabase error:', error)
    }

    setSnippetId(id)
    setSaving(false)
    setStep(2)
  }

  function getSnippetUrl() {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://getagentgate.com'
    return `<script src="${origin}/s/${snippetId}.js" defer></script>`
  }

  function copySnippet() {
    navigator.clipboard.writeText(getSnippetUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputClass = "w-full px-4 py-3.5 bg-bg-tertiary/50 border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-200"

  return (
    <main className="min-h-screen bg-bg-primary relative">
      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="relative z-10">
        <Nav />

        <section className="pt-32 pb-24 px-6">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-12">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold transition-colors ${step >= 1 ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-text-tertiary'}`}>1</div>
              <div className={`flex-1 h-px ${step >= 2 ? 'bg-accent' : 'bg-border'}`} />
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold transition-colors ${step >= 2 ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-text-tertiary'}`}>2</div>
              <div className={`flex-1 h-px ${step >= 3 ? 'bg-accent' : 'bg-border'}`} />
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold transition-colors ${step >= 3 ? 'bg-accent text-bg-primary' : 'bg-bg-tertiary text-text-tertiary'}`}>3</div>
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-[32px] font-extrabold tracking-[-0.02em] mb-3">Register Your Website</h1>
                <p className="text-lg text-text-secondary mb-10">Tell us about your site and we&apos;ll generate your custom AgentGate snippet.</p>

                <form onSubmit={handleGenerate} className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary mb-2 uppercase tracking-wider">Website URL</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="yourwebsite.com"
                        required
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary mb-2 uppercase tracking-wider">Business Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Business Name"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary mb-2 uppercase tracking-wider">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" className="bg-bg-secondary">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-bg-secondary">{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-text-secondary mb-2 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-3.5 bg-accent hover:bg-accent-hover text-bg-primary text-[16px] font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] shadow-[0_0_20px_rgba(0,220,130,0.2)] disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                  >
                    {saving ? (
                      <div className="w-5 h-5 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
                    ) : (
                      <>
                        Generate My Snippet
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-14 h-14 mx-auto mb-6 bg-accent/15 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-accent" />
                </div>
                <h1 className="text-[32px] font-extrabold tracking-[-0.02em] mb-3 text-center">Your Snippet is Ready</h1>
                <p className="text-lg text-text-secondary mb-10 text-center">
                  Copy this code and paste it before the closing <code className="text-accent font-mono">&lt;/body&gt;</code> tag on your website.
                </p>

                <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden mb-6">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-bg-tertiary/50">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-system-pink/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-system-orange/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                      </div>
                      <Terminal className="w-3.5 h-3.5 text-text-tertiary ml-2" />
                      <span className="text-[11px] text-text-tertiary font-mono">your-site.html</span>
                    </div>
                    <button
                      onClick={copySnippet}
                      className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/8 rounded-md text-[12px] font-medium transition-all duration-200 border border-border"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-5">
                    <pre className="text-[14px] font-mono leading-relaxed text-accent overflow-x-auto">
                      {getSnippetUrl()}
                    </pre>
                  </div>
                </div>

                <div className="bg-bg-secondary border border-border rounded-xl p-6 mb-8">
                  <h3 className="text-[15px] font-bold mb-4">What happens next?</h3>
                  <ul className="space-y-3">
                    {[
                      'The snippet auto-detects all forms on your page',
                      'Each form becomes a WebMCP tool that AI agents understand',
                      'Your site is listed in the AgentGate Directory for AI agents to find',
                    ].map((text, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-accent">{idx + 1}</span>
                        </div>
                        <span className="text-[14px] text-text-secondary">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setStep(3)}
                  className="w-full py-3.5 bg-accent hover:bg-accent-hover text-bg-primary text-[16px] font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] shadow-[0_0_20px_rgba(0,220,130,0.2)] flex items-center justify-center gap-2"
                >
                  View Your Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-[32px] font-extrabold tracking-[-0.02em] mb-3 text-center">You&apos;re Live</h1>
                <p className="text-lg text-text-secondary mb-10 text-center">
                  Your website is now AI-agent ready. Here&apos;s your setup.
                </p>

                <div className="grid gap-4">
                  <div className="bg-bg-secondary border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <Globe className="w-4 h-4 text-accent" />
                      <span className="text-[13px] font-bold uppercase tracking-wider text-text-tertiary">Website</span>
                    </div>
                    <p className="text-[15px] text-text-primary font-mono">{url || 'yourwebsite.com'}</p>
                  </div>

                  <div className="bg-bg-secondary border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <Zap className="w-4 h-4 text-accent" />
                      <span className="text-[13px] font-bold uppercase tracking-wider text-text-tertiary">Snippet ID</span>
                    </div>
                    <p className="text-[15px] text-accent font-mono">{snippetId}</p>
                  </div>

                  <div className="bg-bg-secondary border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <Bot className="w-4 h-4 text-secondary" />
                      <span className="text-[13px] font-bold uppercase tracking-wider text-text-tertiary">Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      <span className="text-[14px] text-accent">Waiting for snippet installation</span>
                    </div>
                  </div>
                </div>

                <p className="text-[12px] text-text-tertiary text-center mt-8">
                  Once you paste the snippet on your site, we&apos;ll detect your forms automatically and you&apos;ll appear in the directory.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
