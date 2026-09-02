import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Scale, Check, X } from 'lucide-react';
import { getComparisonBySlug, slugToComparison, getRelatedComparisons } from '@/data/comparisons';
import { StructuredData, createMetadata, SITE_NAME } from '@/lib/seo';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { SectionHeading } from '@/components/shared/section-heading';
import { ToolIcon } from '@/components/shared/tool-icon';
import type { ToolDefinition } from '@/types';

interface ComparePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { getComparisons } = await import('@/data/comparisons');
  return getComparisons().map(({ pair }) => ({ slug: `${pair.a}-vs-${pair.b}` }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const parts = slugToComparison(slug);
  if (!parts) return {};
  const pair = getComparisonBySlug(parts.a, parts.b);
  if (!pair) return {};
  return createMetadata({
    title: `${pair.toolA.title} vs ${pair.toolB.title} — Which to choose?`,
    description: `${pair.pair.summary} Compare ${pair.toolA.title} and ${pair.toolB.title} side-by-side: ${pair.toolA.pricing}, category, features, and when to use each.`,
    canonical: `/compare/${slug}`,
    keywords: [
      `${pair.toolA.title} vs ${pair.toolB.title}`,
      pair.toolA.title,
      pair.toolB.title,
      'developer tools',
    ],
    type: 'article',
  });
}

function renderToolSection(title: string, tool: ToolDefinition) {
  return (
    <div className="border-border bg-card rounded-xl border p-6">
      <div className="flex items-center gap-3">
        <ToolIcon name={tool.title} icon={tool.icon} size="md" />
        <h2 className="text-xl font-bold">{tool.title}</h2>
      </div>
      <p className="text-muted-foreground mt-3 text-pretty">{tool.description}</p>

      <dl className="mt-5 space-y-2.5 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Pricing</dt>
          <dd className="text-foreground font-medium capitalize">{tool.pricing}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Category</dt>
          <dd className="text-foreground font-medium capitalize">
            {tool.category.replace(/-/g, ' ')}
          </dd>
        </div>
        {tool.rating !== undefined && (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">Rating</dt>
            <dd className="text-foreground font-medium">{tool.rating.toFixed(1)}</dd>
          </div>
        )}
      </dl>

      {tool.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-muted-foreground bg-muted rounded-full px-2.5 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={`/tools/${tool.slug}`}
          className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          View {tool.title} details
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  const parts = slugToComparison(slug);
  if (!parts) notFound();

  const pair = getComparisonBySlug(parts.a, parts.b);
  if (!pair) notFound();

  const { toolA, toolB } = pair;
  const related = getRelatedComparisons(pair, 2);

  // Shared facts count for a quick feature comparison
  const featureRows = Array.from(
    new Set([...toolA.tags, ...toolB.tags].map((tag) => tag.toLowerCase()))
  ).slice(0, 8);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <StructuredData
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://toolboxfordevs.vercel.app/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: `${toolA.title} vs ${toolB.title}`,
                item: `https://toolboxfordevs.vercel.app/compare/${slug}`,
              },
            ],
          },
        ]}
      />

      <Breadcrumb
        items={[
          { label: 'Tools', href: '/tools' },
          { label: `${toolA.title} vs ${toolB.title}`, current: true },
        ]}
        className="mb-6"
      />

      <header className="mb-10">
        <div className="text-primary flex items-center gap-2 text-sm">
          <Scale className="h-4 w-4" aria-hidden="true" />
          <span>Comparison</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {toolA.title} vs {toolB.title}
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-pretty">{pair.pair.summary}</p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {renderToolSection(toolA.title, toolA)}
        {renderToolSection(toolB.title, toolB)}
      </div>

      <section className="mt-12">
        <SectionHeading
          icon={<Scale className="h-5 w-5" aria-hidden="true" />}
          title="Key differences"
          description="A quick, factual breakdown to help you choose."
        />
        <div className="border-border bg-card rounded-xl border p-6">
          <p className="text-foreground text-pretty">{pair.pair.difference}</p>

          <table className="mt-6 w-full text-left text-sm">
            <caption className="sr-only">
              Side-by-side comparison of {toolA.title} and {toolB.title}
            </caption>
            <thead>
              <tr className="border-border border-b">
                <th className="text-muted-foreground py-2 pr-4 text-xs font-semibold tracking-wide uppercase">
                  Aspect
                </th>
                <th className="px-4 py-2 font-semibold">{toolA.title}</th>
                <th className="py-2 pl-4 font-semibold">{toolB.title}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-border border-b">
                <td className="text-muted-foreground py-3 pr-4">Purpose</td>
                <td className="px-4 py-3">{toolA.shortDescription}</td>
                <td className="py-3 pl-4">{toolB.shortDescription}</td>
              </tr>
              <tr className="border-border border-b">
                <td className="text-muted-foreground py-3 pr-4">Pricing</td>
                <td className="px-4 py-3 capitalize">{toolA.pricing}</td>
                <td className="py-3 pl-4 capitalize">{toolB.pricing}</td>
              </tr>
              {toolA.rating !== undefined && toolB.rating !== undefined && (
                <tr className="border-border border-b">
                  <td className="text-muted-foreground py-3 pr-4">Rating</td>
                  <td className="px-4 py-3">
                    {toolA.rating.toFixed(1)}
                    {toolA.reviewsCount !== undefined &&
                      ` (${toolA.reviewsCount.toLocaleString()})`}
                  </td>
                  <td className="py-3 pl-4">
                    {toolB.rating.toFixed(1)}
                    {toolB.reviewsCount !== undefined &&
                      ` (${toolB.reviewsCount.toLocaleString()})`}
                  </td>
                </tr>
              )}
              {featureRows.map((tag) => {
                const inA = toolA.tags.some((t) => t.toLowerCase() === tag);
                const inB = toolB.tags.some((t) => t.toLowerCase() === tag);
                return (
                  <tr key={tag} className="border-border border-b">
                    <td className="text-muted-foreground py-3 pr-4 capitalize">{tag}</td>
                    <td className="px-4 py-3">
                      {inA ? (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                          <Check className="h-4 w-4" aria-hidden="true" /> Yes
                        </span>
                      ) : (
                        <span className="text-muted-foreground inline-flex items-center gap-1">
                          <X className="h-4 w-4" aria-hidden="true" /> No
                        </span>
                      )}
                    </td>
                    <td className="py-3 pl-4">
                      {inB ? (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                          <Check className="h-4 w-4" aria-hidden="true" /> Yes
                        </span>
                      ) : (
                        <span className="text-muted-foreground inline-flex items-center gap-1">
                          <X className="h-4 w-4" aria-hidden="true" /> No
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <SectionHeading
            title="Related comparisons"
            description="More side-by-side looks at similar tools."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {related.map(({ pair: relatedPair, toolA: rA, toolB: rB }) => (
              <Link
                key={`${rA.slug}-vs-${rB.slug}`}
                href={`/compare/${rA.slug}-vs-${rB.slug}`}
                className="hover-lift border-border bg-card group flex items-center justify-between rounded-xl border p-4 transition-all"
              >
                <div>
                  <p className="text-foreground font-semibold">
                    <span className="group-hover:text-primary transition-colors">
                      {rA.title} vs {rB.title}
                    </span>
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">{relatedPair.summary}</p>
                </div>
                <ArrowRight
                  className="text-muted-foreground group-hover:text-primary h-5 w-5 flex-shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-muted-foreground mt-12 text-center text-sm">
        {toolA.title} and {toolB.title} are part of the {SITE_NAME} directory. Both are compared
        using information from their official listings.
      </p>
    </div>
  );
}
