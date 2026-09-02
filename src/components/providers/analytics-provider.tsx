'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

const PLAUSIBLE_DOMAIN = siteConfig.analytics.plausibleDomain;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(event: string, props?: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  // Safe local fallback so events are logged even if analytics is disabled
  try {
    const key = 'tbd-analytics-events';
    const existing = JSON.parse(localStorage.getItem(key) ?? '[]') as Array<{
      event: string;
      props?: Record<string, string>;
      t: number;
    }>;
    existing.push({ event, props, t: Date.now() });
    localStorage.setItem(key, JSON.stringify(existing.slice(-200)));
  } catch {
    // localStorage unavailable — ignore
  }
  if (PLAUSIBLE_DOMAIN && typeof window.plausible === 'function') {
    window.plausible(event, props ? { props } : undefined);
  }
}

function setupClickTracking(): void {
  if (typeof document === 'undefined') return;

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest<HTMLAnchorElement>('a[href]');
    if (!link) return;

    const href = link.getAttribute('href') ?? '';
    const label = link.textContent?.trim().slice(0, 80) ?? '';

    // Outbound clicks (external links)
    if (/^https?:\/\//i.test(href)) {
      trackEvent('Outbound Click', { url: href, label });
      return;
    }

    // Internal tool links
    const toolMatch = href.match(/^\/tools\/([^/?]+)/);
    if (toolMatch) {
      trackEvent('Tool Click', { tool: toolMatch[1], label });
      return;
    }

    // Category links
    const catMatch = href.match(/^\/categories\/([^/?]+)/);
    if (catMatch) {
      trackEvent('Category Click', { category: catMatch[1] });
    }
  });
}

export function AnalyticsProvider(): React.JSX.Element | null {
  // Track tool/category/outbound clicks regardless of whether analytics is configured.
  useEffect(() => {
    setupClickTracking();
  }, []);

  // Load Plausible only in the background if a domain is configured.
  if (!PLAUSIBLE_DOMAIN) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
