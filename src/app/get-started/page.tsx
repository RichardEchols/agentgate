'use client'

import { useState } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Copy, Check, Zap, ArrowRight, Globe, Bot } from 'lucide-react'
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
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://agentgate.dev'
    return `<script src="${origin}/s/${snippetId}.js" defer></script>`
  }

  function copySnippet() {
    navigator.clipboard.writeText(getSnippetUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-black">
      <Nav />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-12">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold ${step >= 1 ? 'bg-accent text-white' : 'bg-bg-tertiary text-text-tertiary'}`}>1</div>
            <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-accent' : 'bg-bg-tertiary'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold ${step >= 2 ? 'bg-accent text-white' : 'bg-bg-tertiary text-text-tertiary'}`}>2</div>
            <div className={`flex-1 h-0.5 ${step >= 3 ? 'bg-accent' : 'bg-bg-tertiary'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold ${step >= 3 ? 'bg-accent text-white' : 'bg-bg-tertiary text-text-tertiary'}`}>3</div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-[34px] font-bold tracking-tight mb-3">Register Your Website</h1>
              <p className="text-xl text-text-secondary mb-10">Tell us about your site and we&apos;ll generate your custom AgentGate snippet.</p>

              <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                  <label className="block text-[15px] font-medium mb-2">Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="yourwebsite.com"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[15px] font-medium mb-2">Business Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Business Name"
                    required
                    className="w-full px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[15px] font-medium mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-200 appearance-none"
                  >
                    <option value="" className="bg-bg-secondary">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-bg-secondary">{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[15px] font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full px-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-4 bg-accent hover:bg-accent-hover text-white text-[17px] font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-accent/25 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Generate My Snippet
                      <ArrowRight className="w-5 h-5" />
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
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-system-green/20 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-system-green" />
              </div>
              <h1 className="text-[34px] font-bold tracking-tight mb-3 text-center">Your Snippet is Ready</h1>
              <p className="text-xl text-text-secondary mb-10 text-center">
                Copy this code and paste it before the closing <code className="text-accent font-mono text-lg">&lt;/body&gt;</code> tag on your website.
              </p>

              <div className="bg-bg-secondary border border-white/10 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-system-pink/80" />
                    <div className="w-3 h-3 rounded-full bg-system-orange/80" />
                    <div className="w-3 h-3 rounded-full bg-system-green/80" />
                    <span className="text-[11px] text-text-tertiary ml-2 font-mono">your-site.html</span>
                  </div>
                  <button
                    onClick={copySnippet}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-[13px] font-medium transition-all duration-200"
                  >
                    {copied ? <Check className="w-4 h-4 text-system-green" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="text-[14px] font-mono leading-relaxed text-system-green overflow-x-auto">
                  {getSnippetUrl()}
                </pre>
              </div>

              <div className="bg-bg-secondary border border-white/10 rounded-2xl p-6 mb-8">
                <h3 className="text-[17px] font-semibold mb-4">What happens next?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[11px] font-semibold text-accent">1</span>
                    </div>
                    <span className="text-[15px] text-text-secondary">The snippet auto-detects all forms on your page</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[11px] font-semibold text-accent">2</span>
                    </div>
                    <span className="text-[15px] text-text-secondary">Each form becomes a WebMCP tool that AI agents understand</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[11px] font-semibold text-accent">3</span>
                    </div>
                    <span className="text-[15px] text-text-secondary">Your site is listed in the AgentGate Directory for AI agents to find</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full py-4 bg-accent hover:bg-accent-hover text-white text-[17px] font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
              >
                View Your Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-[34px] font-bold tracking-tight mb-3 text-center">You&apos;re Live</h1>
              <p className="text-xl text-text-secondary mb-10 text-center">
                Your website is now AI-agent ready. Here&apos;s your setup.
              </p>

              <div className="grid gap-4">
                <div className="bg-bg-secondary border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-accent" />
                    <span className="text-[15px] font-semibold">Website</span>
                  </div>
                  <p className="text-[15px] text-text-secondary font-mono">{url || 'yourwebsite.com'}</p>
                </div>

                <div className="bg-bg-secondary border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-system-green" />
                    <span className="text-[15px] font-semibold">Snippet ID</span>
                  </div>
                  <p className="text-[15px] text-system-green font-mono">{snippetId}</p>
                </div>

                <div className="bg-bg-secondary border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Bot className="w-5 h-5 text-system-purple" />
                    <span className="text-[15px] font-semibold">Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-system-green rounded-full animate-pulse" />
                    <span className="text-[15px] text-system-green">Waiting for snippet installation</span>
                  </div>
                </div>
              </div>

              <p className="text-[13px] text-text-tertiary text-center mt-8">
                Once you paste the snippet on your site, we&apos;ll detect your forms automatically and you&apos;ll appear in the directory.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
