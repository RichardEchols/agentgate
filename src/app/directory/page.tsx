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
    <main className="min-h-screen bg-bg-primary relative">
      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="relative z-10">
        <Nav />

        <section className="pt-32 pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-12"
            >
              <span className="text-[12px] font-semibold text-secondary uppercase tracking-[0.2em] mb-4 block">Directory</span>
              <h1 className="text-[36px] md:text-[42px] font-extrabold tracking-[-0.02em] mb-3">Discover AI-Ready Websites</h1>
              <p className="text-lg text-text-secondary max-w-xl mx-auto">
                Browse businesses that have made their websites accessible to AI agents via WebMCP.
              </p>
            </motion.div>

            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search businesses, categories, or URLs..."
                  className="w-full pl-11 pr-4 py-3 bg-bg-tertiary/50 border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-md text-[12px] font-semibold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-accent text-bg-primary'
                      : 'bg-bg-tertiary/50 text-text-secondary hover:text-text-primary border border-border hover:border-accent/20'
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
                  <div key={i} className="bg-bg-secondary border border-border rounded-xl p-6 animate-pulse">
                    <div className="h-4 bg-bg-tertiary rounded w-3/4 mb-3" />
                    <div className="h-3 bg-bg-tertiary rounded w-1/2 mb-4" />
                    <div className="h-3 bg-bg-tertiary rounded w-full" />
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
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-bg-secondary border border-border rounded-xl p-5 hover:border-accent/15 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-[16px] font-bold group-hover:text-accent transition-colors">{site.name}</h3>
                        <span className="text-[11px] font-semibold text-accent/70 bg-accent/8 px-2 py-0.5 rounded">{site.category}</span>
                      </div>
                      <a href={site.url} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-bg-tertiary rounded-md transition-colors">
                        <ExternalLink className="w-4 h-4 text-text-tertiary" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="w-3 h-3 text-text-tertiary" />
                      <span className="text-[12px] text-text-tertiary truncate font-mono">{site.url}</span>
                    </div>

                    {site.tools && site.tools.length > 0 ? (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Tools</span>
                        {site.tools.map((tool, j) => (
                          <div key={j} className="flex items-center gap-2 px-2.5 py-1.5 bg-bg-tertiary/50 rounded-md">
                            <Zap className="w-3 h-3 text-accent" />
                            <span className="text-[12px] font-mono text-accent">{tool.name}()</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-bg-tertiary/50 rounded-md">
                        <span className="w-1.5 h-1.5 bg-system-orange rounded-full animate-pulse" />
                        <span className="text-[12px] text-text-tertiary">Awaiting snippet install</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Bot className="w-10 h-10 text-text-tertiary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">No sites found</h3>
                <p className="text-[14px] text-text-secondary mb-6">
                  {sites.length === 0 ? 'Be the first to register your website!' : 'Try a different search or category.'}
                </p>
                <a href="/get-started" className="inline-flex px-6 py-3 bg-accent hover:bg-accent-hover text-bg-primary font-semibold rounded-lg transition-all duration-200 active:scale-[0.97]">
                  Register Your Site
                </a>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
