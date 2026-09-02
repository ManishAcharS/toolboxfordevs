'use client';

import Link from 'next/link';
import { trackEvent } from '@/components/providers/analytics-provider';

interface TrackLinkProps {
  event: string;
  props?: Record<string, string>;
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export function TrackLink({
  event,
  props,
  href,
  children,
  className,
  target,
  rel,
  ...rest
}: TrackLinkProps) {
  const isExternal = href.startsWith('http');
  const Comp: React.ElementType = isExternal ? 'a' : Link;

  return (
    <Comp
      href={href}
      className={className}
      target={isExternal ? '_blank' : target}
      rel={isExternal ? 'noopener noreferrer' : rel}
      onClick={() => trackEvent(event, props)}
      {...rest}
    >
      {children}
    </Comp>
  );
}
