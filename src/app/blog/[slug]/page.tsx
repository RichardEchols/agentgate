import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPublishedPosts, getPostBySlug } from '@/lib/blog-posts'
import { BlogPostContent } from './BlogPostContent'

// Allow dynamic rendering for slugs not in generateStaticParams
export const dynamicParams = true

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getPublishedPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found — AgentGate' }
  }

  return {
    title: `${post.title} — AgentGate Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://getagentgate.com/blog/${post.slug}`,
      siteName: 'AgentGate',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}
