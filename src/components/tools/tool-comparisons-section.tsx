import React from 'react';
import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';
import type { ToolDefinition } from '@/types';
import { getComparisonsForTool } from '@/data/comparisons';
import { SectionHeading } from '@/components/shared/section-heading';
import { ToolIcon } from '@/components/shared/tool-icon';

interface ToolComparisonsSectionProps {
  tool: ToolDefinition;
  className?: string;
}

const ToolComparisonsSection: React.FC<ToolComparisonsSectionProps> = ({ tool, className }) => {
  const comparisons = getComparisonsForTool(tool.slug, 3);
  if (comparisons.length === 0) return null;

  return (
    <section className={`mt-12 ${className ?? ''}`} aria-labelledby="tool-comparisons-heading">
      <SectionHeading
        icon={<Scale className="h-5 w-5" aria-hidden="true" />}
        title="Compared with similar tools"
        description={`How ${tool.title} stacks up against alternatives.`}
        actionHref="/compare"
        actionLabel="All comparisons"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {comparisons.map(({ pair, toolA, toolB }) => {
          const other = pair.a === tool.slug ? toolB : toolA;
          return (
            <Link
              key={`${toolA.slug}-vs-${toolB.slug}`}
              href={`/compare/${toolA.slug}-vs-${toolB.slug}`}
              className="hover-lift border-border bg-card group flex items-center gap-4 rounded-xl border p-4 transition-all"
            >
              <ToolIcon name={other.title} icon={other.icon} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-foreground font-semibold">
                  <span className="group-hover:text-primary transition-colors">
                    {tool.title} vs {other.title}
                  </span>
                </p>
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{pair.summary}</p>
              </div>
              <ArrowRight
                className="text-muted-foreground group-hover:text-primary h-5 w-5 flex-shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

ToolComparisonsSection.displayName = 'ToolComparisonsSection';

export { ToolComparisonsSection };
