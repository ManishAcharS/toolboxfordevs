import type { Metadata } from 'next';
import Link from 'next/link';
import { Send, HelpCircle } from 'lucide-react';
import { createMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/shared/page-header';
import { SubmitToolForm } from '@/components/shared/submit-tool-form';

export const metadata: Metadata = createMetadata({
  title: 'Submit Your Developer Tool',
  description:
    'List your tool on Toolbox for Devs and reach developers looking for useful tools. Choose a free or featured listing.',
  canonical: '/submit',
  keywords: [
    'submit developer tool',
    'list your tool',
    'developer tool directory',
    'featured listing',
    'toolbox for devs',
  ],
});

const faqs: { question: string; answer: string }[] = [
  {
    question: 'How is a featured listing different from a free one?',
    answer:
      'A free listing is a standard directory entry in the relevant category. A featured listing adds better visibility and a featured placement so more developers see your tool.',
  },
  {
    question: 'When do I pay for a featured listing?',
    answer:
      'You select the featured option now and submit your details. We’ll contact you with payment instructions — no payment is taken on this page.',
  },
  {
    question: 'How long does review take?',
    answer:
      'We review every submission before it goes live, usually within a few business days. We’ll email you once your tool is approved.',
  },
];

export default function SubmitPage() {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        icon={<Send className="h-6 w-6" aria-hidden="true" />}
        title="Submit Your Developer Tool"
        description="List your tool on Toolbox for Devs and reach developers looking for useful tools."
        breadcrumb={[{ label: 'Submit Your Tool', current: true }]}
      />

      <div className="border-border bg-card rounded-2xl border p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Tell us about your tool</h2>
        <p className="text-muted-foreground mt-1.5 mb-6 text-sm">
          Fill in the details below and choose a listing type. We’ll review your submission and get
          back to you.
        </p>
        <SubmitToolForm />
      </div>

      <section className="mt-12" aria-labelledby="submit-faqs">
        <div className="flex items-center gap-2">
          <HelpCircle className="text-primary h-5 w-5" aria-hidden="true" />
          <h2 id="submit-faqs" className="text-2xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-border bg-card rounded-xl border p-5">
              <h3 className="text-sm font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-muted-foreground mt-10 text-sm">
        Prefer to reach out another way?{' '}
        <Link
          href="/contact"
          className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
        >
          Contact us
        </Link>{' '}
        or read our{' '}
        <Link
          href="/terms"
          className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
        >
          listing terms
        </Link>
        .
      </p>
    </div>
  );
}
