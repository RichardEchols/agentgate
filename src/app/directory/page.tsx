'use client'

import { useState, useEffect } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Search, Globe, Bot, ExternalLink, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface Site {
  id: string
  snippet_id: string
  url: string
  name: string
  category: string
  tools: { name: string; description: string }[]
  created_at: string
}

export default function Directory() {
  const [sites, setSites] = useState<Site[]>([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Law Firm', 'Barbershop / Salon', 'Contractor', 'Restaurant', 'Healthcare', 'E-Commerce', 'Education', 'Real Estate', 'Fitness / Gym', 'Auto / Mechanic', 'Other']

  useEffect(() => {
    fetchSites()
  }, [])

  async function fetchSites() {
    setLoading(true)
    const { data, error } = await supabase
      .from('agentgate_sites')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setSites(data)
    if (error) console.error(error)
    setLoading(false)
  }

  const filtered = sites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.url.toLowerCase().includes(search.toLowerCase()) ||
      site.category.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-black">
      <Nav />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-system-purple/10 border border-system-purple/20 rounded-full mb-6">
              <Bot className="w-4 h-4 text-system-purple" />
              <span className="text-[13px] font-medium text-system-purple">AI Agent Directory</span>
            </div>
            <h1 className="text-[34px] font-bold tracking-tight mb-3">Discover AI-Ready Websites</h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Browse businesses that have made their websites accessible to AI agents via WebMCP.
            </p>
          </motion.div>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search businesses, categories, or URLs..."
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-accent text-white'
                    : 'bg-white/10 text-text-secondary hover:bg-white/15 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-bg-secondary border border-white/10 rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-white/10 rounded w-1/2 mb-4" />
                  <div className="h-3 bg-white/10 rounded w-full" />
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((site, i) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-bg-secondary border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[17px] font-semibold group-hover:text-accent transition-colors">{site.name}</h3>
                      <span className="text-[12px] font-medium text-accent/80 bg-accent/10 px-2 py-0.5 rounded-full">{site.category}</span>
                    </div>
                    <a href={site.url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4 text-text-tertiary" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-3.5 h-3.5 text-text-tertiary" />
                    <span className="text-[13px] text-text-tertiary truncate">{site.url}</span>
                  </div>

                  {site.tools && site.tools.length > 0 ? (
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Tools</span>
                      {site.tools.map((tool, j) => (
                        <div key={j} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                          <Zap className="w-3 h-3 text-system-green" />
                          <span className="text-[13px] font-mono text-system-green">{tool.name}()</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                      <span className="w-2 h-2 bg-system-orange rounded-full animate-pulse" />
                      <span className="text-[13px] text-text-tertiary">Awaiting snippet install</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Bot className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No sites found</h3>
              <p className="text-text-secondary mb-6">
                {sites.length === 0 ? 'Be the first to register your website!' : 'Try a different search or category.'}
              </p>
              <a href="/get-started" className="inline-flex px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]">
                Register Your Site
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
