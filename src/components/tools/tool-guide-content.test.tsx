import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ToolGuideContent } from '@/components/tools/tool-guide-content';
import type { ToolGuide } from '@/types';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const populatedGuide: ToolGuide = {
  slug: 'postman',
  introduction: ['An editorial opening paragraph about the tool.'],
  whatItDoes: ['Postman wraps raw HTTP into workbooks of requests and collections.'],
  whyUseIt: ['Teams share the exact request that reproduces a bug.'],
  keyFeatures: ['Collections and environments', 'Mock servers'],
  howItWorks: ['Requests are stored as JSON documents you can version-control.'],
  useCases: ['Reproducing support issues', 'Teaching new hires an API'],
  gettingStarted: ['Import a workspace or paste an OpenAPI spec.'],
  limitations: ['The free tier caps team seats on paid features.'],
  faqs: [{ question: 'Is there a CLI?', answer: 'Yes, Newman.' }],
  officialResources: [
    { title: 'Docs', href: 'https://learning.postman.com', description: 'Official docs' },
  ],
  relatedArticles: [{ title: 'Postman vs curl', href: '/compare/postman-vs-curl-generator' }],
  lastReviewed: '2025-01-15T00:00:00.000Z',
  reviewedBy: 'Jane Developer',
};

describe('ToolGuideContent', () => {
  it('renders nothing for an empty guide', () => {
    const { container } = render(<ToolGuideContent guide={{ slug: 'postman' }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders every populated section in order', () => {
    const { container } = render(<ToolGuideContent guide={populatedGuide} />);

    expect(container.querySelector('h2')?.textContent).toBe('What this tool is');
    expect(container.textContent).toContain('An editorial opening paragraph about the tool.');
    expect(container.textContent).toContain('Why developers use it');
    expect(container.textContent).toContain('Key features');
    expect(container.textContent).toContain('How it works');
    expect(container.textContent).toContain('Common use cases');
    expect(container.textContent).toContain('Getting started');
    expect(container.textContent).toContain('Limitations and pricing notes');
    expect(container.textContent).toContain('Official resources');
    expect(container.textContent).toContain('Related reading');
    expect(container.textContent).toContain('Last reviewed Jan 15, 2025');
    expect(container.textContent).toContain('Reviewed by Jane Developer');
  });

  it('publishes valid hrefs only', () => {
    const { container } = render(<ToolGuideContent guide={populatedGuide} />);

    const hrefs = Array.from(container.querySelectorAll('a')).map((anchor) =>
      anchor.getAttribute('href')
    );
    expect(hrefs).toEqual(['https://learning.postman.com', '/compare/postman-vs-curl-generator']);
    expect(container.querySelector('a[target="_blank"]')).not.toBeNull();
  });

  it('does not render sections that are absent', () => {
    const partial: ToolGuide = {
      slug: 'vercel',
      whyUseIt: ['Preview every pull request instantly.'],
    };
    const { container } = render(<ToolGuideContent guide={partial} />);
    expect(container.textContent).toContain('Why developers use it');
    expect(container.textContent).not.toContain('What this tool is');
    expect(container.textContent).not.toContain('Key features');
    expect(container.textContent).not.toContain('Official resources');
    expect(container.textContent).not.toContain('Related reading');
  });
});
