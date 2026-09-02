import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';
import { getComparisons } from '@/data/comparisons';
import { StructuredData, createMetadata } from '@/lib/seo';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { SectionHeading } from '@/components/shared/section-heading';
import { ToolIcon } from '@/components/shared/tool-icon';

export const metadata: Metadata = createMetadata({
  title: 'Tool Comparisons',
  description:
    'Side-by-side developer tool comparisons. Weigh features, pricing, and use cases to pick the right tool for your stack — no fluff, just facts.',
  canonical: '/compare',
});

export default function CompareIndexPage() {
  const comparisons = getComparisons();

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Developer Tool Comparisons',
          description: 'Side-by-side comparisons of developer tools.',
          url: 'https://toolboxfordevs.vercel.app/compare',
        }}
      />

      <Breadcrumb items={[{ label: 'Compare', current: true }]} className="mb-6" />

      <header className="mb-10">
        <div className="text-primary flex items-center gap-2 text-sm">
          <Scale className="h-4 w-4" aria-hidden="true" />
          <span>Comparisons</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Developer tool comparisons
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-pretty">
          When two tools do a similar job, choosing between them is the hard part. These comparisons
          weigh features, pricing, and use cases side-by-side using real listing data, so you can
          decide faster.
        </p>
      </header>

      <SectionHeading
        title={`${comparisons.length} comparisons`}
        description="Curated pairs from the directory."
      />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {comparisons.map(({ pair, toolA, toolB }) => (
          <Link
            key={`${toolA.slug}-vs-${toolB.slug}`}
            href={`/compare/${toolA.slug}-vs-${toolB.slug}`}
            className="hover-lift border-border bg-card group flex items-center gap-4 rounded-xl border p-4 transition-all"
          >
            <div className="flex flex-shrink-0 -space-x-2">
              <div className="bg-card border-border relative rounded-full border">
                <ToolIcon name={toolA.title} icon={toolA.icon} size="sm" />
              </div>
              <div className="bg-card border-border relative rounded-full border">
                <ToolIcon name={toolB.title} icon={toolB.icon} size="sm" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground font-semibold">
                <span className="group-hover:text-primary transition-colors">
                  {toolA.title} vs {toolB.title}
                </span>
              </p>
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{pair.summary}</p>
            </div>
            <ArrowRight
              className="text-muted-foreground group-hover:text-primary h-5 w-5 flex-shrink-0 transition-colors"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
