import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CalendarDays,
  ExternalLink,
  Info,
  Layers,
  Lightbulb,
  Link2,
  Rocket,
  Sparkles,
  Trophy,
  User,
  Wrench,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { ToolGuide, ToolGuideLink } from '@/types';
import { cn } from '@/lib/utils';
import { SectionHeading } from '@/components/shared/section-heading';
import { Prose } from '@/components/shared/prose';

interface ToolGuideContentProps {
  guide: ToolGuide;
  className?: string;
}

interface GuideSection {
  title: string;
  description: string;
  icon: ReactNode;
  items: string[];
  variant?: 'default' | 'notice';
}

const hasEditableContent = (guide: ToolGuide): boolean => {
  return (
    (guide.introduction?.length ?? 0) > 0 ||
    (guide.whatItDoes?.length ?? 0) > 0 ||
    (guide.whyUseIt?.length ?? 0) > 0 ||
    (guide.keyFeatures?.length ?? 0) > 0 ||
    (guide.howItWorks?.length ?? 0) > 0 ||
    (guide.useCases?.length ?? 0) > 0 ||
    (guide.gettingStarted?.length ?? 0) > 0 ||
    (guide.limitations?.length ?? 0) > 0 ||
    (guide.officialResources?.length ?? 0) > 0 ||
    (guide.relatedArticles?.length ?? 0) > 0
  );
};

const renderProse = (items: string[]): React.JSX.Element => {
  return (
    <Prose>
      {items.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Prose>
  );
};

const renderBullets = (items: string[]): React.JSX.Element => {
  return (
    <Prose>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Prose>
  );
};

const GuideLinkRow: React.FC<{ link: ToolGuideLink }> = ({ link }) => {
  const external = !link.href.startsWith('/');

  const className =
    'hover:border-primary/50 group border-border bg-card flex items-start gap-4 rounded-xl border p-4 transition-all hover:shadow-md';
  const titleClass = 'group-hover:text-primary text-foreground font-semibold';

  const content = (
    <>
      <div className="min-w-0 flex-1">
        <p className={titleClass}>{link.title}</p>
        {link.description && (
          <p className="text-muted-foreground mt-1 text-sm">{link.description}</p>
        )}
      </div>
      <ExternalLink
        className="text-muted-foreground group-hover:text-primary mt-1 h-4 w-4 flex-shrink-0 transition-colors"
        aria-hidden="true"
      />
    </>
  );

  const linkClass = cn(
    'focus-visible:ring-ring rounded-xl focus-visible:ring-2 focus-visible:outline-none',
    className
  );

  if (external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={linkClass}>
      {content}
    </Link>
  );
};

const ToolGuideContent: React.FC<ToolGuideContentProps> = ({ guide, className }) => {
  if (!hasEditableContent(guide) && !guide.lastReviewed && !guide.reviewedBy) {
    return null;
  }

  const sections: GuideSection[] = [
    ...(guide.whatItDoes
      ? [
          {
            title: 'What this tool is',
            description: 'A plain-language overview of what the tool actually does.',
            icon: <Wrench className="h-5 w-5" aria-hidden="true" />,
            items: guide.whatItDoes,
          },
        ]
      : []),
    ...(guide.whyUseIt
      ? [
          {
            title: 'Why developers use it',
            description: 'The problems developers reach for this tool to solve.',
            icon: <Lightbulb className="h-5 w-5" aria-hidden="true" />,
            items: guide.whyUseIt,
          },
        ]
      : []),
    ...(guide.keyFeatures
      ? [
          {
            title: 'Key features',
            description: 'The capabilities that matter in everyday development work.',
            icon: <Trophy className="h-5 w-5" aria-hidden="true" />,
            items: guide.keyFeatures,
          },
        ]
      : []),
    ...(guide.howItWorks
      ? [
          {
            title: 'How it works',
            description: 'A short explanation of the underlying model or workflow.',
            icon: <Layers className="h-5 w-5" aria-hidden="true" />,
            items: guide.howItWorks,
          },
        ]
      : []),
    ...(guide.useCases
      ? [
          {
            title: 'Common use cases',
            description: 'Real situations where the tool fits well.',
            icon: <Rocket className="h-5 w-5" aria-hidden="true" />,
            items: guide.useCases,
          },
        ]
      : []),
    ...(guide.gettingStarted
      ? [
          {
            title: 'Getting started',
            description: 'First steps to get productive quickly.',
            icon: <Sparkles className="h-5 w-5" aria-hidden="true" />,
            items: guide.gettingStarted,
          },
        ]
      : []),
    ...(guide.limitations
      ? [
          {
            title: 'Limitations and pricing notes',
            description: 'Honest notes on cost, scaling, and edge cases.',
            icon: <Info className="h-5 w-5" aria-hidden="true" />,
            items: guide.limitations,
            variant: 'notice' as const,
          },
        ]
      : []),
  ];

  const showMeta = guide.lastReviewed !== undefined || guide.reviewedBy !== undefined;

  return (
    <div className={cn('mt-12 [&>*:first-child]:mt-0', className)}>
      {showMeta && (
        <p className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          {guide.lastReviewed && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              Last reviewed{' '}
              {new Date(guide.lastReviewed).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
          {guide.reviewedBy && (
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              Reviewed by {guide.reviewedBy}
            </span>
          )}
        </p>
      )}

      {guide.introduction && guide.introduction.length > 0 && (
        <div className="mt-12">{renderProse(guide.introduction)}</div>
      )}

      {sections.map((section) => (
        <section key={section.title} className="mt-12">
          <SectionHeading
            icon={section.icon}
            title={section.title}
            description={section.description}
          />
          {section.variant === 'notice' ? (
            <div className="rounded-xl border border-amber-200/70 bg-amber-50/60 p-5 dark:border-amber-900/30 dark:bg-amber-900/10">
              {renderBullets(section.items)}
            </div>
          ) : (
            renderBullets(section.items)
          )}
        </section>
      ))}

      {guide.officialResources && guide.officialResources.length > 0 && (
        <section className="mt-12">
          <SectionHeading
            icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
            title="Official resources"
            description="Official documentation and references."
          />
          <div className="space-y-3">
            {guide.officialResources.map((link) => (
              <GuideLinkRow key={`${link.title}-${link.href}`} link={link} />
            ))}
          </div>
        </section>
      )}

      {guide.relatedArticles && guide.relatedArticles.length > 0 && (
        <section className="mt-12">
          <SectionHeading
            icon={<Link2 className="h-5 w-5" aria-hidden="true" />}
            title="Related reading"
            description="Guides and comparisons that dig deeper."
          />
          <div className="space-y-3">
            {guide.relatedArticles.map((link) => (
              <GuideLinkRow key={`${link.title}-${link.href}`} link={link} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

ToolGuideContent.displayName = 'ToolGuideContent';

export { ToolGuideContent };
