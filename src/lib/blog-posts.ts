export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  published: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-your-website-needs-to-be-ai-agent-ready',
    title: 'Why Your Website Needs to Be AI-Agent Ready in 2026',
    description:
      'AI agents are already browsing the web, filling out forms, and booking appointments on behalf of users. If your website isn\'t ready for them, you\'re invisible to the next wave of customers.',
    content: `
<h2>The Web Is Changing — Again</h2>
<p>Every few years, the web undergoes a fundamental shift. First it was mobile responsiveness. Then it was voice search optimization. Now, the next wave is here: <strong>AI agent compatibility</strong>.</p>
<p>AI agents — autonomous programs powered by large language models — are already browsing websites, comparing prices, filling out contact forms, and booking appointments on behalf of real users. And they're doing it at a scale that no human could match.</p>
<p>The question isn't whether AI agents will interact with your website. They already are. The question is whether your website is ready for them.</p>

<h2>What Does "AI-Agent Ready" Mean?</h2>
<p>An AI-agent-ready website exposes its functionality — forms, booking systems, search bars, checkout flows — in a structured format that agents can understand and interact with. Think of it like an API for your frontend.</p>
<p>Google's <strong>WebMCP standard</strong> provides exactly this. It defines how websites can declare their interactive capabilities so that AI agents can discover and use them reliably, without scraping or guessing.</p>

<h2>Why This Matters for Your Business</h2>
<p>Consider this scenario: a user asks their AI assistant to "find a barber near me and book an appointment for Saturday." The agent searches the web, finds barber shops, and attempts to book. If your booking form is WebMCP-compatible, the agent can fill it out seamlessly. If it's not, the agent moves on to your competitor.</p>
<p>This isn't hypothetical. It's happening right now. And the businesses that adopt early will capture this traffic while their competitors are still wondering what happened.</p>

<h3>The Early Mover Advantage</h3>
<ul>
<li><strong>Visibility:</strong> AI agents will prioritize websites they can interact with reliably</li>
<li><strong>Conversion:</strong> Automated form fills mean zero drop-off from user intent to action</li>
<li><strong>Scale:</strong> One agent can drive dozens of bookings per day — 24/7, no friction</li>
<li><strong>Directory listing:</strong> Being in the AgentGate Directory means agents find you first</li>
</ul>

<h2>How AgentGate Makes It Simple</h2>
<p>You don't need to rebuild your website. You don't need a developer on retainer. AgentGate gives you a single script tag that you paste into your site. It automatically detects your forms, generates WebMCP-compliant tool definitions, and lists your site in our directory — all in under 60 seconds.</p>
<p>That's it. One line of code, and your website becomes a tool that AI agents can use.</p>

<h2>The Bottom Line</h2>
<p>The businesses that made their sites mobile-friendly in 2012 won the next decade of search traffic. The businesses that make their sites AI-agent-ready in 2026 will win the next one.</p>
<p>Don't wait for your competitors to figure this out first.</p>
    `.trim(),
    date: '2026-02-12',
    readTime: '5 min read',
    category: 'AI Agents',
    tags: ['WebMCP', 'AI Agents', 'Small Business', 'Web Standards'],
    published: true,
  },
]

export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && post.published)
}
