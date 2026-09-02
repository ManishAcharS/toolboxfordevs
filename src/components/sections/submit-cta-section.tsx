import React from 'react';
import Link from 'next/link';
import { ArrowRight, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SubmitCtaSection: React.FC = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
      <div className="border-border bg-card flex flex-col items-center justify-between gap-6 rounded-2xl border p-8 text-center sm:flex-row sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <span className="bg-primary/10 text-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
            <Rocket className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Have a developer tool?</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Submit it to Toolbox for Devs and reach developers looking for useful tools.
            </p>
          </div>
        </div>
        <Button size="lg" asChild className="flex-shrink-0">
          <Link href="/submit">
            Submit it to Toolbox for Devs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

SubmitCtaSection.displayName = 'SubmitCtaSection';

export { SubmitCtaSection };
