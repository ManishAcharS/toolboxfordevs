'use client';

import React, { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle2, Send, Sparkles, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';

interface SubmitToolFormProps {
  className?: string;
}

type Plan = 'free' | 'featured';

interface FormErrors {
  toolName?: string;
  websiteUrl?: string;
  description?: string;
  category?: string;
  submitterEmail?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^(https?:\/\/)[\w-]+(\.[\w-]+)+([/#?].*)?$/i;

const CATEGORIES = [
  'API Development',
  'Databases',
  'Frontend',
  'Backend',
  'Testing',
  'Monitoring',
  'Security',
  'CI/CD & Deployment',
  'Productivity',
  'Design',
  'Collaboration',
  'Infrastructure',
  'Other',
];

const inputClasses =
  'w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/30';

const SubmitToolForm: React.FC<SubmitToolFormProps> = ({ className }) => {
  const [toolName, setToolName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [plan, setPlan] = useState<Plan>('free');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!toolName.trim()) {
      next.toolName = 'Please enter the tool name.';
    } else if (toolName.trim().length > 120) {
      next.toolName = 'Tool name should be 120 characters or fewer.';
    }
    if (!websiteUrl.trim()) {
      next.websiteUrl = 'Please enter the website URL.';
    } else if (!URL_PATTERN.test(websiteUrl.trim())) {
      next.websiteUrl = 'Please enter a valid URL, e.g. https://example.com';
    }
    if (!description.trim()) {
      next.description = 'Please describe your tool.';
    } else if (description.trim().length < 20) {
      next.description = 'Please provide at least 20 characters of description.';
    } else if (description.trim().length > 2000) {
      next.description = 'Description should be 2000 characters or fewer.';
    }
    if (!category) {
      next.category = 'Please choose a category.';
    }
    if (!submitterEmail.trim()) {
      next.submitterEmail = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(submitterEmail.trim())) {
      next.submitterEmail = 'Please enter a valid email address.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setSuccessMessage(null);
    try {
      const res = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolName: toolName.trim(),
          websiteUrl: websiteUrl.trim(),
          description: description.trim(),
          category,
          submitterEmail: submitterEmail.trim(),
          plan,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data && typeof data.errors === 'object') {
          setErrors(data.errors as FormErrors);
        }
        throw new Error(data?.error ?? 'Submission failed');
      }

      const message =
        typeof data?.message === 'string'
          ? data.message
          : plan === 'featured'
            ? 'Featured listing selected. We’ll contact you with payment instructions.'
            : 'Your tool has been submitted for review. We’ll get back to you soon.';

      setSuccessMessage(message);
      if (plan === 'featured') {
        toast.success('Featured listing selected', 'We’ll contact you with payment instructions.');
      } else {
        toast.success('Submission received', 'Your tool has been submitted for review.');
      }
      setToolName('');
      setWebsiteUrl('');
      setDescription('');
      setCategory('');
      setSubmitterEmail('');
      setPlan('free');
    } catch {
      toast.error('Something went wrong', 'Please try again in a moment.');
    } finally {
      setStatus('idle');
    }
  };

  const fieldId = (name: string) => `submit-${name}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn('grid grid-cols-1 gap-8 lg:grid-cols-5', className)}
    >
      <div className="space-y-6 lg:col-span-3">
        {successMessage && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-green-500/40 bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-300"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">Thank you — submission received</p>
              <p className="mt-0.5">{successMessage}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor={fieldId('toolName')}
              className="text-foreground mb-1.5 block text-sm font-medium"
            >
              Tool Name{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id={fieldId('toolName')}
              name="toolName"
              type="text"
              value={toolName}
              onChange={(e) => {
                setToolName(e.target.value);
                clearError('toolName');
              }}
              aria-invalid={errors.toolName ? true : undefined}
              aria-describedby={errors.toolName ? `${fieldId('toolName')}-error` : undefined}
              className={inputClasses}
              placeholder="e.g. My Awesome CLI"
              required
            />
            {errors.toolName && (
              <FieldError id={`${fieldId('toolName')}-error`} message={errors.toolName} />
            )}
          </div>
          <div>
            <label
              htmlFor={fieldId('websiteUrl')}
              className="text-foreground mb-1.5 block text-sm font-medium"
            >
              Website URL{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id={fieldId('websiteUrl')}
              name="websiteUrl"
              type="url"
              inputMode="url"
              value={websiteUrl}
              onChange={(e) => {
                setWebsiteUrl(e.target.value);
                clearError('websiteUrl');
              }}
              aria-invalid={errors.websiteUrl ? true : undefined}
              aria-describedby={errors.websiteUrl ? `${fieldId('websiteUrl')}-error` : undefined}
              className={inputClasses}
              placeholder="https://example.com"
              required
            />
            {errors.websiteUrl && (
              <FieldError id={`${fieldId('websiteUrl')}-error`} message={errors.websiteUrl} />
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor={fieldId('category')}
            className="text-foreground mb-1.5 block text-sm font-medium"
          >
            Category{' '}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id={fieldId('category')}
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              clearError('category');
            }}
            aria-invalid={errors.category ? true : undefined}
            aria-describedby={errors.category ? `${fieldId('category')}-error` : undefined}
            className={cn(inputClasses, 'appearance-none', !category && 'text-muted-foreground/60')}
            required
          >
            <option value="" disabled>
              Select a category…
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <FieldError id={`${fieldId('category')}-error`} message={errors.category} />
          )}
        </div>

        <div>
          <label
            htmlFor={fieldId('description')}
            className="text-foreground mb-1.5 block text-sm font-medium"
          >
            Description{' '}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id={fieldId('description')}
            name="description"
            rows={5}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              clearError('description');
            }}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={errors.description ? `${fieldId('description')}-error` : undefined}
            className={cn(inputClasses, 'resize-y')}
            placeholder="What does your tool do? Who is it for? What makes it stand out?"
            required
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.description ? (
              <FieldError id={`${fieldId('description')}-error`} message={errors.description} />
            ) : (
              <span />
            )}
            <span className="text-muted-foreground text-xs">{description.length}/2000</span>
          </div>
        </div>

        <div>
          <label
            htmlFor={fieldId('submitterEmail')}
            className="text-foreground mb-1.5 block text-sm font-medium"
          >
            Submitter Email{' '}
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={fieldId('submitterEmail')}
            name="submitterEmail"
            type="email"
            autoComplete="email"
            value={submitterEmail}
            onChange={(e) => {
              setSubmitterEmail(e.target.value);
              clearError('submitterEmail');
            }}
            aria-invalid={errors.submitterEmail ? true : undefined}
            aria-describedby={
              errors.submitterEmail ? `${fieldId('submitterEmail')}-error` : undefined
            }
            className={inputClasses}
            placeholder="you@example.com"
            required
          />
          {errors.submitterEmail && (
            <FieldError id={`${fieldId('submitterEmail')}-error`} message={errors.submitterEmail} />
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Submit your tool
            </>
          )}
        </Button>

        <p className="text-muted-foreground text-xs">
          We review every submission before publishing. By submitting, you confirm you own or have
          the right to list the tool.
        </p>
      </div>

      <div className="lg:col-span-2">
        <h2 className="text-foreground text-lg font-semibold">Choose a listing type</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Both listing types include a standard directory entry. Featured listings get better
          visibility.
        </p>
        <div className="mt-4 space-y-3">
          <PlanCard
            id="plan-free"
            selected={plan === 'free'}
            onSelect={() => {
              setPlan('free');
              setSuccessMessage(null);
            }}
            icon={<ListChecks className="h-5 w-5" aria-hidden="true" />}
            title="Free Listing"
            price="₹0"
            description="A normal directory listing. Your tool appears in the relevant category for everyone to discover."
            badge="Standard"
          />
          <PlanCard
            id="plan-featured"
            selected={plan === 'featured'}
            onSelect={() => {
              setPlan('featured');
              setSuccessMessage(null);
            }}
            icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
            title="Featured Listing"
            price="₹299"
            description="Boosted visibility and featured placement so more developers see your tool."
            badge="Popular"
            highlight
          />
        </div>
        {plan === 'featured' && (
          <p
            role="status"
            className="border-primary/30 bg-primary/5 text-foreground mt-4 flex items-start gap-2 rounded-lg border p-3 text-sm"
          >
            <Sparkles className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Featured listing selected. We’ll contact you with payment instructions.
          </p>
        )}
      </div>
    </form>
  );
};

interface FieldErrorProps {
  id: string;
  message: string;
}

const FieldError: React.FC<FieldErrorProps> = ({ id, message }) => (
  <p id={id} className="mt-1.5 flex items-center gap-1 text-xs text-red-500" role="alert">
    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
    {message}
  </p>
);

interface PlanCardProps {
  id: string;
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  price: string;
  description: string;
  badge?: string;
  highlight?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  id,
  selected,
  onSelect,
  icon,
  title,
  price,
  description,
  badge,
  highlight,
}) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        'border-border hover:border-primary/60 block cursor-pointer rounded-xl border p-4 transition-all',
        selected && 'border-primary ring-primary/20 ring-2',
        highlight && 'bg-primary/5'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          <input
            id={id}
            type="radio"
            name="plan"
            value={title}
            checked={selected}
            onChange={onSelect}
            className="text-primary accent-primary h-4 w-4"
          />
          <span
            className={cn(
              'text-foreground flex h-9 w-9 items-center justify-center rounded-lg',
              highlight ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            )}
          >
            {icon}
          </span>
          <span className="text-foreground font-medium">{title}</span>
        </span>
        <span className="flex items-center gap-2">
          {badge && (
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-semibold',
                highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}
            >
              {badge}
            </span>
          )}
          <span className="text-foreground font-bold">{price}</span>
        </span>
      </div>
      <p className="text-muted-foreground mt-3 ml-5 text-sm">{description}</p>
    </label>
  );
};

SubmitToolForm.displayName = 'SubmitToolForm';

export { SubmitToolForm };
