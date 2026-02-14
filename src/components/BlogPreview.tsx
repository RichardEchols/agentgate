'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { getPublishedPosts } from '@/lib/blog-posts'

export function BlogPreview() {
  const posts = getPublishedPosts().slice(0, 3)

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,220,130,0.05)_0%,transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent/8 border border-accent/15 rounded-full mb-6"
          >
            <span className="text-[12px] font-medium text-accent tracking-wide uppercase">From the blog</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] leading-tight mb-4"
          >
            Learn About{' '}
            <span className="text-gradient">AI-Agent Readiness</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Practical guides and insights on making your website AI-agent compatible.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="group h-full bg-bg-secondary border border-border rounded-2xl p-6 hover:border-accent/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,220,130,0.1)]">
                  <div className="flex items-center gap-3 mb-4 text-[12px] text-text-tertiary">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-[18px] font-bold mb-3 group-hover:text-accent transition-colors leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-[14px] text-text-secondary leading-relaxed mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-2 text-[14px] font-medium text-accent">
                    <span>Read article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/8 text-text-primary text-[15px] font-medium rounded-xl border border-border hover:border-accent/20 transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
