import { describe, expect, it } from 'vitest';
import { getAllToolGuides } from '@/data/tool-guides';
import { toolDefinitions } from '@/registry/tool-definitions';
import type { ToolGuide, ToolGuideLink } from '@/types';

const ARRAY_SECTIONS = [
  'introduction',
  'whatItDoes',
  'whyUseIt',
  'keyFeatures',
  'howItWorks',
  'useCases',
  'gettingStarted',
  'limitations',
] as const;

const VALID_URL_PATTERN = /^https?:\/\/[^\s]+$/i;

const isValidInternalHref = (href: string): boolean => href.startsWith('/');

const isValidRedirectHref = (href: string): boolean => {
  return isValidInternalHref(href) || VALID_URL_PATTERN.test(href);
};

describe('tool guides', () => {
  const guides = getAllToolGuides();
  const toolSlugs = new Set(toolDefinitions.map((definition) => definition.slug));

  it('has no duplicate slugs', () => {
    const slugs = guides.map((guide) => guide.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('only references registered tool slugs', () => {
    guides.forEach((guide) => {
      expect(
        toolSlugs.has(guide.slug),
        `guide "${guide.slug}" does not match a registered tool`
      ).toBe(true);
    });
  });

  it('keeps optional string-array sections non-empty when present', () => {
    guides.forEach((guide) => {
      ARRAY_SECTIONS.forEach((section) => {
        const items = guide[section];
        if (!items) return;
        expect(items.length, `${guide.slug}.${section} must not be an empty array`).toBeGreaterThan(
          0
        );
        items.forEach((item, index) => {
          expect(
            item.trim().length,
            `${guide.slug}.${section}[${index}] must be a non-empty string`
          ).toBeGreaterThan(0);
        });
      });
    });
  });

  it('validates guide faqs', () => {
    guides.forEach((guide) => {
      (guide.faqs ?? []).forEach((faq, index) => {
        expect(faq.question.trim().length, `${guide.slug}.faqs[${index}].question`).toBeGreaterThan(
          0
        );
        expect(faq.answer.trim().length, `${guide.slug}.faqs[${index}].answer`).toBeGreaterThan(0);
      });
    });
  });

  it('validates link lists', () => {
    const validateLinks = (guide: ToolGuide, field: keyof ToolGuide, links?: ToolGuideLink[]) => {
      (links ?? []).forEach((link, index) => {
        const prefix = `${guide.slug}.${String(field)}[${index}]`;
        expect(link.title.trim().length, `${prefix}.title`).toBeGreaterThan(0);
        expect(
          isValidRedirectHref(link.href),
          `${prefix}.href must be internal or an http(s) URL`
        ).toBe(true);
        if (link.description !== undefined) {
          expect(
            link.description.trim().length,
            `${prefix}.description must be non-empty when present`
          ).toBeGreaterThan(0);
        }
      });
    };

    guides.forEach((guide) => {
      validateLinks(guide, 'officialResources', guide.officialResources);
      validateLinks(guide, 'relatedArticles', guide.relatedArticles);
    });
  });

  it('validates lastReviewed dates', () => {
    guides.forEach((guide) => {
      if (guide.lastReviewed === undefined) return;
      expect(
        !Number.isNaN(Date.parse(guide.lastReviewed)),
        `${guide.slug}.lastReviewed must be a parseable date`
      ).toBe(true);
    });
  });
});
