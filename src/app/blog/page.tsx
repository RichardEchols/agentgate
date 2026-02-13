'use client'

import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { getPublishedPosts } from '@/lib/blog-posts'

export default function Blog() {
  const posts = getPublishedPosts()

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
              className="text-center mb-16"
            >
              <span className="text-[12px] font-semibold text-secondary uppercase tracking-[0.2em] mb-4 block">Blog</span>
              <h1 className="text-[36px] md:text-[42px] font-extrabold tracking-[-0.02em] mb-4">
                Insights & <span className="text-gradient">Updates</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-xl mx-auto">
                Ideas, guides, and news on making your website AI-agent ready.
              </p>
            </motion.div>

            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent/15 transition-all duration-400 group h-full"
                    >
                      <span className="text-[11px] font-semibold text-accent/70 bg-accent/8 px-2 py-0.5 rounded">
                        {post.category}
                      </span>

                      <h2 className="text-[17px] font-bold mt-3 mb-2 group-hover:text-accent transition-colors duration-300 leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-[14px] text-text-secondary leading-relaxed mb-5 line-clamp-3">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-[12px] text-text-tertiary">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-lg font-bold mb-2">No posts yet</h3>
                <p className="text-[14px] text-text-secondary">
                  Check back soon for articles on AI agents, WebMCP, and making your website future-proof.
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
