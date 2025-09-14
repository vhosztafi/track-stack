import * as React from 'react';

import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'external';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

const base =
  'inline-flex items-center justify-center px-4 md:px-5 text-lg font-sans font-500 leading-snug rounded-lg ' +
  'border-2 border-mode-underground transition-colors duration-150 ' +
  'focus:outline-none focus:border-white focus:ring-2 focus:ring-tfl-ink ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-mode-underground text-white hover:bg-[#000c51] hover:border-[#000c51] focus-visible:outline focus-visible:outline-2 focus-visible:outline-tfl-ink',
  secondary:
    'bg-white text-mode-underground hover:bg-[#000c51] hover:border-[#000c51] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-tfl-ink',
  external: 'bg-indigo-700 text-white hover:bg-indigo-800 focus-visible:ring-indigo-700',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-12 px-4 text-lg',
  lg: 'h-12 px-6 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(base, variants[variant], sizes[size], className)}
        aria-busy={loading || undefined}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              opacity=".25"
            />
            <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        )}
        <span className={cn('font-500', loading && 'pl-2', variant === 'external' && 'pr-2')}>
          {children}
        </span>
        {variant === 'external' && (
          <span aria-hidden="true" className="-mr-1">
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
              <path fill="currentColor" d="M5 5h6v2H7v10h10v-4h2v6H5z" />
            </svg>
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';
