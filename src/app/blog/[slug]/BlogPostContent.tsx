'use client'

import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/lib/blog-posts'

export function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <main className="min-h-screen bg-bg-primary relative">
      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="relative z-10">
        <Nav />

        <article className="pt-32 pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[13px] text-text-tertiary hover:text-accent transition-colors duration-200 mb-10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mb-10"
            >
              <span className="text-[11px] font-semibold text-accent/70 bg-accent/8 px-2.5 py-1 rounded">
                {post.category}
              </span>

              <h1 className="text-[32px] md:text-[40px] font-extrabold tracking-[-0.02em] mt-4 mb-5 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-[13px] text-text-tertiary">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>
            </motion.header>

            {/* Divider */}
            <div className="h-px bg-border mb-10" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="blog-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-12 pt-8 border-t border-border"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-3.5 h-3.5 text-text-tertiary" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold text-text-secondary bg-bg-tertiary/50 border border-border px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 bg-bg-secondary border border-border rounded-xl p-8 md:p-10 text-center"
            >
              <h3 className="text-[22px] md:text-[26px] font-extrabold tracking-[-0.01em] mb-3">
                Ready to Make Your Site <span className="text-gradient">AI-Agent Ready</span>?
              </h3>
              <p className="text-[15px] text-text-secondary max-w-lg mx-auto mb-6">
                One script tag. 60 seconds. Your website becomes a tool that AI agents can discover and use.
              </p>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-bg-primary text-[15px] font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] shadow-[0_0_20px_rgba(0,220,130,0.2)]"
              >
                Get Started with AgentGate
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </article>

        <Footer />
      </div>
    </main>
  )
}
