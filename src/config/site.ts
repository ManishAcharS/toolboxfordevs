import type { NavigationItem, SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Toolbox for Devs',
  description:
    'A curated directory of 150+ developer tools — generators, converters, formatters, testing suites, and more. Find the right tool for coding, APIs, JSON, CSS, and everyday development tasks.',
  url: 'https://toolboxfordevs.vercel.app',
  ogImage: '/og',
  links: {
    github: 'https://github.com/ManishAcharS/toolboxfordevs',
    youtube: 'https://www.youtube.com/@toolboxfordevs',
    instagram: 'https://www.instagram.com/toolboxfordevs/',
  },
  author: {
    name: 'Toolbox for Devs Team',
    email: 'manishthelegend99@gmail.com',
  },
  analytics: {
    // Set to your Plausible Analytics domain (e.g. 'toolboxfordevs.com') to enable.
    // Leave empty to keep analytics disabled. Privacy-friendly, no personal data tracked.
    plausibleDomain: '',
  },
  theme: {
    colors: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      accent: '#d946ef',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#0f172a',
      textMuted: '#64748b',
      border: '#e2e8f0',
      error: '#ef4444',
      warning: '#f59e0b',
      success: '#22c55e',
    },
    fonts: {
      sans: 'var(--font-inter), system-ui, sans-serif',
      mono: 'var(--font-jetbrains-mono), monospace',
    },
    radius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
    spacing: {},
    shadows: {},
    transitions: {},
    breakpoints: {},
  },
};

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Tools',
    href: '/tools',
    icon: 'tool',
    megaMenu: {
      columns: [
        {
          title: 'Categories',
          items: [
            {
              label: 'API Development',
              href: '/categories/api-development',
              description: 'REST, GraphQL, gRPC tools',
            },
            {
              label: 'CI/CD & Deployment',
              href: '/categories/ci-cd',
              description: 'Pipeline automation',
            },
            {
              label: 'Databases',
              href: '/categories/databases',
              description: 'SQL, NoSQL, ORM tools',
            },
            {
              label: 'Frontend',
              href: '/categories/frontend',
              description: 'Frameworks, libraries, UI',
            },
            {
              label: 'Backend',
              href: '/categories/backend',
              description: 'Servers, microservices, APIs',
            },
            {
              label: 'Testing',
              href: '/categories/testing',
              description: 'Unit, integration, E2E testing',
            },
            {
              label: 'Monitoring',
              href: '/categories/monitoring',
              description: 'Logs, metrics, tracing',
            },
            {
              label: 'Security',
              href: '/categories/security',
              description: 'Auth, scanning, compliance',
            },
          ],
        },
        {
          title: 'Popular Tags',
          items: [
            { label: 'Open Source', href: '/tools?pricing=open-source' },
            { label: 'Free Tier', href: '/tools?pricing=free' },
            { label: 'TypeScript', href: '/tools?tag=typescript' },
            { label: 'React', href: '/tools?tag=react' },
            { label: 'Node.js', href: '/tools?tag=nodejs' },
            { label: 'Python', href: '/tools?tag=python' },
          ],
        },
        {
          title: 'Featured Tools',
          items: [
            { label: 'Postman', href: '/tools/postman', description: 'API development platform' },
            { label: 'Vercel', href: '/tools/vercel', description: 'Frontend deployment' },
            { label: 'Prisma', href: '/tools/prisma', description: 'Next-gen ORM' },
            { label: 'Turborepo', href: '/tools/turborepo', description: 'Build system' },
          ],
        },
      ],
      featuredTools: ['postman', 'vercel', 'prisma', 'turborepo'],
      featuredCategories: ['api-development', 'frontend', 'databases', 'ci-cd'],
    },
  },
  {
    label: 'Categories',
    href: '/categories',
    icon: 'folder',
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: 'book-open',
  },
  {
    label: 'About',
    href: '/about',
    icon: 'info',
  },
];

export const footerNavigation = {
  product: [
    { label: 'Tools', href: '/tools' },
    { label: 'Categories', href: '/categories' },
    { label: 'Comparisons', href: '/compare' },
    { label: 'Blog', href: '/blog' },
    { label: 'Resources', href: '/resources' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Cookie Policy', href: '/privacy#cookies' },
    { label: 'Security', href: '/privacy#security' },
  ],
  social: [
    {
      label: 'GitHub',
      href: 'https://github.com/ManishAcharS/toolboxfordevs',
      external: true,
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@toolboxfordevs',
      external: true,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/toolboxfordevs/',
      external: true,
    },
  ],
};
