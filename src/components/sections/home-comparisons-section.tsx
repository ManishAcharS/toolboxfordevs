import React from 'react';
import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';
import { getComparisons } from '@/data/comparisons';
import { SectionHeading } from '@/components/shared/section-heading';
import { ToolIcon } from '@/components/shared/tool-icon';

interface HomeComparisonsSectionProps {
  limit?: number;
}

const HomeComparisonsSection: React.FC<HomeComparisonsSectionProps> = ({ limit = 6 }) => {
  const comparisons = getComparisons().slice(0, limit);
  if (comparisons.length === 0) return null;

  return (
    <section className="border-border bg-muted/30 border-y">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          icon={<Scale className="h-6 w-6" aria-hidden="true" />}
          title="Tool comparisons"
          description="Can't decide between two tools that do similar jobs? See them side-by-side."
          actionLabel="All comparisons"
          actionHref="/compare"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map(({ toolA, toolB }) => (
            <Link
              key={`${toolA.slug}-vs-${toolB.slug}`}
              href={`/compare/${toolA.slug}-vs-${toolB.slug}`}
              className="hover-lift border-border bg-card group flex items-center gap-3 rounded-xl border p-4 transition-all"
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
                <p className="text-foreground truncate font-semibold">
                  <span className="group-hover:text-primary transition-colors">
                    {toolA.title} vs {toolB.title}
                  </span>
                </p>
              </div>
              <ArrowRight
                className="text-muted-foreground group-hover:text-primary h-5 w-5 flex-shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

HomeComparisonsSection.displayName = 'HomeComparisonsSection';

export { HomeComparisonsSection };
